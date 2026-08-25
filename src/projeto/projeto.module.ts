import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { TarefaModule } from 'src/tarefa/tarefa.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projeto, Usuario]),
    TarefaModule
  ],
  controllers: [ProjetoController],
  providers: [ProjetoService],
  exports: [ProjetoModule]
})
export class ProjetoModule {}
