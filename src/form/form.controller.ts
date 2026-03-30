import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/create.user.dto';
import { FormService } from './form.service';
import { CarService } from 'src/car/car.service';

/**
 * We need forwardRef() here if both the class directly calling each other
 */
@Controller('form')
export class FormController {
  constructor(
    private formService: FormService,
    // @Inject(forwardRef(() => CarService))
    private carService: CarService,
  ) {}

  @Post('/create')
  createNewUser(@Body() user: UserDto) {
    console.log(user);
    return user;
  }

  @Get()
  showAllUser() {
    return this.formService.findAll();
  }

  @Get('/allCars')
  showAllCars() {
    return this.carService.showAll();
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
}
