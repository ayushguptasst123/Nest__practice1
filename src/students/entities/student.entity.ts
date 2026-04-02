import {
  BeforeInsert,
  BeforeUpdate,
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Students')
@Check(`("age">0 and "age"<=100)`)
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'int',
  })
  age: number;

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

  @Column({ length: 500 })
  description: string;

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
