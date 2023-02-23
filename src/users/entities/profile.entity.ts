import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, OneToOne } from 'typeorm';
import { PROFILE_SCOPE, UserGender } from '../users.constant';
import { UserEntity } from './user.entity';

// export type Profile_Scope =
//   | 'address'
//   | 'first_name'
//   | 'last_name'
//   | 'gender'
//   | 'nickname'
//   | 'phone_number'
//   | '';
@Entity()
export class ProfileEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Index({ unique: true })
  nickname: string;

  @Column({ type: 'varchar', enum: UserGender, length: 10, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  @Index({ unique: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column('varchar', { array: true })
  scope: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;
}
