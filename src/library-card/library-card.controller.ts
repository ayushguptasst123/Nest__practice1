import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { LibraryCardService } from './library-card.service';
import { CreateLibraryCardDto } from './dtos/create-library-card.dto';
import { CurrentStudent } from 'src/auth/decorators/current-student.decorator';
import { Student } from 'src/students/entities/student.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { LibraryCardDto } from './dtos/library-card.dto';

@Controller('library-card')
@Serialize(LibraryCardDto)
export class LibraryCardController {
  constructor(private libraryCardService: LibraryCardService) {}

  @Post('/create')
  createNewLibraryCard(
    @Body() createLibraryCardDto: CreateLibraryCardDto,
    @CurrentStudent() currentStudent: Student,
  ) {
    return this.libraryCardService.createNewLibraryCard(
      createLibraryCardDto,
      currentStudent,
    );
  }

  @Get()
  findHere(@CurrentStudent() currentStudent: Student) {
    return this.libraryCardService.findLibraryCard(currentStudent);
  }

  @Delete('/delete')
  deleteCard(@CurrentStudent() currentStudent: Student) {
    return this.libraryCardService.removeCard(currentStudent);
  }
}
