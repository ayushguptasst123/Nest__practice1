import { Body, Controller, Param, Post } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { CreateFeedDto } from './dtos/create.feed.dto';
import { Public } from 'src/decorator/public.decorator';
import { CreateFeedOnlyDto } from './dtos/create.feed-only.dto';

@Controller('feeds')
export class FeedsController {
  constructor(private feedService: FeedsService) {}

  @Post()
  @Public()
  createFeed(@Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(createFeedDto);
  }

  @Post('/:id')
  @Public()
  createWithProfile(
    @Param('id') id: string,
    @Body() createFeedOnlyDto: CreateFeedOnlyDto,
  ) {
    return this.feedService.createWithProfile(parseInt(id), createFeedOnlyDto);
  }
}
