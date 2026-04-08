import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const myScrypt = promisify(scrypt);

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
      throw new NotFoundException(`Student not found with id: ${id}`);
    return student;
  }

  async findAll(): Promise<Student[]> {
    const fetchedStudent: Student[] = await this.studentRepository.find();

    return fetchedStudent;
  }

  // SELECT * FROM student WHERE deletedAt IS NOT NULL;
  async findRemovedStudents() {
    return await this.studentRepository.find({
      withDeleted: true, //include soft delete rows
      where: {
        deletedAt: Not(IsNull()),
      },
    });
  }

  async findByEmail(email: string) {
    const foundStudent = await this.studentRepository.find({
      where: { email },
    });
    if (!foundStudent)
      throw new NotFoundException(`Student not found with email: ${email}`);

    return foundStudent;
  }

  async findByLastName(lastName: string) {
    const foundStudent = await this.studentRepository.find({
      where: { lastName: lastName },
    });

    if (foundStudent.length === 0)
      throw new NotFoundException(`Student didn't exists with ${lastName}`);
    return foundStudent;
  }

  async findBasedOnLike(description: string) {
    const fetchedStudent = await this.studentRepository.find({
      where: { description: Like(`%${description}%`) },
    });
    return fetchedStudent;
  }

  // **************************************
  // SAVE STUDENT FUNCTIONS HERE
  // **************************************
  async save(student: CreateStudentDto) {
    const createStudent = this.studentRepository.create(student);

    return await this.studentRepository.save(createStudent);
  }

  async saveViaInsert(student: CreateStudentDto) {
    const createStudent = this.studentRepository.create(student);
    createStudent.password = `hashed_${student.password}`;

    const value = await this.studentRepository.insert(createStudent);
    console.log(value);

    return createStudent;
  }

  // async insertMultipleStudents(createStudentDto: CreateStudentDto[]) {
  //   try {
  //     return await this.studentRepository.insert(createStudentDto);
  //   } catch (err) {
  //     console.log(err);
  //     throw new ConflictException('Some Email is already in use');
  //   }
  // }

  // .insert() Either all succeed OR all fail
  async insertMultipleStudents(createStudentDto: CreateStudentDto[]) {
    const modifiedStudentDto = await Promise.all(
      createStudentDto.map(async (student) => {
        const isEmailExists = await this.studentRepository.find({
          where: { email: student.email },
        });
        if (isEmailExists.length != 0) {
          console.log(isEmailExists);
          throw new BadRequestException('Email already in use');
        }

        await this.findByEmail(student.email);

        const salt = randomBytes(8).toString('hex');
        const hash = (await myScrypt(student.password, salt, 32)) as Buffer;

        return {
          ...student,
          password: salt + '.' + hash.toString('hex'),
        };
      }),
    );

    try {
      const savedStudent =
        await this.studentRepository.insert(modifiedStudentDto);
      console.log(savedStudent.identifiers);
      return savedStudent.identifiers;
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'errno' in err &&
        (err as { errno: number }).errno === 1062
      ) {
        throw new BadRequestException('One or more emails already exist');
      }
      throw err;
    }
  }

  async restoreStudent(id: string) {
    const restoredStudent = await this.studentRepository.restore(id);
    if (!restoredStudent)
      throw new NotFoundException(`Student with id: ${id} didn't found`);
    return restoredStudent;
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
    await this.findById(id);
    await this.studentRepository.delete(id);

    return {
      message: 'Student selected successfully',
    };
  }

  async softDeleteStudent(id: string) {
    await this.findById(id);
    await this.studentRepository.softDelete(id);
    return {
      message: 'Soft deleted successfully',
    };
  }

  async removeStudent(id: string) {
    const student = await this.findById(id);
    await this.studentRepository.remove(student);
    return {
      message: 'Student removed successfully',
    };
  }

  async changeRole(id: string, role: string) {}
}
