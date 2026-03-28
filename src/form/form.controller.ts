import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/create.user.dto';

@Controller('form')
export class FormController {
  @Post('/create')
  createNewUser(@Body() user: UserDto) {
    console.log('You did something: ', user);
    console.log(typeof user.phoneNumber);

    return 'You did it';
  }
}
