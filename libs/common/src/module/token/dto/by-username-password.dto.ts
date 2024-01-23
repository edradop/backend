import { PasswordValidation, UsernameValidation } from '@edd/common';
import { ApiProperty } from '@nestjs/swagger';

export class UsernamePasswordDto {
  @ApiProperty({
    nullable: true,
    example: 'johnsmith1234567890',
    description: 'Username of the user',
  })
  @UsernameValidation()
  username!: string;

  @ApiProperty({ example: 'yourSecureP@ssw0rd', description: 'Password of the user' })
  @PasswordValidation()
  readonly password!: string;
}
