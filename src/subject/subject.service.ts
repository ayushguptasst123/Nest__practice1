import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subjects } from './entity/subjects.entity';
import { CreateSubjectDto } from './dtos/create.subject.dto';
import { Teachers } from '../teacher/entity/teacher.entity';

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
    subjectData: CreateSubjectDto,
    teacherData: Partial<Teachers>,
  ) {
    const subject = this.subjectRepository.create(subjectData);
    const teacher = this.teacherRepository.create(teacherData);

    const savedSubject = await this.subjectRepository.save(subject);
    const savedTeacher = await this.teacherRepository.save(teacher);

    return { subject: savedSubject, teacher: savedTeacher };
  }
}
