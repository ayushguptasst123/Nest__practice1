import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  providers: [FormService],
  controllers: [FormController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class FormModule {}
