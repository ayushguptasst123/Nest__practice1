import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student/entities/student.entity';
import { DataSource } from 'typeorm';
import { BooksModule } from './books/books.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'mysql', //database driver
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sst@123',
      database: 'user',
      entities: [StudentEntity],
      synchronize: true,
      retryAttempts: 5,
      logging: ['query', 'error'],
    }),
    BooksModule,
  ],
})
/** synchronize: true
 * Tables are created automatically
 * Columns updated automatically
 *
 * But we didn't set true on production level
 */
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
