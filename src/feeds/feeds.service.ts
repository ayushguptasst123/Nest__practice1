import { BadRequestException, Injectable } from '@nestjs/common';
import { Feed } from './entity/feed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedDto } from './dtos/create.feed.dto';
import { CreateFeedOnlyDto } from './dtos/create.feed-only.dto';
import { ProfilesService } from 'src/profiles/profiles.service';

@Injectable()
export class FeedsService {
  constructor(
    @InjectRepository(Feed)
    private subjectRepository: Repository<Feed>,
    private profileService: ProfilesService,
  ) {}

  async create(createFeedDto: CreateFeedDto) {
    const feed = this.subjectRepository.create(createFeedDto);

    return await this.subjectRepository.save(feed);
  }

  async createWithProfile(profileId: number, createFeedDto: CreateFeedOnlyDto) {
    const profile = await this.profileService.findOne(profileId);
    if (!profile) throw new BadRequestException('Profile not found');

    const feed = this.subjectRepository.create(createFeedDto);
    feed.profile = profile;

    return this.subjectRepository.save(feed);
  }
}
