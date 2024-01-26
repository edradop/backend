import { Module } from '@nestjs/common';
import { AuthorityController } from './controller';
import { AuthorityService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authority } from './type';
import { HttpExceptionModule } from '@edd/common/module/http-exception';
import { Role } from '../role';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Authority]), HttpExceptionModule],
  controllers: [AuthorityController],
  providers: [AuthorityService],
})
export class AuthorityModule {}
