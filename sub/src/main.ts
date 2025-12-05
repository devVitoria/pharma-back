import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://ttjhwdmr:spY9CV13y-42P7kpvCBw-IsydpdQrIoY@kebnekaise.lmq.cloudamqp.com/ttjhwdmr',
        ],
        queue: 'main_queue',
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  console.log('Microservice SUB rodando. Ouvindo mensagens no RMQ');
}

bootstrap();
