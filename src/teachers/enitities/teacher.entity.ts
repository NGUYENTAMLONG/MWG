import { BaseEntity } from 'src/database/base/entity.base';
import { PermissionEntity } from 'src/permissions/entities/permission.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  Index,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { TEACHER_CONST } from '../constants/teacher.constant';

@Entity(TEACHER_CONST.MODEL_NAME)
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  tId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Index({ unique: true })
  name: string;
}
