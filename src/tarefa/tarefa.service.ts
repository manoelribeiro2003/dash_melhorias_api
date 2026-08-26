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

    const projeto = await this.projetoRepository.findOneBy({ id: projetoId })

    if (!projeto) { this.throwNotFoundException('Projeto nao encontrado') }

    const tarefas = createTarefaDto.map(tarefa => (
      this.tarefaRepository.create({
        ...tarefa,
        nome: tarefa.nome,
        ordem: tarefa.ordem,
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

  async updateMany(projetoId: number, tarefasDto: UpdateTarefaDto[]): Promise<Tarefa[]> {

    const tarefasBanco = await this.tarefaRepository.find({
      where: {
        projeto: {
          id: projetoId,
        },
      },
    });

    const idsPayload = tarefasDto
      .filter(t => t.id !== undefined)
      .map(t => t.id!);

    const tarefasParaRemover = tarefasBanco.filter(
      t => !idsPayload.includes(t.id),
    );

    if (tarefasParaRemover.length) {
      await this.tarefaRepository.remove(tarefasParaRemover);
    }

    const tarefas = tarefasDto.map(tarefa =>
      this.tarefaRepository.create({
        ...tarefa,
        projeto: {
          id: projetoId,
        },
      }),
    );

    return await this.tarefaRepository.save(tarefas);
  }

  async remove(id: number): Promise<Tarefa> {
    const tarefa = await this.findOne(id)

    await this.tarefaRepository.remove(tarefa)

    return tarefa

  }
}
