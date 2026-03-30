import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { FormModule } from 'src/form/form.module';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [TypeOrmModule.forFeature([CarEntity]), FormModule],
  exports: [CarService],
})
export class CarModule {}
