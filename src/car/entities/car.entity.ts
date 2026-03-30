import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CarEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  carName: string;

  @Column()
  topSpeed: number;
}
