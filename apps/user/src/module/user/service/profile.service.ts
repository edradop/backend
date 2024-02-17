import { UpdatePasswordDto } from '@edd/common/type/user';
import { HttpEnvironmentService } from '@edd/config/module/environment';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import * as FormData from 'form-data';
import { Repository } from 'typeorm';
import { User } from '../export';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpEnvironmentService: HttpEnvironmentService,
  ) {}

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
