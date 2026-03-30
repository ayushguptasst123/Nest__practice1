import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role, StudentEntity } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentService implements OnModuleInit {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async onModuleInit() {
    const id = '9f1c2a7e-6b3d-4c8f-9a21-5d7e8b3c4a11';

    const student = await this.studentRepository.findOneBy({ id });

    if (!student) {
      console.log(`Seeding data`);
      const newStudent = this.studentRepository.create({
        id: id,
        name: 'Riya Mehta',
        dateOfBirth: new Date(), // 🎲 random DOB between 18–30 years
        address: 'House No. 45, Sunrise Society, Navrangpura, Ahmedabad',
        phoneNumber: '9123456789',
        email: 'riya.mehta@gmail.com',
        description: 'new student entry',
        role: Role.MANGER,
      });
      await this.studentRepository.save(newStudent);
      return newStudent;
    }
  }

  async findById(id: string) {
    const user = await this.studentRepository.findOneBy({ id });
    if (!user) throw new BadRequestException();
    return user;
  }

  async findAll() {
    return await this.studentRepository.find();
  }
  /*
    Deep dive on other functions like .find(), .findOne() ...
  */
}
