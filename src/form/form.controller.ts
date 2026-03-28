import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/create.user.dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private formService: FormService) {}

  @Post('/create')
  createNewUser(@Body() user: UserDto) {
    console.log(user);
    return user;
  }

  @Get()
  showAllUsers() {
    return this.formService.findAll();
  }
}
