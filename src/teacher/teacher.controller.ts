import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeacherDto } from './dtos/create-teacher.dto';
import { TeacherService } from './teacher.service';
import { Public } from 'src/decorator/public.decorator';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post()
  @Public()
  createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createNewTeacher(createTeacherDto);
  }
}
