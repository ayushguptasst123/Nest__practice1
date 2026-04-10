import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateTeacherDto } from 'src/teacher/dtos/create-teacher.dto';
import { CreateSubjectDto } from './create-subject.dto';

export class CreateSubjectTeacherDto {
  @ValidateNested()
  @Type(() => CreateSubjectDto)
  subject: CreateSubjectDto;

  @ValidateNested()
  @Type(() => CreateTeacherDto)
  teacher: CreateTeacherDto;
}
