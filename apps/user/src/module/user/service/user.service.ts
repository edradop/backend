import { SignUpDto } from '@edd/common/module/authentication';
import { MinioService } from '@edd/common/module/minio/service';
import { EnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Authority } from '../../authority/export';
import { Role } from '../../role/export';
import { ThirdPartyAuthentication, User } from '../export';
import { CreateUserDto, ThirdPartyName, UpdatePasswordDto, UpdateUserDto, UserType } from '../type';
import { TokenPayload } from 'google-auth-library';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
    @InjectRepository(ThirdPartyAuthentication)
    private readonly thirdPartyRepository: Repository<ThirdPartyAuthentication>,
    private readonly minioService: MinioService,
    private readonly environmentService: EnvironmentService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.password = dto.password;
    if (dto.username) {
      user.username = dto.username;
    }
    if (dto.password) {
      user.isHasPassword = true;
    }
    const roles = await this.roleRepository.find({
      where: dto.roles.map((id) => ({ id })),
    });
    user.roles = roles;

    const authorities = await this.authorityRepository.find({
      where: dto.authorities.map((id) => ({ id })),
    });
    user.authorities = authorities;

    const result = await this.userRepository.save(user);
    const userModel = await this.userRepository.findOneByOrFail({
      id: result.id,
    });
    return userModel;
  }

  async continueWithGoogle(tokenPayload: TokenPayload): Promise<User> {
    this.logger.debug(`user service continue with google ${tokenPayload.email}`);
    const _user = await this.userRepository.findOneBy({
      email: tokenPayload.email,
    });
    this.logger.debug(`user service continue with google - 2 ${_user?.email}`);
    if (_user) {
      if (_user.thirdParties.find((item) => item.name === ThirdPartyName.GOOGLE)) {
        return _user;
      }
      const googleModel = new ThirdPartyAuthentication();
      googleModel.name = ThirdPartyName.GOOGLE;

      const google = await this.thirdPartyRepository.save(googleModel);
      this.userRepository.update(_user.id, {
        thirdParties: [google],
      });
      return _user;
    }
    const userModel = new User();
    userModel.firstName = tokenPayload.given_name;
    userModel.lastName = tokenPayload.family_name;
    userModel.email = tokenPayload.email;
    userModel.profilePhoto = tokenPayload.picture;

    const googleModel = new ThirdPartyAuthentication();
    googleModel.name = ThirdPartyName.GOOGLE;

    const google = await this.thirdPartyRepository.save(googleModel);
    userModel.thirdParties = [google];
    const result = await this.userRepository.save(userModel);
    const user = await this.userRepository.findOneByOrFail({
      id: result.id,
    });
    return user;
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneByOrFail({ id: id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneByOrFail({ email: email });
  }

  async signUp(dto: SignUpDto): Promise<User> {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.password = dto.password;
    user.isHasPassword = true;
    if (dto.username) {
      user.username = dto.username;
    }
    const result = await this.userRepository.save(user);
    return (await this.userRepository.findOneBy({
      id: result.id,
    })) as User;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.id = id;

    await this.userRepository.update(id, user);
    return await this.userRepository.findOneByOrFail({ id: id });
  }

  async updatePassword(dto: UpdatePasswordDto): Promise<HttpException> {
    const user = await this.userRepository
      .createQueryBuilder('row')
      .addSelect('row.password')
      .where('row.id = :id', { id: dto.id })
      .getOneOrFail();
    if (bcrypt.compareSync(dto.password, user?.password as string)) {
      await this.userRepository.update(dto.id, {
        password: bcrypt.hashSync(dto.newPassword, 10),
      });
      this.logger.debug(`change ${user?.username} password successfully`);
      return new HttpException('Password updated successfully', HttpStatus.OK);
    }
    this.logger.debug(`change ${user?.username} password failed`);
    throw new HttpException('Password not matching with current password', HttpStatus.BAD_REQUEST);
  }

  async getUserByEmailPassword(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('row')
      .addSelect('row.password')
      .where('row.email = :email', { email })
      .getOneOrFail();
    if (await bcrypt.compare(password, user?.password as string)) {
      this.logger.debug(`login ${user?.username} successfully`);
      return user;
    }
    this.logger.debug(`login ${user?.username} failed`);
    throw new HttpException('Invalid credentials', 401);
  }

  async getUserByUsernamePassword(username: string, password: string): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.findOneBy({ username, password: hashedPassword });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.update({ id }, { status: UserType.DELETED });
  }

  async uploadProfilePhoto(user: User, image: Express.Multer.File) {
    const uploaded_image = await this.minioService.uploadImage(
      image,
      this.environmentService.userBucketName,
    );

    await this.userRepository.update({ id: user.id }, { profilePhoto: uploaded_image });

    return {
      imageUrl: this.minioService.generateUrl(
        this.environmentService.minioEndpoint,
        this.environmentService.minioPort,
        this.environmentService.userBucketName,
        uploaded_image,
      ),
      message: 'Image upload successful',
    };
  }

  async getProfilePhoto(user: User): Promise<string> {
    if (user.profilePhoto) {
      const photo = await this.minioService.client.presignedGetObject(
        this.environmentService.userBucketName,
        user.profilePhoto,
      );
      return photo; // TODO: should send object not object url
    }
    throw new HttpException('Profile photo not found', HttpStatus.NOT_FOUND);
  }
}
