import { Controller, Get } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { StudentService } from 'src/student/student.service';

@Controller('car')
export class ProfessorController {
  constructor(
    private carService: ProfessorService,
    // @Inject(forwardRef(() => FormService))
    private formService: StudentService,
  ) {}

  @Get('/allCar')
  showAllCar() {
    return this.carService.showAll();
  }

  @Get('/allUser')
  showAllUsers() {
    // return 'SOmething';
    return this.formService.findAll();
  }
}
