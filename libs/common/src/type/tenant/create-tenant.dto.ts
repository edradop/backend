import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUppercase, Length } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ example: 'super user', description: 'Name of the role' })
  @Length(3, 50)
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'SUPER_USER', description: 'Code of the role' })
  @Length(3, 50)
  @IsNotEmpty()
  @IsUppercase()
  code!: string;
}
