import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentService } from './students.service';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StudentDto } from './dtos/student.dto';
import { CaptainGuard } from 'src/guards/captain.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { MonitorCaptainGuard } from 'src/guards/monitor-captain.guard';
import { type StudentSession } from 'src/auth/auth.controller';

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
  @UseGuards(AuthGuard, MonitorCaptainGuard)
  showAllUser() {
    return this.studentService.findAll();
  }

  @Get('/lastName')
  showBasedOnLastName(@Query('lastName') lastName: string) {
    console.log('run After interceptor ');
    return this.studentService.findByLastName(lastName);
  }

  @Get('/show-removed')
  @UseGuards(CaptainGuard)
  showRemovedStudents() {
    return this.studentService.findRemovedStudents();
  }

  @Get('/like')
  showBasedOnLike(@Query('description') description: string) {
    return this.studentService.findBasedOnLike(description);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  showSingleUser(@Param('id') id: string, @Session() session: StudentSession) {
    console.log(typeof id);

    return this.studentService.findPeerRoleOnly(id, session.studentRole!);
  }

  // ************************************
  // Save students to db
  // ************************************

  // We use .insert() here
  @Post('/insert')
  insertNewUser(@Body() user: CreateStudentDto) {
    return this.studentService.saveViaInsert(user);
  }

  @Serialize()
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

  @UseGuards(CaptainGuard)
  @Patch('/restore-student')
  restoreStudent(@Query('id') id: string) {
    return this.studentService.restoreStudent(id);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(CaptainGuard)
  @Delete('/delete')
  deleteStudent(@Query('id') id: string) {
    return this.studentService.deleteStudent(id);
  }

  @UseGuards(CaptainGuard)
  @Delete('/soft')
  softDeleteStudent(@Query('id') id: string) {
    return this.studentService.softDeleteStudent(id);
  }

  @UseGuards(CaptainGuard)
  @Delete('/remove')
  removeStudent(@Query('id') id: string) {
    return this.studentService.removeStudent(id);
  }
}
