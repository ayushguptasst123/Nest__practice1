import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createBookDto } from './dto/create.book.dto';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  save(createBookDto: createBookDto, currentStudent: Student) {
    const createBook = this.bookRepository.create(createBookDto);
    createBook.ownerStudent = currentStudent;
    return this.bookRepository.save(createBook);
  }
}
