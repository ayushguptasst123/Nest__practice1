import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfessorEntity } from './entities/professor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorEntity)
    private readonly carRepository: Repository<ProfessorEntity>,
  ) {}

  async showAll() {
    return await this.carRepository.find();
  }
}
