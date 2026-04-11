import { Module } from '@nestjs/common';
import { FeedsController } from './feeds.controller';
import { FeedsService } from './feeds.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './entity/feed.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  controllers: [FeedsController],
  providers: [FeedsService],
  imports: [TypeOrmModule.forFeature([Feed]), ProfilesModule],
})
export class FeedsModule {}
