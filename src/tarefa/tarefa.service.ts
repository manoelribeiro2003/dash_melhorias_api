import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Projeto } from 'src/projeto/entities/projeto.entity';

@Injectable()
export class TarefaService {

  constructor(
    @InjectRepository(Tarefa) private readonly tarefaRepository: Repository<Tarefa>,
    @InjectRepository(Projeto) private readonly projetoRepository: Repository<Projeto>
  ) { }

  throwConflictException(message?: string): never {
    throw new ConflictException(message ? message : 'Tarefa já cadastrada')
  }

  throwNotFoundException(message?: string): never {
    throw new NotFoundException(message ? message : 'Tarefa não encontrada')
  }

  async createMany(projetoId: number, createTarefaDto: CreateTarefaDto[]): Promise<Tarefa[]> {
    const projeto = await this.projetoRepository.findOneBy({id: projetoId})

    if(!projeto){this.throwNotFoundException('Projeto nao encontrado')}

    const tarefas = createTarefaDto.map(tarefa => (
      this.tarefaRepository.create({
        nome:tarefa.nome,
        projeto: projeto
      })
    ))

    return await this.tarefaRepository.save(tarefas)

  }

  async findAll(): Promise<Tarefa[]> {
    return await this.tarefaRepository.find()
  }

  async findOne(id: number): Promise<Tarefa> {
    const tarefa = await this.tarefaRepository.findOneBy({ id })

    if (!tarefa) { this.throwNotFoundException() }

    return tarefa;
  }

  async update(id: number, updateTarefaDto: UpdateTarefaDto): Promise<Tarefa> {
    const tarefa = await this.tarefaRepository.preload({
      id: id,
      ...updateTarefaDto
    })

    if (!tarefa) { this.throwNotFoundException() }

    return await this.tarefaRepository.save(tarefa)
  }

  async remove(id: number): Promise<Tarefa> {
    const tarefa = await this.findOne(id)

    await this.tarefaRepository.remove(tarefa)

    return tarefa

  }
}
