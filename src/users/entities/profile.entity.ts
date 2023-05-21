import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Gender, PROFILE_CONST, Scope } from '../constants/profile.constant';

@Entity(PROFILE_CONST.MODEL_NAME)
export class ProfileEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  prId: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: '' })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: '' })
  last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  @Index({ unique: true })
  nickname: string;

  @Column({ enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Column({ type: 'varchar', length: 30, nullable: true, default: '' })
  @Index({ unique: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  address: string;

  @Column('varchar', { array: true, nullable: true })
  scope: string[];

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn({})
  user: UserEntity;
}
