import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends TypeOrmRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    userEntity: Repository<UserEntity>,
  ) {
    super(userEntity);
  }
}
