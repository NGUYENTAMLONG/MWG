import { BaseEntity } from 'src/database/base/entity.base';
import { PermissionEntity } from 'src/permissions/entities/permission.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, Index, ManyToMany, JoinTable } from 'typeorm';
import { SUBJECT_CONST } from '../constants/subject.constant';
import { LevelEntity } from 'src/levels/entities/level.entity';

@Entity(SUBJECT_CONST.MODEL_NAME)
export class SubjectEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  sId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column('simple-json', { nullable: true })
  metadata: object;

  @ManyToMany(() => LevelEntity)
  @JoinTable()
  levels: LevelEntity[];
}
