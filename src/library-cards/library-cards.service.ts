import { Injectable } from '@nestjs/common';
import { CreateLibraryCardDto } from './dtos/create-library-card.dto';
import { Student } from 'src/students/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryCards } from './entity/library-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LibraryCardService {
  constructor(
    @InjectRepository(LibraryCards)
    private libraryCardRepository: Repository<LibraryCards>,
  ) {}

  createNewLibraryCard(
    createLibraryCardDto: CreateLibraryCardDto,
    currentStudent: Student,
  ) {
    const card = this.libraryCardRepository.create(createLibraryCardDto);
    card.student = currentStudent;
    return this.libraryCardRepository.save(card);
  }

  findLibraryCard(currentStudent: Student) {
    return this.libraryCardRepository.findOne({
      where: { id: currentStudent.libraryCard.id },
      relations: {
        student: true,
      },
    });
  }

  removeCard(currentStudent: Student) {
    const card = currentStudent.libraryCard;
    console.log(card);
    return this.libraryCardRepository.remove(card);
  }
}
