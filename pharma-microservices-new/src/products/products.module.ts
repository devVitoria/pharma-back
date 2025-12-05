import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [MessagingModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
