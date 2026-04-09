import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subjects } from './entity/subjects.entity';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
  imports: [TypeOrmModule.forFeature([Subjects])],
})
export class SubjectModule {}
