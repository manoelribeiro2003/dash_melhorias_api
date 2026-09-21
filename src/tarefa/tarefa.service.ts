import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Projeto } from 'src/projeto/entities/projeto.entity';
import { StatusTasks } from '../enums/status.enum';
import { CreateHistoricoTarefaDto } from 'src/historico/dto/create-historico-tarefa.dto';
import { HistoricoService } from 'src/historico/historico.service';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepository: Repository<Tarefa>,
    @InjectRepository(Projeto)
    private readonly projetoRepository: Repository<Projeto>,

    @Inject(forwardRef(() => HistoricoService))
    private readonly historicoService: HistoricoService,
  ) {}

  throwConflictException(message?: string): never {
    throw new ConflictException(message ? message : 'Tarefa já cadastrada');
  }

  throwNotFoundException(message?: string): never {
    throw new NotFoundException(message ? message : 'Tarefa não encontrada');
  }

  async createMany(
    projetoId: number,
    createTarefaDto: CreateTarefaDto[],
    criadoPorId: number,
  ): Promise<Tarefa[]> {
    const statusValidos = Object.values(StatusTasks);
    const statusInvalido = createTarefaDto.find(
      (tarefa) =>
        tarefa.status !== undefined &&
        !statusValidos.includes(tarefa.status as StatusTasks),
    );
    if (statusInvalido) {
      throw new BadRequestException(
        `Status inválido: ${statusInvalido.status}`,
      );
    }

    const projeto = await this.projetoRepository.findOneBy({ id: projetoId });

    if (!projeto) {
      this.throwNotFoundException('Projeto nao encontrado');
    }

    const tarefas = createTarefaDto.map((tarefa) =>
      this.tarefaRepository.create({
        ...tarefa,
        nome: tarefa.nome,
        ordem: tarefa.ordem,
        projeto: projeto,
        dataInicio: tarefa.dataInicio,
        dataTermino: tarefa.dataTermino,
      }),
    );

    const tarefasCriadas = await this.tarefaRepository.save(tarefas);

    const historicoTarefas: CreateHistoricoTarefaDto[] = tarefasCriadas.map(
      (tarefa, index) => {
        return {
          tarefaId: tarefa.id,
          projetoId,
          nome: tarefa.nome,
          ordem: tarefa.ordem,
          status: tarefa.status,
          dataInicio: tarefa.dataInicio,
          dataTermino: tarefa.dataTermino,
          criadoPorId: criadoPorId,
          atualizadoPorId: criadoPorId,
          excluido: false,
        };
      },
    );

    await this.historicoService.createHistoricoTarefas(historicoTarefas);

    return tarefasCriadas;
  }

  async findAll(): Promise<Tarefa[]> {
    return await this.tarefaRepository.find();
  }

  async findOne(id: number): Promise<Tarefa> {
    const tarefa = await this.tarefaRepository.findOneBy({ id });

    if (!tarefa) {
      this.throwNotFoundException();
    }

    return tarefa;
  }

  async updateMany(
    projetoId: number,
    tarefasDto: UpdateTarefaDto[],
    criadoPorId: number,
    atualizadoPorId: number,
  ): Promise<Tarefa[]> {
    const statusValidos = Object.values(StatusTasks);

    const statusInvalido = tarefasDto.find(
      (tarefa) =>
        tarefa.status !== undefined &&
        !statusValidos.includes(tarefa.status as StatusTasks),
    );

    if (statusInvalido) {
      throw new BadRequestException(
        `Status inválido: ${statusInvalido.status}`,
      );
    }

    const tarefasBanco = await this.tarefaRepository.find({
      where: {
        projeto: {
          id: projetoId,
        },
      },
    });

    const idsPayload = tarefasDto
      .filter((tarefa) => tarefa.id !== undefined)
      .map((tarefa) => tarefa.id!);

    const tarefasParaRemover = tarefasBanco.filter(
      (tarefa) => !idsPayload.includes(tarefa.id),
    );

    if (tarefasParaRemover.length) {
      const historicoExclusoes: CreateHistoricoTarefaDto[] =
        tarefasParaRemover.map((tarefa) => ({
          tarefaId: tarefa.id,
          projetoId,
          nome: tarefa.nome,
          ordem: tarefa.ordem,
          status: tarefa.status,
          dataInicio: tarefa.dataInicio,
          dataTermino: tarefa.dataTermino,
          criadoPorId,
          atualizadoPorId,
          excluido: true,
        }));

      await this.historicoService.createHistoricoTarefas(historicoExclusoes);

      await this.tarefaRepository.remove(tarefasParaRemover);
    }

    const historicoAlteracoes: CreateHistoricoTarefaDto[] = [];

    const tarefas = tarefasDto.map((tarefaDto) => {
      const tarefaBanco = tarefaDto.id
        ? tarefasBanco.find((tarefa) => tarefa.id === tarefaDto.id)
        : undefined;

      // Tarefa nova
      if (!tarefaBanco) {
        return this.tarefaRepository.create({
          ...tarefaDto,
          projeto: {
            id: projetoId,
          },
        });
      }

      // Tarefa existente
      if (this.tarefaFoiAlterada(tarefaBanco, tarefaDto)) {
        historicoAlteracoes.push({
          tarefaId: tarefaBanco.id,
          projetoId,
          nome: tarefaDto.nome!,
          ordem: tarefaDto.ordem!,
          status: tarefaDto.status,
          dataInicio: tarefaDto.dataInicio,
          dataTermino: tarefaDto.dataTermino,
          criadoPorId,
          atualizadoPorId,
          excluido: false,
        });
      }

      return this.tarefaRepository.create({
        ...tarefaBanco,
        ...tarefaDto,
        projeto: {
          id: projetoId,
        },
      });
    });

    const tarefasSalvas = await this.tarefaRepository.save(tarefas);

    const historicoNovasTarefas: CreateHistoricoTarefaDto[] = tarefasSalvas
      .filter((tarefa) => {
        return !tarefasBanco.some(
          (tarefaBanco) => tarefaBanco.id === tarefa.id,
        );
      })
      .map((tarefa) => ({
        tarefaId: tarefa.id,
        projetoId,
        nome: tarefa.nome,
        ordem: tarefa.ordem,
        status: tarefa.status,
        dataInicio: tarefa.dataInicio,
        dataTermino: tarefa.dataTermino,
        criadoPorId,
        atualizadoPorId,
        excluido: false,
      }));

    const historicos = [...historicoAlteracoes, ...historicoNovasTarefas];

    if (historicos.length) {
      await this.historicoService.createHistoricoTarefas(historicos);
    }

    return tarefasSalvas;
  }

  private tarefaFoiAlterada(
    tarefaBanco: Tarefa,
    tarefaDto: UpdateTarefaDto,
  ): boolean {
    return (
      tarefaBanco.nome !== tarefaDto.nome ||
      tarefaBanco.ordem !== tarefaDto.ordem ||
      tarefaBanco.status !== tarefaDto.status ||
      tarefaBanco.concluido !== tarefaDto.concluido ||
      this.normalizarData(tarefaBanco.dataInicio) !==
        this.normalizarData(tarefaDto.dataInicio) ||
      this.normalizarData(tarefaBanco.dataTermino) !==
        this.normalizarData(tarefaDto.dataTermino)
    );
  }

  private normalizarData(
    data: Date | string | null | undefined,
  ): string | null {
    if (!data) {
      return null;
    }

    if (typeof data === 'string') {
      return data.split('T')[0];
    }

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }
}
