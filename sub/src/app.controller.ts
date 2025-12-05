import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('main_queue')
  processMessage(message: any) {
    return {
      type: 'success',
    };
  }

  @EventPattern('customer.created')
  processCustomerCreated(message: any) {
    this.appService.createUserEvent(message);
    return {
      type: 'success',
    };
  }

  @EventPattern('product_custom.created')
  createProductCustom(message: any) {
    this.appService.createProductCustom(message);
    return {
      type: 'success',
    };
  }

  @EventPattern('customer.deleted')
  deleteUser(message: any) {
    this.appService.deleteUser(message);
    return {
      type: 'success',
    };
  }
}
