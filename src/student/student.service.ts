import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private usersRepository: Repository<StudentEntity>,
  ) {}

  async findById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new BadRequestException();
    return user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }
  /*
    Deep dive on other functions like .find(), .findOne() ...
  */
}
