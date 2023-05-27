import { BaseEntity } from '../../../src/database/base/entity.base';
import { Entity, Column, Index, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FEEDBACK_CONST, FeedbackTypes } from '../constants/feedback.constant';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { ExamEntity } from 'src/exams/entities/exam.entity';

@Entity(FEEDBACK_CONST.MODEL_NAME)
export class FeedbackEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  fId: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty()
  message: string;

  @Column({
    type: 'simple-enum',
    enum: FeedbackTypes,
    default: FeedbackTypes.EXAM_FEEDBACK,
  })
  type: FeedbackTypes;

  // @Column({ enum: FeedbackTypes, default: FeedbackTypes.EXAM_FEEDBACK })
  // type: FeedbackTypes;

  @Column('simple-array', { nullable: true })
  feedBackImages:string[]

  @ManyToOne(() => QuestionEntity, (question) => question.feedbacks)
  question: QuestionEntity;

  @ManyToOne(() => ExamEntity, (exam) => exam.feedbacks)
  exam: ExamEntity;
}
