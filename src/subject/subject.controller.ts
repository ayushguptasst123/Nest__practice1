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
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { Public } from 'src/decorator/public.decorator';
import { CreateSubjectTeacherDto } from './dtos/create-subject-teacher.dto';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Post()
  @Public()
  createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.createNewSubject(createSubjectDto);
  }

  @Post('with-teacher')
  @Public()
  createSubjectAndTeacher(
    @Body()
    createSubjectTeacherDto: CreateSubjectTeacherDto,
  ) {
    return this.subjectService.createSubjectAndTeacher(createSubjectTeacherDto);
  }

  @Public()
  @Get('/:id')
  showTeachers(@Param('id') id: string) {
    return this.subjectService.showTeachers(id);
  }

  @Public()
  @Patch()
  assignTeachers(
    @Query('subjectId') subjectId: string,
    @Query('teacherId') teacherId: string,
  ) {
    return this.subjectService.assignTeacher(subjectId, teacherId);
  }

  @Public()
  @Delete()
  removeTeachers(
    @Query('subjectId') subjectId: string,
    @Query('teacherId') teacherId: string,
  ) {
    return this.subjectService.removeTeacher(subjectId, teacherId);
  }
}
