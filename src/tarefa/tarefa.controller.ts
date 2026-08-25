import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

@Controller('tarefas')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post('projeto/:projetoId')
  create(
    @Body() createTarefaDto: CreateTarefaDto[],
    @Param('projetoId', ParseIntPipe) projetoId: number
  ) {
    return this.tarefaService.createMany(projetoId, createTarefaDto);
  }

  @Get()
  findAll() {
    return this.tarefaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarefaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTarefaDto: UpdateTarefaDto
  ) {
    return this.tarefaService.update(id, updateTarefaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tarefaService.remove(id);
  }
}
