import { forwardRef, Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { HistoricoModule } from 'src/historico/historico.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarefa, Projeto]),
    forwardRef(() => HistoricoModule),
  ],
  controllers: [TarefaController],
  providers: [TarefaService],
  exports: [TarefaService],
})
export class TarefaModule {}
