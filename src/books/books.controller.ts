import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { createBookDto } from './dto/create.book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Post('/add-book')
  addBook(@Body() createBookDto: createBookDto) {
    return this.bookService.save(createBookDto);
  }
}
