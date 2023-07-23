import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT, () => {
    console.log(
      `M1 microservice started on ${process.env.APP_PORT} at ${new Date()}.`,
    );
    console.log('Application variables:');
    console.log('RabbitMQ address:', process.env.RMQ_URL);
  });
}
bootstrap();
