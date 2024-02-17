import { Authorities } from '@edd/common';
import { CreateUserDto, UpdateUserDto } from '@edd/common/type/user';
import { AuthorityEnum } from '@edd/config';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../export';
import { UserService } from '../service';

@ApiTags('user')
@ApiBearerAuth()
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Authorities(AuthorityEnum.CREATE_USER)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Authorities(AuthorityEnum.READ_USER)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @Authorities(AuthorityEnum.READ_USER)
  async findOne(@Param('id') id: string): Promise<User | null> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @Authorities(AuthorityEnum.UPDATE_USER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Authorities(AuthorityEnum.DELETE_USER)
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
