import { Module } from '@nestjs/common';
import { LibraryCardController } from './library-cards.controller';
import { LibraryCardService } from './library-cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryCards } from './entity/library-card.entity';
import { StudentModule } from 'src/students/students.module';

@Module({
  controllers: [LibraryCardController],
  providers: [LibraryCardService],
  imports: [TypeOrmModule.forFeature([LibraryCards]), StudentModule],
})
export class LibraryCardModule {}
