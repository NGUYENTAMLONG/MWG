import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { PROFILE_CONST } from '../constants/profile.constant';

@Entity(PROFILE_CONST.MODEL_NAME)
export class ProfileEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: true, default: '' })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: '' })
  last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    default: '',
  })
  gender: string;

  @Column({ type: 'varchar', length: 30, nullable: true, default: '' })
  phone_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  scope: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
