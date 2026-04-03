import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentService } from './students.service';
import { UpdateStudentDto } from './dtos/update-student.dto';

/**
 * CIRCULAR-DEPENDENCY: We need forwardRef() here if both the class directly calling each other
 */
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
    return this.studentService.findByLastName(lastName);
  }

  @Get('/showBetween')
  showSpecificGroup(
    @Query('fromAge') fromAge: string,
    @Query('toAge') toAge: string,
  ) {
    return this.studentService.findStudentBetweenAge(fromAge, toAge);
  }

  @Get('/like')
  showBasedOnLike(@Query('description') description: string) {
    return this.studentService.findBasedOnLike(description);
  }

  @Get('/sort')
  showBasedOnSort(
    @Query('sortField') sortColumn: string,
    @Query('order') sortOrder: string,
  ) {
    return this.studentService.findWithSortAge(sortColumn, sortOrder);
  }

  @Get(':id')
  showSingleUser(@Param('id') id: string) {
    console.log(typeof id);
    return this.studentService.findById(id);
  }

  // ************************************
  // Save students to db
  // ************************************
  @Post('/create')
  createNewUser(@Body() user: CreateStudentDto) {
    return this.studentService.insertOneIntoDb(user);
  }

  /**
   * This way use .insert() to save data in db
   */
  @Post('/insert')
  insertNewUser(@Body() user: CreateStudentDto) {
    return this.studentService.saveViaInsert(user);
  }

  // ************************************
  // Update students to db
  // ************************************

  @Put(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  // ************************************
  // Delete students from db
  // ************************************
}
