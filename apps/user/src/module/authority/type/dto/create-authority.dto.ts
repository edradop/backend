import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUppercase, Length } from 'class-validator';

export class CreateAuthorityDto {
  @ApiProperty({ example: 'create user', description: 'Name of the authority' })
  @Length(3, 50)
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'CREATE_USER', description: 'Code of the authority' })
  @Length(3, 50)
  @IsNotEmpty()
  @IsUppercase()
  code!: string;
}
