import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { PROFILE_SCOPE, UserGender } from '../users.constant';
import { UserEntity } from './user.entity';

@Entity()
export class ProfileEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: true, default: '' })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: '' })
  last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  @Index({ unique: true })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    default: '',
  })
  gender: string;

  @Column({ type: 'varchar', length: 30, nullable: true, default: '' })
  @Index({ unique: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  scope: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
