import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teachers } from './entity/teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dtos/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teachers)
    private teacherRepository: Repository<Teachers>,
  ) {}

  async createNewTeacher(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return await this.teacherRepository.save(teacher);
  }
}
