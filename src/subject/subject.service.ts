import { Injectable, NotFoundException } from '@nestjs/common';
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
    subject.teachers = teacher;

    return await this.subjectRepository.save(subject);
  }

  async showTeachers(id: string) {
    const subjects = await this.subjectRepository.find({
      where: { id },
      relations: { teachers: true },
    });

    console.log(subjects);
    return subjects;
  }

  async assignTeacher(subjectId: string, teacherId: string) {
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: { teachers: true },
    });

    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
    });

    if (!subject) throw new NotFoundException('Subject is not found');
    if (!teacher) throw new NotFoundException('Teacher is not found');
    if (!subject.teachers) subject.teachers = [];

    subject.teachers.push(teacher);

    return this.subjectRepository.save(subject);
  }

  async removeTeacher(subjectId: string, teacherId: string) {
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: { teachers: true },
    });

    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
    });

    if (!subject) throw new NotFoundException('Subject is not found');
    if (!teacher) throw new NotFoundException('Teacher is not found');

    subject.teachers = subject.teachers.filter((t) => t.id !== teacher.id);

    return this.subjectRepository.save(subject);
  }
}
