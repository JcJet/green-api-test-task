import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RMQ_URL')],
      queue: 'toM2',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices().then(() => {
    console.log('M2 MS started.');
    console.log('Application variables:');
    // in case there will be more env variables...
    for (const var_name of ['RMQ_URL']) {
      console.log(`${var_name}: ${configService.get(var_name)}`);
    }
  });
}
bootstrap();
