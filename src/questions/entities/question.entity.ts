import { BaseEntity } from '../../../src/database/base/entity.base';
import { Entity, Column, Index, OneToMany } from 'typeorm';
import { QUESTION_CONST } from '../contants/question.constant';
import { AnswerEntity } from 'src/answers/entities/answer.entity';
import { FeedbackEntity } from 'src/feedbacks/entities/feedback.entity';
import { AttachmentEntity } from './attachment.entity';

@Entity(QUESTION_CONST.MODEL_NAME)
export class QuestionEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  qId: string;

  @Column({ type: 'varchar', nullable: false })
  question: string;

  @Column({ type: 'varchar', nullable: false })
  explain: string;

  @Column({ type: 'varchar', nullable: false })
  note: string;

  @Column({ type: 'varchar', nullable: false })
  suggest: string;

  @Column('simple-json', { nullable: true })
  metadata: object;

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.question)
  feedbacks: FeedbackEntity[];

  @OneToMany(() => AttachmentEntity, (attachment) => attachment.question)
  attachments: AttachmentEntity[];
  //image for question
  //audio for question
  //video for question
}
