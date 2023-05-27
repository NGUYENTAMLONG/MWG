import { BaseEntity } from '../../../src/database/base/entity.base';
import {
  Entity,
  Column,
  Index,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { RoleEntity } from '../../roles/entities/role.entity';
import { USER_CONST } from '../constants/user.constant';
import { ApiProperty } from '@nestjs/swagger';

@Entity(USER_CONST.MODEL_NAME)
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  uId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty()
  @Index({ unique: true })
  username: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @ApiProperty()
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @ApiProperty()
  @Index({ unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '/avatars/avatar-default.jpg',
  })
  @ApiProperty()
  avatar: string;

  @Column({ default: false })
  @ApiProperty()
  isSuperAdmin: boolean;

  @Column({ default: true })
  @ApiProperty()
  isActive: boolean;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @ApiProperty()
  roles: RoleEntity[];

  @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: ProfileEntity;
}
