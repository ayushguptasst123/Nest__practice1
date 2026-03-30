import { Controller, Get } from '@nestjs/common';
import { CarService } from './car.service';
import { FormService } from 'src/form/form.service';

@Controller('car')
export class CarController {
  constructor(
    private carService: CarService,
    // @Inject(forwardRef(() => FormService))
    private formService: FormService,
  ) {}

  @Get('/allCar')
  showAllCar() {
    return this.carService.showAll();
  }

  @Get('/allUser')
  showAllUsers() {
    // return 'SOmething';
    return this.formService.findAll();
  }
}
