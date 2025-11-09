import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EntryType {
  MOVIE = 'Movie',
  TV_SHOW = 'TV Show',
}

@Entity('entries')
export class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({
    type: 'enum',
    enum: EntryType,
  })
  type: EntryType;

  @Column({ type: 'varchar', length: 255 })
  director: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  budget: number;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'int' })
  duration: number; // Duration in minutes

  @Column({ type: 'int' })
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
