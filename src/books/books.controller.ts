import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './dto/create.book.dto';
import { CurrentStudent } from 'src/auth/decorators/current-student.decorator';
import { Student } from 'src/students/entity/student.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { BookDto } from './dto/book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@Serialize(BookDto)
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post('/add-book')
  addBook(
    @Body() createBookDto: createBookDto,
    @CurrentStudent() currentStudent: Student,
  ) {
    return this.bookService.save(createBookDto, currentStudent);
  }

  @Get('/available')
  showAllAvailableBooks(@CurrentStudent() currentStudent: Student) {
    return this.bookService.findAvailableBooks(currentStudent);
  }

  // Get() or Post() ?
  @Get('/borrow/:id')
  borrowBook(
    @Param('id') id: string,
    @CurrentStudent() currentStudent: Student,
  ) {
    return this.bookService.borrowBook(id, currentStudent);
  }

  @Get('/my-borrow')
  showBorrowedBooks(@CurrentStudent() currentStudent: Student) {
    return this.bookService.findMyBorrowingBooks(currentStudent);
  }

  @Patch('/update/:id')
  updateMyBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @CurrentStudent() currentStudent: Student,
  ) {
    return this.bookService.updateMyBook(id, updateBookDto, currentStudent);
  }
}
