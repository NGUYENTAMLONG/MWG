import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, ManyToOne } from 'typeorm';
import { ANSWER_CONST } from '../contants/answer.constant';
import { QuestionEntity } from 'src/questions/entities/question.entity';

@Entity(ANSWER_CONST.MODEL_NAME)
export class AnswerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  aId: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ type: 'boolean', nullable: false })
  correct: boolean;

  @Column('simple-json', { nullable: true })
  metadata: object;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  question: QuestionEntity;
}
