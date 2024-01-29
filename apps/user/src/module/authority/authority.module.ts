import { Module } from '@nestjs/common';
import { AuthorityController } from './controller';
import { AuthorityService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authority } from './type';
import { HttpExceptionModule } from '@edd/common/module/http-exception';

@Module({
  imports: [TypeOrmModule.forFeature([Authority]), HttpExceptionModule],
  controllers: [AuthorityController],
  providers: [AuthorityService],
  exports: [TypeOrmModule],
})
export class AuthorityModule {}
