import { extractTokenFromHeader } from '@edd/common';
import { TUser } from '@edd/common/type/user';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { StorageService } from '../service';

@ApiTags('storage')
@Controller({ path: '', version: '1' })
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get()
  getHello(): string {
    return this.storageService.getHello();
  }

  @Get('profile-photo')
  async profilePhoto(@Req() { user }: { user: TUser }): Promise<StreamableFile> {
    return new StreamableFile(await this.storageService.getProfilePhoto(user));
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
    @Req() req: Request,
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
    console.log('token', 'storage');
    const token = extractTokenFromHeader(req) as string;
    console.log('token', 'storage', token);
    return this.storageService.uploadProfilePhoto(file);
  }
}
