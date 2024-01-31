import { IsNotEmpty, IsEmail, Length, IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordValidation, UsernameValidation } from '@edd/common';
import { Type } from 'class-transformer';

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

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    description: 'List of role IDs the user will have',
    example: ['role-id-1', 'role-id-2'],
  })
  @IsUUID(4, { each: true })
  @ValidateNested({ each: true })
  @Type(() => String)
  readonly roles!: string[];

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    description: 'List of authority IDs the user will have',
    example: ['authority-id-1', 'authority-id-2'],
    required: false, // Make this optional if direct authorities are not mandatory
  })
  @IsUUID(4, { each: true })
  @ValidateNested({ each: true })
  @Type(() => String)
  readonly authorities!: string[];
}
