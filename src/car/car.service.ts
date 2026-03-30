import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CarEntity } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  showAll() {
    return this.carRepository.find();
  }
}
