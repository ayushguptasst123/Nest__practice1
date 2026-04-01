import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dtos/create.student.dto';

@Injectable()
export class StudentService implements OnModuleInit {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
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
        phoneNumber: '+919123456789',
        email: 'riya.mehta@gmail.com',
        description: 'new student entry',
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

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.query('select * from user.students');
    // return await this.studentRepository.find({
    //   order: {
    //     name: 'asc',
    //   },
    // });
  }

  async findByName() {
    return await this.studentRepository.find({
      select: {
        name: true,
        address: true,
      },
    });
  }

  async insertOneIntoDb(student: CreateStudentDto) {
    try {
      return await this.studentRepository.save(student);
    } catch (err) {
      if (err instanceof Error)
        throw new InternalServerErrorException(err.message);
      throw new InternalServerErrorException('Unknown error');
    }
  }

  /*
    Deep dive on other functions like .find(), .findOne() ...
  */
}
