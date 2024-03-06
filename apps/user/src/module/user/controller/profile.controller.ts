import { extractTokenFromHeader } from '@edd/common';
import { UpdatePasswordDto } from '@edd/common/type/user';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Header,
  Logger,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '../export';
import { ProfileService } from '../service';

@ApiTags('profile')
@ApiBearerAuth()
@Controller({ path: 'profile', version: '1' })
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);
  constructor(private readonly profileService: ProfileService) {}

  @Post('update-password')
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    this.logger.debug('user controller update password');
    return this.profileService.updatePassword(updatePasswordDto);
  }

  @Get('profile-photo')
  // @Header('Content-Type', 'application/octet-stream')
  // @Header('Content-Disposition', 'attachment; filename="filename.bin"')
  @Header('Content-Type', 'image/jpeg') // TODO: need to change
  async profilePhoto(@Req() req: Request): Promise<Buffer> {
    const token = extractTokenFromHeader(req);
    return await this.profileService.getProfilePhoto(token);
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
    const token = extractTokenFromHeader(req as unknown as Request)!;
    return this.profileService.uploadProfilePhoto(token, req.user, file);
  }
}
