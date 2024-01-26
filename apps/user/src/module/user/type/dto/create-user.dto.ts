import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordValidation, UsernameValidation } from '@edd/common';

export class CreateUserDto {
  id!: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsNotEmpty()
  @Length(3, 50)
  readonly firstName!: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsNotEmpty()
  @Length(3, 50)
  readonly lastName!: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Email address of the user' })
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @ApiProperty({ example: 'yourSecureP@ssw0rd', description: 'Password of the user' })
  @PasswordValidation()
  readonly password!: string;

  @ApiProperty({
    nullable: true,
    example: 'johnsmith1234567890',
    description: 'Username of the user',
  })
  @UsernameValidation()
  username?: string;
}
