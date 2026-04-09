import { Book } from 'src/books/entities/book.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StudentRole {
  STUDENT = 'student',
  MONITOR = 'monitor',
  CAPTAIN = 'captain',
}

@Entity('Students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: StudentRole,
    default: StudentRole.STUDENT,
  })
  role: StudentRole;

  @OneToMany(() => Book, (book) => book.student)
  book: Book[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // Lifecycle Hook
  @BeforeInsert()
  beforeInsert() {
    console.log('I print text before insert');
  }

  @BeforeUpdate()
  beforeUpdate() {
    console.log('I print text before insert');
  }
}
