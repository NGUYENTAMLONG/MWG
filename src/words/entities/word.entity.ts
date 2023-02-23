import { BaseEntity } from 'src/database/base/entity.base';
import {
  Entity,
  Column,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class WordEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  @Index({ unique: true })
  wId: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @Index({ unique: true })
  word: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  part_of_speech: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  example: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  meaning: string;
}
