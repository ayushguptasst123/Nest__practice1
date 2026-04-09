import { Body, Controller, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dtos/create.subject.dto';
import { Public } from 'src/decorator/public.decorator';
import { CreateTeacherDto } from '../teacher/dtos/create-teacher.dto';

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
  @Public()
  createSubjectAndTeacher(
    @Body('subject') subjectData: CreateSubjectDto,
    @Body('teacher') teacherData: CreateTeacherDto,
  ) {
    return this.subjectService.createSubjectAndTeacher(
      subjectData,
      teacherData,
    );
  }
}
