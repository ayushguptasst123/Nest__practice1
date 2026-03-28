import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/create.user.dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  private readonly formService: FormService;
  constructor() {
    this.formService = new FormService();
  }

  @Post('/create')
  createNewUser(@Body() user: UserDto) {
    console.log('You did something: ', user);
    console.log(typeof user.phoneNumber);

    return 'You did it';
  }

  @Get()
  showAllUsers() {
    console.log(this.formService.findAll());
  }
}
