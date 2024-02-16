import { SignUpDto } from '@edd/common/module/authentication';
import {
  CreateUserDto,
  ThirdPartyName,
  UpdatePasswordDto,
  UpdateUserDto,
  UserType,
} from '@edd/common/module/user';
import { HttpEnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import * as FormData from 'form-data';
import { TokenPayload } from 'google-auth-library';
import { Repository } from 'typeorm';
import { Authority } from '../../authority/export';
import { Role } from '../../role/export';
import { ThirdPartyAuthentication, User } from '../export';

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
    private readonly httpEnvironmentService: HttpEnvironmentService,
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
    this.logger.debug(`user service continue with google`);
    const _user = await this.userRepository.findOneOrFail({
      where: {
        email: tokenPayload.email as string,
      },
      relations: ['thirdParties'],
    });
    if (_user) {
      this.logger.debug(JSON.stringify(_user));
      if (_user.thirdParties?.find((item) => item.name === ThirdPartyName.GOOGLE)) {
        return _user;
      }
      const googleModel = new ThirdPartyAuthentication();
      googleModel.name = ThirdPartyName.GOOGLE;
      googleModel.user = _user;

      const google = await this.thirdPartyRepository.save(googleModel);

      await this.userRepository.update(_user.id, {
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
    return (await this.userRepository.findOneByOrFail({
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

  async getUserByEmailPassword(email: string, password: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('user.authorities', 'authority')
      .where('user.email = :email', { email })
      .getOneOrFail();

    if (await bcrypt.compare(password, user?.password as string)) {
      this.logger.debug(`login ${user?.username} successfully`);
      return user;
    }
    this.logger.debug(`login ${user?.username} failed`);
    throw new HttpException('Invalid credentials', 401);
  }

  async getUserByUsernamePassword(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.findOneByOrFail({ username, password: hashedPassword });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.update({ id }, { status: UserType.DELETED });
  }
  async getProfilePhoto(token?: string): Promise<Buffer> {
    const response = await axios.get(
      `${this.httpEnvironmentService.url('storage')}/v1/profile-photo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          responseType: 'arraybuffer',
        },
      },
    );
    return Buffer.from(response.data); // TODO: need to change
  }

  async uploadProfilePhoto(token: string, user: User, file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
      knownLength: file.size,
    });
    const response = await axios.post(
      `${this.httpEnvironmentService.url('storage')}/v1/upload-profile-photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    await this.userRepository.update(
      { id: user.id },
      { profilePhoto: response.data.uploadedImage },
    );

    return response.data;
  }
}
