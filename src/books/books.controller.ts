import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './dto/create.book.dto';
import { CurrentStudent } from 'src/auth/decorators/current-student.decorator';
import { Student } from 'src/students/entities/student.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { BookDto } from './dto/book.dto';

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
}
