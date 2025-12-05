import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class AppService extends ConsoleLogger {
  createUserEvent(event: string, payload?: any) {
    super.log(
      JSON.stringify({
        event,
        payload,
        timestamp: new Date().toISOString(),
      }),
      'Um usuário criou uma conta',
    );
  }
  createProductCustom(event: string, payload?: any) {
    super.warn(
      JSON.stringify({
        event,
        payload,
        timestamp: new Date().toISOString(),
      }),
      'Um produto customizado (não está no estoque) foi criado, certifique-se de verificar a disponibilidade para a encomenda e maracar o status de aceitação do item',
    );
  }

  deleteUser(event: string, error?: any) {
    super.warn(
      JSON.stringify({
        event,
        error,
        timestamp: new Date().toISOString(),
      }),
      'Um usuário deletou sua conta',
    );
  }
}
