import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      message: 'API em funcionamento.',
      timestamp: new Date().toISOString(),
    };
  }
}