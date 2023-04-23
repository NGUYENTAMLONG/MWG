import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, ManyToOne, OneToMany } from 'typeorm';
import { LEVEL_CONST } from '../contants/level.constant';
import { ExamEntity } from 'src/exams/entities/exam.entity';

@Entity(LEVEL_CONST.MODEL_NAME)
export class LevelEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  aId: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ type: 'varchar', nullable: false })
  correct: string;

  @Column('simple-json', { nullable: true })
  metadata: object;

  @OneToMany(() => ExamEntity, (exam) => exam.level)
  exams: ExamEntity[];
}
