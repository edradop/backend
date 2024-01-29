import { SignUpDto } from '@edd/common/module/authentication';
import { PromiseHandlerService } from '@edd/common/module/http-exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, User, UserType } from '../type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @InjectRepository(Role)
    // private readonly roleRepository: Repository<Role>,
    // @InjectRepository(Authority)
    // private readonly authorityRepository: Repository<Authority>,
    private readonly promiseHandlerService: PromiseHandlerService,
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
    // const roles = await this.roleRepository.find({
    //   where: dto.roles.map((id) => ({ id })),
    // });
    // user.roles = roles;

    // const authorities = await this.authorityRepository.find({
    //   where: dto.authorities.map((id) => ({ id })),
    // });
    // user.authorities = authorities;

    await this.promiseHandlerService.conflict(this.userRepository.save(user), {
      titleKey: 'user.exists.title',
      messageKey: 'user.exists.message',
    });
    const result = await this.userRepository.save(user);
    const userModel = await this.userRepository.findOneBy({
      id: result.id,
    });
    return userModel || ({} as User);
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
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
    await this.promiseHandlerService.conflict(this.userRepository.save(user), {
      titleKey: 'user.exists.title',
      messageKey: 'user.exists.message',
    });
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
    return await this.findOne(id);
  }

  getUserByEmailPassword(email: string, password: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email, password });
  }

  getUserByUsernamePassword(username: string, password: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username, password });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.update({ id }, { status: UserType.DELETED });
  }
}
