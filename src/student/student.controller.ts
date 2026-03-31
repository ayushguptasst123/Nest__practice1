import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateStudentDto } from './dto/create.student.dto';
import { StudentService } from './student.service';

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
  @HttpCode(302)
  showAllUser() {
    return this.studentService.findAll();
  }

  @Get('/dummy')
  dummyController() {
    return this.studentService.findByName();
  }

  @Get('/allProfessors')
  @HttpCode(302)
  showAllProfessors() {}

  @Get(':id')
  @HttpCode(302)
  showSingleUser(@Param('id') id: string) {
    console.log(typeof id);
    return this.studentService.findById(id);
  }
}
