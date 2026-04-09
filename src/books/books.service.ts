import { Injectable } from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
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

  async findAvailableBooks(currentStudent: Student) {
    const allBooks = await this.bookRepository.find({
      where: { borrowerStudent: IsNull() },
      // enable join
      relations: {
        ownerStudent: true,
      },
    });
    console.log('Before Filter: ', allBooks);

    const filterBooks = allBooks.filter(
      (book) => book.ownerStudent.id != currentStudent.id,
    );
    return filterBooks;
  }

  async findMyBorrowingBooks(currentStudent: Student) {
    const allBooks = await this.bookRepository.find({
      where: { borrowerStudent: Not(IsNull()) },
      relations: {
        borrowerStudent: true,
      },
    });

    const myBorrowing = allBooks.filter(
      (book) => book.borrowerStudent.id === currentStudent.id,
    );

    return myBorrowing;
  }
}
