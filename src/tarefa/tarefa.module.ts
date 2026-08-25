import { Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa, Projeto])],
  controllers: [TarefaController],
  providers: [TarefaService],
  exports: [TarefaService]
})
export class TarefaModule {}
