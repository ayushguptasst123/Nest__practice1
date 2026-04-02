import { BadRequestException, Injectable } from '@nestjs/common';
import { Between, Like, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // ***************************
  // FIND STUDENTS FUNCTIONS HERE
  // ***************************
  async findById(id: string) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) throw new BadRequestException();
    return student;
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.query('select * from user.students');
  }

  async findByEmail(email: string) {
    return await this.studentRepository.find({ where: { email } });
  }

  async findByLastName(lastName: string) {
    const foundStudent = await this.studentRepository.find({
      where: { lastName: lastName },
    });

    if (foundStudent.length === 0)
      throw new BadRequestException(`Student didn't exists with ${lastName}`);
    return foundStudent;
  }

  async findStudentBetweenAge(fromAge, toAge) {
    const fetchedStudent = await this.studentRepository.find({
      where: { age: Between(fromAge, toAge) },
    });

    if (fetchedStudent.length === 0)
      throw new BadRequestException(
        `Students between ${fromAge}-${toAge} is not exists`,
      );

    return fetchedStudent;
  }

  async findBasedOnLike(description: string) {
    const fetchedStudent = await this.studentRepository.find({
      where: { description: Like(`%${description}%`) },
    });
    if (fetchedStudent.length === 0) throw new BadRequestException('Not Found');
    return fetchedStudent;
  }

  async findWithSortAge(sort: string, sortOrder: string) {
    return this.studentRepository.find({
      order: { [sort]: sortOrder.toUpperCase() },
    });
  }

  // ***************************
  // SAVE STUDENT FUNCTIONS HERE
  // ***************************
  async insertOneIntoDb(student: CreateStudentDto) {
    const fetchedStudent = await this.findByEmail(student.email);
    if (fetchedStudent.length != 0) {
      throw new BadRequestException('Email already exists');
    }

    const createStudent = this.studentRepository.create(student);

    createStudent.password = `hashed_${student.password}`;
    createStudent.age = this.calculateAge(student.dateOfBirth);

    return await this.studentRepository.save(student);
  }

  async saveViaInsert(student: CreateStudentDto) {
    const fetchedStudent = await this.findByEmail(student.email);
    if (fetchedStudent.length != 0) {
      throw new BadRequestException('Email already exists');
    }

    const createStudent = this.studentRepository.create(student);
    createStudent.password = `hashed_${student.password}`;
    createStudent.age = this.calculateAge(student.dateOfBirth);

    await this.studentRepository.insert(createStudent);
    return createStudent;
  }

  // ***************************
  // UPDATE STUDENT FUNCTIONS HERE
  // ***************************

  // ***************************
  // REMOVE STUDENT FUNCTIONS HERE
  // ***************************

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
