import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleRepository } from './role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from 'src/permissions/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity])],
  providers: [RolesService, RoleRepository],
  controllers: [RolesController],
})
export class RolesModule {}
