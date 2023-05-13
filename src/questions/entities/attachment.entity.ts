import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, ManyToOne } from 'typeorm';
import { ATTACHMENT_CONST } from '../contants/question.constant';
import { QuestionEntity } from './question.entity';

@Entity(ATTACHMENT_CONST.MODEL_NAME)
export class AttachmentEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  aId: string;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'varchar', nullable: false })
  note: string;

  @Column({ type: 'varchar', nullable: false })
  source: string;

  @Column('simple-json', { nullable: true })
  metadata: object;

  @ManyToOne(() => QuestionEntity, (question) => question.attachments)
  question: QuestionEntity;
  //image for question
  //audio for question
  //video for question
}
