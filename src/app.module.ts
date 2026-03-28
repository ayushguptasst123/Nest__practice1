import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormModule } from './form/form.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [FormModule],
})
export class AppModule {}
