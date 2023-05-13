import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmRepository } from 'src/database/typeorm.repository';
import { Repository } from 'typeorm';
import { AttachmentEntity } from './entities/attachment.entity';

@Injectable()
export class AttachmentRepository extends TypeOrmRepository<AttachmentEntity> {
  constructor(
    @InjectRepository(AttachmentEntity)
    attachmentEntity: Repository<AttachmentEntity>,
  ) {
    super(attachmentEntity);
  }
}
