import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookCondition, Subject } from '../dto/create.book.dto';
import { Student } from 'src/students/entities/student.entity';

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

  // This create col because it's owning side
  @ManyToOne(() => Student, (student) => student.book)
  student: Student;

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
