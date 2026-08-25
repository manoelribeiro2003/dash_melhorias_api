import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Controller('projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetoService.create(createProjetoDto);
  }

  @Get()
  findAll() {
    return this.projetoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projetoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProjetoDto: UpdateProjetoDto) {
    return this.projetoService.update(id, updateProjetoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projetoService.remove(id);
  }
}
