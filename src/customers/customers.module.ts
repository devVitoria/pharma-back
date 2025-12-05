import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [MessagingModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
