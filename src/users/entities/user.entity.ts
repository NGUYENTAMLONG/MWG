import { BaseEntity } from 'src/database/base/entity.base';
import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  uId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Index({ unique: true })
  username: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '/avatars/avatar-default.jpg',
  })
  avatar: string;
}
