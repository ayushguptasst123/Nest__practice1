import { Controller, Get, Param, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JavaGuards } from './guards/java.guard';
import { RestrictGuard } from './guards/restrict.guard';

interface BookSession extends Request {
  bookName: string;
}

/**
 * If we create new session then the previous session will already be deleted
 */
@Controller('books')
export class BooksController {
  @Get('/add-book/:name')
  addBook(@Param('name') name: string, @Session() bookSession: BookSession) {
    bookSession.bookName = name;
    return {
      sessionCreated: true,
      bookName: name,
    };
  }

  @Get('/show-book')
  showBook(@Session() bookSession: BookSession) {
    return {
      BookName: bookSession.bookName,
    };
  }

  @Get('/secret')
  @UseGuards(JavaGuards)
  secretThing(@Session() bookSession: BookSession) {
    return {
      bookName: bookSession.bookName,
      certificate: '1Z0-180',
      description:
        'Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle Corporation).',
    };
  }

  @Get('/normal')
  @UseGuards(RestrictGuard)
  NormalThing(@Session() bookSession: BookSession) {
    return {
      bookName: bookSession.bookName,
      workOn: 'computer',
    };
  }
}
