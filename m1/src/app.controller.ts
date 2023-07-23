import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TestRequestDto } from './dto/testRequest.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/request')
  someRequest(@Body() testRequestDto: TestRequestDto): Promise<string> {
    return this.appService.someRequest(testRequestDto);
  }
}
