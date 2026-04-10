import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subjects } from './entity/subjects.entity';
import { CreateSubjectDto } from './dtos/create-subject.dto';
import { Teachers } from '../teacher/entity/teacher.entity';
import { CreateSubjectTeacherDto } from './dtos/create-subject-teacher.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subjects)
    private subjectRepository: Repository<Subjects>,
    @InjectRepository(Teachers)
    private teacherRepository: Repository<Teachers>,
  ) {}

  async createNewSubject(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectRepository.create(createSubjectDto);
    return await this.subjectRepository.save(subject);
  }

  //   Check the mail and title of book before entry
  async createSubjectAndTeacher(
    createSubjectTeacherDto: CreateSubjectTeacherDto,
  ) {
    const subject = this.subjectRepository.create(
      createSubjectTeacherDto.subject,
    );
    const teacher = this.teacherRepository.create(
      createSubjectTeacherDto.teacher,
    );
    subject.teachers = [teacher];

    return await this.subjectRepository.save(subject);
  }
}
