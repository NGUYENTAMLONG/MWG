import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileRepository extends TypeOrmRepository<ProfileEntity> {
  constructor(
    @InjectRepository(ProfileEntity)
    profileEntity: Repository<ProfileEntity>,
  ) {
    super(profileEntity);
  }
}
