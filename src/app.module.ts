import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './form/entities/user.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FormModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sst@123',
      database: 'user',
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
})
/** synchronize: true
 * Tables are created automatically
 * Columns updated automatically
 * No need to write SQL manually
 *
 * But we didn't set true on production level
 */
export class AppModule {}
