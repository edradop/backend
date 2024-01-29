import { Module } from '@nestjs/common';
import { RoleService } from './service';
import { RoleController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './type';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [TypeOrmModule],
})
export class RoleModule {}
