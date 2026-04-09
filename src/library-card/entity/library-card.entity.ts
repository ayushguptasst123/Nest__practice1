import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LibraryCard {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  cardNumber: string;

  @Column({ default: true })
  isActive: boolean;

  // The Owner Side: This creates the 'studentId' column in the library_card table
  @OneToOne(() => Student, (student) => student.libraryCard)
  @JoinColumn()
  student: Student;
}
