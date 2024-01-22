import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto-js';
import { EntityManager, Repository } from 'typeorm';
import { Email, Password, Username } from '../../type';
import { CreateUserDto } from '../../type/dto/create-user.dto';
import { User } from '../../type/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    const email = new Email();
    email.email = createUserDto.email;

    const password = new Password();
    password.password = crypto.SHA256(createUserDto.password).toString();

    const username = new Username();
    if (createUserDto.username) {
      username.username = createUserDto.username;
    }

    return await this.entityManager.transaction(async (manager) => {
      const newUser = manager.create(User, user);
      const result = await manager.save(User, newUser);
      console.log('result', result, newUser);
      const newEmail = manager.create(Email, { ...email, user: newUser });
      await manager.save(Email, newEmail);
      const newPassword = manager.create(Password, { ...password, user: newUser });
      await manager.save(Password, newPassword);
      const newUsername = manager.create(Username, { ...username, user: newUser });
      await manager.save(Username, newUsername);

      return result;
    });

    // const result = await this.userRepository.save(user);
    // email.user = result;
    // username.user = result;
    // password.user = result;
    // await this.emailRepository.save(email);
    // await this.passwordRepository.save(password);
    // await this.usernameRepository.save(username);
    // return result;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
