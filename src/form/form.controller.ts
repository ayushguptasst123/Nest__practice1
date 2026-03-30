import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id')
  showSingleUser(@Param('id') id: string) {
    console.log(typeof id);
    return this.formService.findById(id);
  }

  @Post('/insert')
  insertNewUser(@Body() user: UserDto) {
    // this.formService.insetIntoDB(user);
    return user;
  }

  @Get()
  showAllUser() {
    return this.formService.findAll();
  }
}
