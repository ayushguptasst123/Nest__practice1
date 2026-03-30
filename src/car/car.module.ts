import { forwardRef, Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { FormModule } from 'src/form/form.module';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [
    forwardRef(() => FormModule),
    TypeOrmModule.forFeature([CarEntity]),
  ],
  exports: [CarService],
})
export class CarModule {
  constructor() {
    console.log('This is Car Module');
  }
}
