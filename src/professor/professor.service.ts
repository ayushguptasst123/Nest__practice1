import { Injectable, NotFoundException } from '@nestjs/common';
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
    const data = await this.carRepository.find();
    if (data) throw new NotFoundException('Professor not found');
    return data;
  }
}
