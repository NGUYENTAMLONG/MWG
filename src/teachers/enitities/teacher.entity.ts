import { BaseEntity } from 'src/database/base/entity.base';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { TEACHER_CONST } from '../constants/teacher.constant';

@Entity(TEACHER_CONST.MODEL_NAME)
export class TeacherEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  tId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  expertise: string;

  @Column('simple-array', { nullable: true })
  achievements: string[];

  @Column('simple-json', { nullable: true })
  metadata: object;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
