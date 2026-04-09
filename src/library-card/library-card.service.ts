import { Injectable } from '@nestjs/common';
import { CreateLibraryCardDto } from './dtos/create-library-card.dto';
import { Student } from 'src/students/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryCard } from './entity/library-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LibraryCardService {
  constructor(
    @InjectRepository(LibraryCard)
    private libraryCardRepository: Repository<LibraryCard>,
  ) {}

  createNewLibraryCard(
    createLibraryCardDto: CreateLibraryCardDto,
    currentStudent: Student,
  ) {
    const card = this.libraryCardRepository.create(createLibraryCardDto);
    card.student = currentStudent;
    return this.libraryCardRepository.save(card);
  }
}
