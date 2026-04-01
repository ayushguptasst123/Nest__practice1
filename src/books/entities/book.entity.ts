import {
  Column,
  CreateDateColumn,
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
  totalPage: number;

  @Column({
    name: 'book_description',
    length: 1000,
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  update_on: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  deleted_on: boolean | Date;
}
