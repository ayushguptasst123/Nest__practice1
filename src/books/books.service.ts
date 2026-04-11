import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createBookDto } from './dto/create.book.dto';
import { Student } from 'src/students/entity/student.entity';
import { UpdateBookDto } from './dto/update-book.dto';

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

  async updateMyBook(
    id: string,
    updateBookDto: UpdateBookDto,
    currentStudent: Student,
  ) {
    const fetchedBook = await this.bookRepository.findOne({
      where: { id },
      relations: { ownerStudent: true },
    });
    if (!fetchedBook) throw new NotFoundException('Book not found with id');
    if (fetchedBook.ownerStudent.id !== currentStudent.id)
      throw new ForbiddenException('Only owner can modify details');

    Object.assign(fetchedBook, updateBookDto);
    return this.bookRepository.save(fetchedBook);
  }

  async borrowBook(id: string, currentStudent: Student) {
    const [fetchedBook] = await this.bookRepository.find({
      where: { id },
      relations: { ownerStudent: true, borrowerStudent: true },
    });

    if (!fetchedBook) throw new NotFoundException('book not found');
    if (
      fetchedBook?.borrowerStudent?.id ||
      fetchedBook.ownerStudent.id === currentStudent.id
    )
      throw new BadRequestException("Can't borrow this book");

    fetchedBook.borrowerStudent = currentStudent;
    return this.bookRepository.save(fetchedBook);
  }
}
