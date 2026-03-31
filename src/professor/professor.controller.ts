import { Controller, Get } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { StudentService } from 'src/student/student.service';

@Controller('professor')
export class ProfessorController {
  constructor(
    private professorService: ProfessorService,
    // @Inject(forwardRef(() => FormService))
    private studentService: StudentService,
  ) {}

  @Get('/allProfessor')
  showAllProfessor() {
    return this.professorService.showAll();
  }

  @Get('/allUser')
  showAllStudent() {
    // return 'SOmething';
    return this.studentService.findAll();
  }
}
