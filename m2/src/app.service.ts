import { Injectable } from '@nestjs/common';
import { TestRequestDto } from './dto/testRequest.dto';
import { logCall } from './decorators/logging-decorator';

@Injectable()
export class AppService {
  @logCall()
  processTask(dto: TestRequestDto): string {
    const message = dto.message || 'request';
    return `${message} was processed`;
  }
}
