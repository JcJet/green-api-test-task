import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TestRequestDto } from './dto/testRequest.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('testRequest')
  async processTask(@Payload() data: { dto: TestRequestDto }): Promise<string> {
    return await this.appService.processTask(data.dto);
  }
}
