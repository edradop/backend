import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, User } from '../type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    if (createUserDto.username) {
      user.username = createUserDto.username;
    }

    const result = await this.userRepository.save(user);
    const userModel = await this.userRepository.findOneBy({
      id: result.id,
    });
    return userModel || ({} as User);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = new User();
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
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
    await this.userRepository.delete(id);
  }
}
