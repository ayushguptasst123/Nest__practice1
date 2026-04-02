import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

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

  async findByEmail(email: string) {
    return await this.studentRepository.find({ where: { email } });
  }

  async insertOneIntoDb(student: CreateStudentDto) {
    const fetchedUser = await this.findByEmail(student.email);
    if (fetchedUser.length != 0) {
      throw new BadRequestException('Email already exists');
    }

    const user = this.studentRepository.create(student);

    user.password = `hashed_${user.password}`;
    user.age = this.calculateAge(student.dateOfBirth);

    return await this.studentRepository.save(user);
  }

  async saveViaInsert(user: CreateStudentDto) {
    const fetchedUser = await this.findByEmail(user.email);
    if (fetchedUser.length != 0) {
      throw new BadRequestException('Email already exists');
    }

    const createUser = this.studentRepository.create(user);

    await this.studentRepository.insert(createUser);
    return createUser;
  }

  // -------------------------------------------------
  // Calculate the age based on the given dateOfBirth
  // -------------------------------------------------
  calculateAge(dob: Date) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
