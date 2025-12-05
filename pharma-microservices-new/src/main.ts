import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- MICRO SERVICE PARA CONSUMO ---
  const microservice =
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://ttjhwdmr:spY9CV13y-42P7kpvCBw-IsydpdQrIoY@kebnekaise.lmq.cloudamqp.com/ttjhwdmr',
        ],
        queue: 'main_queue',
        queueOptions: { durable: true },
      },
    });

  // 🔥 Sem isso o ConsumerService NÃO ativa!
  await app.startAllMicroservices();

  // --- SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('API Pharma Manipulados')
    .setDescription('API para gestão de pedidos de produtos manipulados em farmácia com NestJS e Prisma')
    .setVersion('2.0')
    .addTag('customer, order, product')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3001);

  console.log('Rodando a aplicação em http://localhost:3001');
  console.log('Confira a documentação -> http://localhost:3001/swagger');
}

bootstrap();
