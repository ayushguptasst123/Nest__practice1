import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CarModule } from 'src/car/car.module';

@Module({
  providers: [FormService],
  controllers: [FormController],
  imports: [TypeOrmModule.forFeature([UserEntity]), CarModule],
  exports: [FormService],
})
export class FormModule {}
