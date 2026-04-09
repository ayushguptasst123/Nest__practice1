import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createBookDto } from './dto/create.book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  save(createBookDto: createBookDto) {
    const createBook = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(createBook);
  }
}
