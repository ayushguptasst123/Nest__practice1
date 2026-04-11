import { Injectable } from '@nestjs/common';
import { Feed } from './entity/feed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedDto } from './dtos/create.feed.dto';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed)
    private subjectRepository: Repository<Feed>,
  ) {}

  create(createFeedDto: CreateFeedDto) {
    const feed = this.subjectRepository.create(createFeedDto);

    return this.subjectRepository.save(feed);
  }
}
