import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Between, Like, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // **************************************
  // FIND STUDENTS FUNCTIONS HERE
  // **************************************
  async findById(id: string) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student)
      throw new BadRequestException(`Student not found with id: ${id}`);
    return student;
  }

  async findAll(): Promise<Student[]> {
    const fetchedStudent: Student[] = await this.studentRepository.find();

    if (fetchedStudent.length === 0)
      throw new BadRequestException('No Student found');

    return fetchedStudent;
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

  // **************************************
  // SAVE STUDENT FUNCTIONS HERE
  // **************************************
  async insertOneIntoDb(student: CreateStudentDto) {
    const fetchedStudent = await this.findByEmail(student.email);
    if (fetchedStudent.length != 0) {
      throw new BadRequestException('Email already exists');
    }

    const createStudent = this.studentRepository.create(student);

    createStudent.password = `hashed_${student.password}`;
    createStudent.age = this.calculateAge(student.dateOfBirth);

    const value = await this.studentRepository.save(createStudent);
    console.log(value);
    return value;
  }

  async saveViaInsert(student: CreateStudentDto) {
    const fetchedStudent = await this.findByEmail(student.email);
    if (fetchedStudent.length != 0) {
      throw new BadRequestException('Email already exists');
    }

    const createStudent = this.studentRepository.create(student);
    createStudent.password = `hashed_${student.password}`;
    createStudent.age = this.calculateAge(student.dateOfBirth);

    const value = await this.studentRepository.insert(createStudent);
    console.log(value);

    return createStudent;
  }

  async insertMultipleStudents(createStudentDto: CreateStudentDto[]) {
    const studentWithAge = createStudentDto.map((student) => {
      return { ...student, age: this.calculateAge(student.dateOfBirth) };
    });

    return await this.studentRepository.insert(studentWithAge);
  }

  // **************************************
  // UPDATE STUDENT FUNCTIONS HERE
  // **************************************
  async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
    const fetchedStudent = await this.findById(id);

    Object.assign(fetchedStudent, updateStudentDto);
    return await this.studentRepository.save(fetchedStudent);
  }

  async updateStudentWithLikeCase(
    likeCase: string,
    updateStudentDto: UpdateStudentDto,
  ) {
    const fetchedStudent = await this.findBasedOnLike(likeCase);

    const updatedStudent = await Promise.all(
      fetchedStudent.map((student) => {
        return this.studentRepository.update(student.id, updateStudentDto);
      }),
    );

    return updatedStudent;
  }

  // **************************************
  // REMOVE STUDENT FUNCTIONS HERE
  // **************************************

  async deleteStudent(id: string) {
    return await this.studentRepository.delete(id);
  }

  async softDeleteStudent(id: string) {
    return await this.studentRepository.softDelete(id);
  }

  async removeStudent(id: string) {
    try {
      const student = await this.findById(id);
      return await this.studentRepository.remove(student);
    } catch (error) {
      console.error('you got error in Service class ', error);
      throw new HttpException(
        `You got error in service class ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
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
