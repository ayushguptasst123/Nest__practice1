import { Module } from '@nestjs/common';
import { LibraryCardController } from './library-card.controller';
import { LibraryCardService } from './library-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryCard } from './entity/library-card.entity';
import { StudentModule } from 'src/students/students.module';

@Module({
  controllers: [LibraryCardController],
  providers: [LibraryCardService],
  imports: [TypeOrmModule.forFeature([LibraryCard]), StudentModule],
})
export class LibraryCardModule {}
