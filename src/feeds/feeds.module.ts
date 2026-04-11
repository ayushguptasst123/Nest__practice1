import { Module } from '@nestjs/common';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entity/feed.entity';

@Module({
  controllers: [FeedsController],
  providers: [FeedsService],
  imports: [TypeOrmModule.forFeature([Feed])],
})
export class FeedsModule {}
