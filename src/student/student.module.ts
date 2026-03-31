import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';

@Module({
  providers: [StudentService],
  controllers: [StudentController],
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  exports: [StudentService],
})
export class StudentModule {
  constructor() {
    console.log('This is form Module');
  }
}
