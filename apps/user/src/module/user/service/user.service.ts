import { CreateUserDto, UpdateUserDto, UserType } from '@edd/common/type/user';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authority } from '../../authority/export';
import { Role } from '../../role/export';
import { User } from '../export';

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
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    this.logger.debug('create user', { ...dto, password: dto.password?.replace(/./g, '*') });
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

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneByOrFail({ id: id });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    this.logger.debug(`update user by id, ${id}`, dto);
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.id = id;

    await this.userRepository.update(id, user);
    return await this.userRepository.findOneByOrFail({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.update({ id }, { status: UserType.DELETED });
  }
}
