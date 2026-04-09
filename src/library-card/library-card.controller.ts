import { Body, Controller, Post } from '@nestjs/common';
import { LibraryCardService } from './library-card.service';
import { CreateLibraryCardDto } from './dtos/create-library-card.dto';
import { CurrentStudent } from 'src/auth/decorators/current-student.decorator';
import { Student } from 'src/students/entities/student.entity';

@Controller('library-card')
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
}
