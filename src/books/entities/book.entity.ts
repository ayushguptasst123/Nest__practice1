import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from '../dto/create.book.dto';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  bookName: string;

  @Column()
  authorName: string;

  @Column({
    type: 'enum',
    enum: Genre,
  })
  genre: Genre;

  @Column()
  totalPages: number;

  @Column({
    name: 'book_description',
    length: 1000,
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
