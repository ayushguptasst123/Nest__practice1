import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subjects } from './entity/subjects.entity';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
  imports: [TypeOrmModule.forFeature([Subjects]), TeacherModule],
})
export class SubjectModule {}
