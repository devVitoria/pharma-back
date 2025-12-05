import { Injectable, OnModuleInit, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class PublisherService implements OnModuleInit {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://ttjhwdmr:spY9CV13y-42P7kpvCBw-IsydpdQrIoY@kebnekaise.lmq.cloudamqp.com/ttjhwdmr',
        ],
        queue: 'main_queue',
        queueOptions: { durable: true }, // queueDurable nao preciso estar com meu sistema de pub rodando, precisa do sistema de mensageria, se fosse durable false, teria que estar com os dois ligados
      },
    });
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('Client connect');
  }

  publish(type: string, payload: any) {
    const event = {
      eventId: Date.now(),
      type,
      timestamp: new Date().toISOString(),
      payload,
    };
    console.log("Teste")
return this.client.emit('customer.created', event);
  }
}
