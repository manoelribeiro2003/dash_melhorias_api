import { Module } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { HistoricoController } from './historico.controller';
import { TarefaModule } from 'src/tarefa/tarefa.module';
import { ProjetoModule } from 'src/projeto/projeto.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { HistoricoProjeto } from './entities/historico-projeto.entity';
import { HistoricoTarefa } from './entities/historico-tarefa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, HistoricoProjeto, HistoricoTarefa]),
    TarefaModule,
    ProjetoModule,
    UsuarioModule
  ],
  controllers: [HistoricoController],
  providers: [HistoricoService],
  exports: [HistoricoService]
})
export class HistoricoModule {}
