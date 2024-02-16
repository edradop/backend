import { Authorities, Public, extractTokenFromHeader } from '@edd/common';
import {
  SignUpDto,
  UsernamePasswordDto,
  ValidateUserWithEmailEvent,
} from '@edd/common/module/authentication';
import {
  SIGNUP_USER_WITH_EMAIL_EVENT,
  VALIDATE_USER_WITH_EMAIL_EVENT,
  VALIDATE_USER_WITH_USERNAME_EVENT,
} from '@edd/common/module/authentication/constant';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from '@edd/common/module/user';
import { AuthorityEnum } from '@edd/config';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Header,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TokenPayload } from 'google-auth-library';
import { User } from '../export';
import { UserService } from '../service';

@ApiTags('user')
@ApiBearerAuth()
@Controller({ path: 'user', version: '1' })
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post()
  @Authorities(AuthorityEnum.CREATE_USER)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('continue-with-google')
  continueWithGoogle(@Body() tokenPayload: TokenPayload): Promise<User> {
    return this.userService.continueWithGoogle(tokenPayload);
  }

  @Public()
  @EventPattern(SIGNUP_USER_WITH_EMAIL_EVENT)
  signUp(user: SignUpDto): Promise<User> {
    return this.userService.signUp(user);
  }

  @Get()
  @Authorities(AuthorityEnum.READ_USER)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('update-password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    this.logger.debug('user controller update password');
    return this.userService.updatePassword(updatePasswordDto);
  }

  @Public()
  @EventPattern(VALIDATE_USER_WITH_EMAIL_EVENT)
  getUserByEmailPassword({ email, password }: ValidateUserWithEmailEvent): Promise<User | null> {
    return this.userService.getUserByEmailPassword(email, password);
  }

  @Public()
  @EventPattern(VALIDATE_USER_WITH_USERNAME_EVENT)
  getUserByUsernamePassword({ username, password }: UsernamePasswordDto): Promise<User | null> {
    return this.userService.getUserByUsernamePassword(username, password);
  }

  @Public()
  @Get('by-id/:id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Get('profile-photo')
  // @Header('Content-Type', 'application/octet-stream')
  // @Header('Content-Disposition', 'attachment; filename="filename.bin"')
  @Header('Content-Type', 'image/jpeg')
  async profilePhoto(@Req() req: Request): Promise<Buffer> {
    const token = extractTokenFromHeader(req) as string;
    return await this.userService.getProfilePhoto(token);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-profile-photo')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFileAndFailValidation(
    @Body() _body: unknown,
    @Req() req: { user: User },
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const token = extractTokenFromHeader(req as unknown as Request) as string;
    return this.userService.uploadProfilePhoto(token, req.user, file);
  }

  @Get(':id')
  @Authorities(AuthorityEnum.READ_USER)
  async findOne(@Param('id') id: string): Promise<User | null> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @Authorities(AuthorityEnum.UPDATE_USER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Authorities(AuthorityEnum.DELETE_USER)
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
