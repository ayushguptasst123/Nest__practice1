import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentDto } from './dto/create.student.dto';
import { StudentService } from './student.service';
import { ProfessorService } from 'src/professor/professor.service';

/**
 * We need forwardRef() here if both the class directly calling each other
 */
@Controller('form')
export class StudentController {
  constructor(
    private studentService: StudentService,
    // @Inject(forwardRef(() => CarService))
    private carService: ProfessorService,
  ) {}

  @Post('/create')
  createNewUser(@Body() user: StudentDto) {
    console.log(user);
    return user;
  }

  @Get()
  showAllUser() {
    return this.studentService.findAll();
  }

  @Get('/allCars')
  showAllCars() {
    return this.carService.showAll();
  }

  @Get(':id')
  showSingleUser(@Param('id') id: string) {
    console.log(typeof id);
    return this.studentService.findById(id);
  }

  @Post('/insert')
  insertNewUser(@Body() user: StudentDto) {
    // this.formService.insetIntoDB(user);
    return user;
  }
}
