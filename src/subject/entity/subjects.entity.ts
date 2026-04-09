import { Teachers } from 'src/teacher/entity/teacher.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subjects {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  credits: number;

  @ManyToMany(() => Teachers, (teacher) => teacher.subjects)
  teachers: Teachers[];
}
