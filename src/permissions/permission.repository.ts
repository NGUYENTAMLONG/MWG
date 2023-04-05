import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { TypeOrmRepository } from 'src/database/typeorm.repository';

@Injectable()
export class PermissionRepository extends TypeOrmRepository<PermissionEntity> {
  constructor(
    @InjectRepository(PermissionEntity)
    permissionEntity: Repository<PermissionEntity>,
  ) {
    super(permissionEntity);
  }
}
