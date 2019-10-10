import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Data } from './entities/data.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  public async getTest(): Promise<Data[]> {
    return this.appService.getTest();
  }
}
