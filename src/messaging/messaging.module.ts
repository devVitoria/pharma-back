import { Module } from '@nestjs/common';
import { PublisherService } from './publisher/publisher.service';

@Module({
  providers: [PublisherService],
  exports: [PublisherService], 
})
export class MessagingModule {}
