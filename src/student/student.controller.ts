import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StudentDto } from './dto/create.student.dto';
import { StudentService } from './student.service';
import { ProfessorService } from 'src/professor/professor.service';

/**
 * CIRCULAR-DEPENDENCY: We need forwardRef() here if both the class directly calling each other
 */
@Controller('student')
export class StudentController {
  constructor(
    private studentService: StudentService,
    private professorService: ProfessorService,
  ) {
    console.log('This is student controller');
  }

  @Post('/create')
  createNewUser(@Body() user: StudentDto) {
    console.log(user);
    return user;
  }

  @Get()
  @HttpCode(302)
  showAllUser() {
    return this.studentService.findAll();
  }

  @Get('/allProfessors')
  @HttpCode(302)
  showAllProfessors() {
    return this.professorService.showAll();
  }

  @Get(':id')
  @HttpCode(302)
  showSingleUser(@Param('id') id: string) {
    console.log(typeof id);
    return this.studentService.findById(id);
  }
}
