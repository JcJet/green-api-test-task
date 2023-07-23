import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'toM2',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RMQ_URL],
            queue: 'toM2',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
