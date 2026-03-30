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

  async showAll() {
    return await this.carRepository.find();
  }
}
