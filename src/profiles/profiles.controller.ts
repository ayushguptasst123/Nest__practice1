import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dtos/create.profile.dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  @Public()
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get('/:id')
  @Public()
  getProfile(@Param('id') id: string) {
    return this.profilesService.findOne(parseInt(id));
  }
}
