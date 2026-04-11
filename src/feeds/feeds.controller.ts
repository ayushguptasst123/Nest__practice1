import { Body, Controller, Post } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { CreateFeedDto } from './dtos/create.feed.dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('feeds')
export class FeedsController {
  constructor(private feedService: FeedsService) {}

  @Post()
  @Public()
  createFeed(@Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(createFeedDto);
  }
}
