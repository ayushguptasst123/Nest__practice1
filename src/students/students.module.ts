import { Module } from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/student.entity';

@Module({
  providers: [StudentService],
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([Student])],
  exports: [StudentService, TypeOrmModule],
})
export class StudentModule {
  constructor() {
    console.log('This is form Module');
  }
}
