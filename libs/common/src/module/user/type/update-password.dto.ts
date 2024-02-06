import { PasswordValidation } from '@edd/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'aaaaaaa----aaaaaaa', description: 'Password of the user' })
  id!: string;

  @ApiProperty({ example: 'yourSecureP@ssw0rd', description: 'Password of the user' })
  @PasswordValidation()
  readonly password!: string;

  @ApiProperty({ example: 'yourSecureP@ssw023', description: 'Password of the user' })
  @PasswordValidation()
  readonly newPassword!: string;
}
