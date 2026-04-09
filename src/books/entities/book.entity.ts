import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookCondition, Subject } from '../dto/create.book.dto';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bookName: string;

  @Column()
  authorName: string;

  @Column()
  publishYear: number;

  @Column({
    type: 'enum',
    enum: BookCondition,
  })
  condition: BookCondition;

  @Column({
    type: 'enum',
    enum: Subject,
  })
  subject: Subject;

  @Column({
    name: 'description',
    length: 1000,
    nullable: true,
  })
  description: string;

  // ================
  // Above this
  // ================
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
