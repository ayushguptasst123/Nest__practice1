import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfessorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  carName: string;

  @Column()
  topSpeed: number;
}
