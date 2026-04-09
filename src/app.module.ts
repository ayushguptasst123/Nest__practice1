import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Student } from './students/entities/student.entity';
import { Book } from './books/entities/book.entity';
import { TeacherModule } from './teacher/teacher.module';
import { Teachers } from './teacher/entity/teacher.entity';
import { LibraryCardModule } from './library-cards/library-cards.module';
import { LibraryCards } from './library-cards/entity/library-card.entity';
import { SubjectModule } from './subject/subject.module';
import { Subjects } from './subject/entity/subjects.entity';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    StudentModule,
    BooksModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          synchronize: false,
          entities: [Student, Book, Teachers, LibraryCards, Subjects],
        };
      },
    }),
    TeacherModule,
    LibraryCardModule,
    SubjectModule,
  ],
})
/** synchronize: true
 * Tables are created automatically
 * Columns updated automatically
 *
 * But we didn't set true on production level
 */
export class AppModule {}
