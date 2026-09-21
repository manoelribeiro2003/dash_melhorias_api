import { forwardRef, Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { TarefaModule } from 'src/tarefa/tarefa.module';
import { HistoricoService } from 'src/historico/historico.service';
import { HistoricoModule } from 'src/historico/historico.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projeto, Usuario]),
    TarefaModule,
    forwardRef(() => HistoricoModule),
  ],
  controllers: [ProjetoController],
  providers: [ProjetoService],
  exports: [ProjetoService],
})
export class ProjetoModule {}
