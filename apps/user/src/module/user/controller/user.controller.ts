import { Public } from '@edd/common';
import {
  EmailPasswordDto,
  SignUpDto,
  UsernamePasswordDto,
} from '@edd/common/module/authentication';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '../export';
import { UserService } from '../service';
import { CreateUserDto } from '../type';

@ApiTags('user')
@ApiBearerAuth()
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post()
  signUp(@Body() user: SignUpDto): Promise<User> {
    return this.userService.signUp(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('profile-photo')
  profilePhoto(@Req() req: { user: User }) {
    return this.userService.getProfilePhoto(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return await this.userService.findOne(id);
  }

  @Public()
  @Post('by-email-password')
  getUserByEmailPassword(@Body() { email, password }: EmailPasswordDto): Promise<User | null> {
    return this.userService.getUserByEmailPassword(email, password);
  }

  @Public()
  @Post('by-username-password')
  getUserByUsernamePassword(
    @Body() { username, password }: UsernamePasswordDto,
  ): Promise<User | null> {
    return this.userService.getUserByUsernamePassword(username, password);
  }

  @Public()
  @Get('by-id/:id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-profile-photo')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
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
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.userService.uploadProfilePhoto(req.user, file);
  }
}
