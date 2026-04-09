import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './dto/create.book.dto';
import { CurrentStudent } from 'src/auth/decorators/current-student.decorator';
import { Student } from 'src/students/entities/student.entity';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post('/add-book')
  addBook(
    @Body() createBookDto: createBookDto,
    @CurrentStudent() currentStudent: Student,
  ) {
    return this.bookService.save(createBookDto, currentStudent);
  }
}
