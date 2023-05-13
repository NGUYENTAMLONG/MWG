import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  @ApiProperty()
  id: number;

  @CreateDateColumn()
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updated_at: Date;

  @DeleteDateColumn()
  @ApiProperty()
  deleted_at: Date;

  @Column({ nullable: true })
  @ApiProperty()
  createdByUserId: string;

  @Column({ nullable: true })
  @ApiProperty()
  lastModifiedByUserId: string;
}
