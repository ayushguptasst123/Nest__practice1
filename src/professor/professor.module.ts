import { forwardRef, Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorEntity } from './entities/professor.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
  controllers: [ProfessorController],
  providers: [ProfessorService],
  imports: [
    forwardRef(() => StudentModule),
    TypeOrmModule.forFeature([ProfessorEntity]),
  ],
  exports: [ProfessorService],
})
export class ProfessorModule {
  constructor() {
    console.log('This is Car Module');
  }
}
