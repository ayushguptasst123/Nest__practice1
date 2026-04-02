import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BooksModule } from './books/books.module';
import { AppDataSource } from './data-source';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    StudentModule,
    BooksModule,
    TypeOrmModule.forRoot(AppDataSource.options),
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
