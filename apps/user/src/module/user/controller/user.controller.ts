import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../service';
import { CreateUserDto, User } from '../type';
import {
  EmailPasswordDto,
  SignUpDto,
  UsernamePasswordDto,
} from '@edd/common/module/authentication';
import { Public } from '@edd/common';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post()
  signUp(@Body() user: SignUpDto): Promise<User> {
    return this.userService.signUp(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post('by-email-password')
  getUserByEmailPassword(@Body() { email, password }: EmailPasswordDto): Promise<User | null> {
    return this.userService.getUserByEmailPassword(email, password);
  }

  @Post('by-username-password')
  getUserByUsernamePassword(
    @Body() { username, password }: UsernamePasswordDto,
  ): Promise<User | null> {
    return this.userService.getUserByUsernamePassword(username, password);
  }

  @Get('by-id/:id')
  getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
