import { EmailPasswordDto, SignUpDto, UsernamePasswordDto } from '@edd/common/type/authentication';
import { ThirdPartyName } from '@edd/common/type/user';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from 'google-auth-library';
import { Repository } from 'typeorm';
import { ThirdPartyAuthentication, User } from '../export';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ThirdPartyAuthentication)
    private readonly thirdPartyRepository: Repository<ThirdPartyAuthentication>,
  ) {}

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
    return await this.userRepository.findOneByOrFail({
      id: result.id,
    });
  }

  async continueWithGoogle(tokenPayload: TokenPayload): Promise<User> {
    this.logger.debug(`user service continue with google`);
    const _google = await this.thirdPartyRepository.findOneBy({
      uid: tokenPayload.sub,
      name: ThirdPartyName.GOOGLE,
    });
    if (_google?.user) {
      return _google.user;
    }

    const userModel = new User();
    userModel.firstName = tokenPayload.given_name;
    userModel.lastName = tokenPayload.family_name;
    userModel.email = tokenPayload.email;
    userModel.profilePhoto = tokenPayload.picture;

    const googleModel = new ThirdPartyAuthentication();
    googleModel.name = ThirdPartyName.GOOGLE;
    googleModel.uid = tokenPayload.sub;

    const google = await this.thirdPartyRepository.save(googleModel);
    userModel.thirdParties = [google];
    const user = await this.userRepository.save(userModel);
    google.user = user;
    await this.thirdPartyRepository.save(google);
    this.logger.debug(JSON.stringify(user));
    return user;
  }
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneByOrFail({ email: email });
  }

  async getUserByEmailPassword({ email, password }: EmailPasswordDto): Promise<User> {
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

  async getUserByUsernamePassword({ username, password }: UsernamePasswordDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.findOneByOrFail({ username, password: hashedPassword });
  }
}
