import { PasswordValidation } from '@edd/common/decoration';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailPasswordDto {
  @ApiProperty({ example: 'johndoe@example.com', description: 'Email address of the user' })
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ example: 'yourSecureP@ssw0rd', description: 'Password of the user' })
  @PasswordValidation()
  readonly password!: string;
}
