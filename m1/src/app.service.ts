import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { TestRequestDto } from './dto/testRequest.dto';
import { logCall } from './decorators/logging-decorator';

@Injectable()
export class AppService {
  constructor(
    @Inject('toM2') private M2Proxy: ClientProxy,
    private configService: ConfigService,
  ) {}
  @logCall()
  async someRequest(dto: TestRequestDto): Promise<string> {
    return await lastValueFrom(this.M2Proxy.send('testRequest', { dto }));
  }
}
