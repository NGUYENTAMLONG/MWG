import { BaseEntity } from '../../database/base/entity.base';
import { Entity, Column, JoinTable, ManyToMany, Index } from 'typeorm';
import { PERMISSION_CONST } from '../constants/permission.constant';
import { RoleEntity } from 'src/roles/entities/role.entity';

@Entity(PERMISSION_CONST.MODEL_NAME)
export class PermissionEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  pid: string;

  @Column()
  name: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  @JoinTable({ name: 'role_permission' })
  roles: RoleEntity[];
}
