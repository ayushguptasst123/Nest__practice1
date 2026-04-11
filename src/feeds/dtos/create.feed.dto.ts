import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateProfileDto } from 'src/profiles/dtos/create.profile.dto';
import { Profile } from 'src/profiles/entity/profile.entity';

export class CreateFeedDto {
  @IsString()
  title: string;

  @IsNumber()
  views: number;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: Profile;
}
