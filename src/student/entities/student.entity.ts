import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'Students',
  synchronize: false, //<-------Doubt
})
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
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
