import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Dash de Projetos de Melhorias!';
  }
}
