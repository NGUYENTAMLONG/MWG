import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TOPIC_CONST } from '../constants/topic.constant';
import { ExamEntity } from 'src/exams/entities/exam.entity';

@Entity(TOPIC_CONST.MODEL_NAME)
export class TopicEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  tId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  description: string;

  @Column('simple-json', { nullable: true })
  metadata: object;

  @Column({
    type: 'varchar',
    length: 255,
    default: '/thumbnail/topics/topic-thumbnail-default.jpg',
  })
  @ApiProperty()
  thumbnail: string;

  @OneToMany(() => ExamEntity, (exam) => exam.topic)
  @ApiProperty()
  exams: ExamEntity[];
}
