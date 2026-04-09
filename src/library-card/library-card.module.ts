import { Module } from '@nestjs/common';
import { LibraryCardController } from './library-card.controller';
import { LibraryCardService } from './library-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryCard } from './entity/library-card.entity';

@Module({
  controllers: [LibraryCardController],
  providers: [LibraryCardService],
  imports: [TypeOrmModule.forFeature([LibraryCard])],
})
export class LibraryCardModule {}
