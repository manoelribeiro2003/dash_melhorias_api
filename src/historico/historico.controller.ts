import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HistoricoService } from './historico.service';

@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  @Get('projeto/:id')
  findAllHistoricoProjetos(@Param('id', ParseIntPipe) id: number) {
    return this.historicoService.findAllHistoricoProjetos(id);
  }
  @Get('tarefa/:id')
  findAllHistoricoTarefas(@Param('id', ParseIntPipe) id: number) {
    return this.historicoService.findAllHistoricoTarefas(id);
  }
}
