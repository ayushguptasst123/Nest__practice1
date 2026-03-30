import { forwardRef, Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CarModule } from 'src/car/car.module';

@Module({
  providers: [FormService],
  controllers: [FormController],
  imports: [
    forwardRef(() => CarModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [FormService],
})
export class FormModule {
  constructor() {
    console.log('This is form Module');
  }
}
