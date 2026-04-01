import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create.student.dto';
import { StudentService } from './students.service';

/**
 * CIRCULAR-DEPENDENCY: We need forwardRef() here if both the class directly calling each other
 */
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {
    console.log('This is student controller');
  }

  @Post('/create')
  createNewUser(@Body() user: CreateStudentDto) {
    return this.studentService.insertOneIntoDb(user);
  }

  @Get()
  showAllUser() {
    return this.studentService.findAll();
  }

  @Get('/dummy')
  dummyController() {
    return this.studentService.findByName();
  }

  @Get('/allProfessors')
  showAllProfessors() {}

  @Get(':id')
  showSingleUser(@Param('id') id: string) {
    console.log(typeof id);
    return this.studentService.findById(id);
  }
}
