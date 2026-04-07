import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentService } from './students.service';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StudentDto } from './dtos/student.dto';

/**
 * CIRCULAR-DEPENDENCY: We need forwardRef() here if both the class directly calling each other
 */
@Serialize(StudentDto)
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {
    console.log('This is student controller');
  }

  // ************************************
  // Fetch students from db
  // ************************************
  @Get()
  showAllUser() {
    return this.studentService.findAll();
  }

  @Get('/lastName')
  showBasedOnLastName(@Query('lastName') lastName: string) {
    console.log('run After interceptor ');
    return this.studentService.findByLastName(lastName);
  }

  @Get('/show-removed')
  showRemovedStudents() {
    return this.studentService.findRemovedStudents();
  }

  @Get('/like')
  showBasedOnLike(@Query('description') description: string) {
    return this.studentService.findBasedOnLike(description);
  }

  @Get(':id')
  showSingleUser(@Param('id') id: string) {
    console.log(typeof id);
    return this.studentService.findById(id);
  }

  // ************************************
  // Save students to db
  // ************************************

  // We use .insert() here
  @Post('/insert')
  insertNewUser(@Body() user: CreateStudentDto) {
    return this.studentService.saveViaInsert(user);
  }

  @Post('/insert-multiple')
  insertMultipleFields(@Body() createStudentDto: CreateStudentDto[]) {
    return this.studentService.insertMultipleStudents(createStudentDto);
  }

  // ************************************
  // Update students to db
  // ************************************

  @Patch('/like-case')
  updateStudentLikeCase(
    @Query('like') likeCase: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudentWithLikeCase(
      likeCase,
      updateStudentDto,
    );
  }

  @Patch('/restore-student')
  restoreStudent(@Query('id') id: string) {
    return this.studentService.restoreStudent(id);
  }

  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  // ************************************
  // Delete students from db
  // ************************************

  @Delete('/delete')
  deleteStudent(@Query('id') id: string) {
    return this.studentService.deleteStudent(id);
  }

  @Delete('/soft')
  softDeleteStudent(@Query('id') id: string) {
    return this.studentService.softDeleteStudent(id);
  }

  @Delete('/remove')
  removeStudent(@Query('id') id: string) {
    return this.studentService.removeStudent(id);
  }
}
