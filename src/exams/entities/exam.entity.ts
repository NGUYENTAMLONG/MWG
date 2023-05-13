import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EXAM_CONST } from '../constants/exam.constant';
import { TopicEntity } from 'src/topics/entities/topic.entity';
import { LevelEntity } from 'src/levels/entities/level.entity';
import { FeedbackEntity } from 'src/feedbacks/entities/feedback.entity';

@Entity(EXAM_CONST.MODEL_NAME)
export class ExamEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  eId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  note: string;

  @Column({ type: 'float', nullable: true })
  @ApiProperty()
  duration: number;

  @Column('simple-json', { nullable: true })
  metadata: object;

  @ManyToOne(() => TopicEntity, (topic) => topic.exams)
  @ApiProperty()
  topic: TopicEntity;

  @ManyToOne(() => LevelEntity, (level) => level.exams)
  @ApiProperty()
  level: LevelEntity;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.exam)
  feedbacks: FeedbackEntity[];
}
