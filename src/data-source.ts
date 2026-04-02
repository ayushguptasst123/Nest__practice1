// import { DataSource } from 'typeorm';
// import { Student } from './students/entities/student.entity';
// import { Book } from './books/entities/book.entity';

// export const AppDataSource = new DataSource({
//   type: 'mysql', //database driver
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'sst@123',
//   database: 'user',
//   entities: [Student, Book],
//   synchronize: false,
//   migrations: [__dirname + '/migrations/*.ts'],
//   logging: ['error'],
// });

import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './students/entities/student.entity';
import { Book } from './books/entities/book.entity';

// If we don't use .config() then dotenv will not read it
dotenv.config();

// DOUBT ON !
console.log(process.env.DB_PORTS!);
console.log(process.env.DB_PORTS);

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
