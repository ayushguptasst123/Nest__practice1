import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './students/entities/student.entity';
import { Book } from './books/entities/book.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, //configService.get<boolean>('database.synchronize', false),
  entities: [Student, Book],
  migrations: [__dirname + '/migrations/*.ts'],
});
