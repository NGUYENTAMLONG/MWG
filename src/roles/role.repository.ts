import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { RoleEntity } from './entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends TypeOrmRepository<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    roleEntity: Repository<RoleEntity>,
  ) {
    super(roleEntity);
  }
}


