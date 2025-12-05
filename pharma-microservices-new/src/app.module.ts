import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagingModule } from './messaging/messaging.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [PrismaModule, CustomersModule, MessagingModule, OrdersModule, ProductsModule],
  controllers: [AppController

  ],
  providers: [AppService],
})
export class AppModule {}