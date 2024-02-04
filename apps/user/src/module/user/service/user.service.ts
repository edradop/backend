import { SignUpDto } from '@edd/common/module/authentication';
import { MinioService } from '@edd/common/module/minio/service';
import { EnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Authority } from '../../authority/export';
import { Role } from '../../role/export';
import { User } from '../export';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto, UserType } from '../type';

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
    const roles = await this.roleRepository.find({
      where: dto.roles.map((id) => ({ id })),
    });
    user.roles = roles;

    const authorities = await this.authorityRepository.find({
      where: dto.authorities.map((id) => ({ id })),
    });
    user.authorities = authorities;

    const result = await this.userRepository.save(user);
    const userModel = await this.userRepository.findOneBy({
      id: result.id,
    });
    return userModel || ({} as User);
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneByOrFail({ id: id });
  }

  async signUp(dto: SignUpDto): Promise<User> {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.password = dto.password;
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
    this.logger.debug(dto);
    const user = await this.userRepository
      .createQueryBuilder('row')
      .addSelect('row.password')
      .where('row.id = :id', { id: dto.id })
      .getOne();
    this.logger.debug('dto ------------------------------- 1');
    if (bcrypt.compareSync(dto.password, user?.password as string)) {
      this.logger.debug('dto ------------------------------- 2');
      await this.userRepository.update(dto.id, {
        password: bcrypt.hashSync(dto.newPassword, 10),
      });
      return new HttpException('Password updated successfully', HttpStatus.OK);
    }
    this.logger.debug('dto ------------------------------- 3');
    throw new HttpException('Password not matching with current password', HttpStatus.BAD_REQUEST);
  }

  async getUserByEmailPassword(email: string, password: string): Promise<User | null> {
    this.logger.debug(email, password);
    const user = await this.userRepository
      .createQueryBuilder('row')
      .addSelect('row.password')
      .where('row.email = :email', { email })
      .getOne();
    // const user = await this.userRepository.findOneByOrFail({
    //   email,
    // });
    this.logger.debug(user?.password, password);
    if (await bcrypt.compare(password, user?.password as string)) {
      return user;
    }
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
    const photo = await this.minioService.client.presignedGetObject(
      this.environmentService.userBucketName,
      user.profilePhoto,
    );
    return photo; // TODO: should send object not object url
  }
}
