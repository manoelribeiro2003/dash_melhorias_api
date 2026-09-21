import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHistoricoTarefaDto } from './dto/create-historico-tarefa.dto';
import { CreateHistoricoProjetoDto } from './dto/create-historico-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoricoProjeto } from './entities/historico-projeto.entity';
import { HistoricoTarefa } from './entities/historico-tarefa.entity';
import { ProjetoService } from 'src/projeto/projeto.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { TarefaService } from 'src/tarefa/tarefa.service';

@Injectable()
export class HistoricoService {
  constructor(
    @InjectRepository(HistoricoTarefa)
    private readonly tarefaHistoricoRepository: Repository<HistoricoTarefa>,

    @InjectRepository(HistoricoProjeto)
    private readonly projetoHistoricoRepository: Repository<HistoricoProjeto>,

    @Inject(forwardRef(() => ProjetoService))
    private readonly projetoService: ProjetoService,
    @Inject(forwardRef(() => ProjetoService))
    private readonly tarefaService: TarefaService,

    private readonly usuarioService: UsuarioService,
  ) {}
  @InjectRepository(HistoricoTarefa)
  throwNotFoundException(tipo: 'projeto' | 'tarefa' | 'usuario'): never {
    const mensagens = {
      projeto: 'Projeto não encontrado',
      tarefa: 'Tarefa não encontrada',
      usuario: 'Usuário não encontrado',
    };

    throw new NotFoundException(tipo ? mensagens[tipo] : 'Não encontrado');
  }

  async createHistoricoProjeto(
    createHistoricoProjetoDto: CreateHistoricoProjetoDto,
  ): Promise<HistoricoProjeto> {
    const {
      projetoId,
      criadoPorId,
      atualizadoPorId,
      gestorId,
      ...dadosHistoricoProjeto
    } = createHistoricoProjetoDto;

    await this.projetoService.findOne(projetoId);

    const [criadoPor, atualizadoPor, gestor] = await Promise.all([
      this.usuarioService.findOne(criadoPorId),
      this.usuarioService.findOne(atualizadoPorId),
      this.usuarioService.findOne(gestorId),
    ]);

    const snapshotProjeto = this.projetoHistoricoRepository.create({
      ...dadosHistoricoProjeto,
      projetoId,
      criadoPorId: criadoPor.id,
      atualizadoPorId: atualizadoPor.id,
      gestorId: gestor.id,
      ganhoPar: this.normalizarDecimal(dadosHistoricoProjeto.ganhoPar),
      orcamento: this.normalizarDecimal(dadosHistoricoProjeto.orcamento),
    });

    return await this.projetoHistoricoRepository.save(snapshotProjeto);
  }

  async createHistoricoTarefas(
    createHistoricoTarefaDtos: CreateHistoricoTarefaDto[],
  ): Promise<HistoricoTarefa[]> {
    if (!createHistoricoTarefaDtos.length) {
      return [];
    }

    const projetoIds = [
      ...new Set(createHistoricoTarefaDtos.map(({ projetoId }) => projetoId)),
    ];

    const usuarioIds = [
      ...new Set(
        createHistoricoTarefaDtos.flatMap(
          ({ criadoPorId, atualizadoPorId }) => [criadoPorId, atualizadoPorId],
        ),
      ),
    ];

    await Promise.all(
      projetoIds.map((projetoId) => this.projetoService.findOne(projetoId)),
    );

    await Promise.all(
      usuarioIds.map((usuarioId) => this.usuarioService.findOne(usuarioId)),
    );

    const snapshotsTarefas = this.tarefaHistoricoRepository.create(
      createHistoricoTarefaDtos.map(
        ({
          projetoId,
          tarefaId,
          criadoPorId,
          atualizadoPorId,
          ...dadosHistoricoTarefa
        }) => ({
          projetoId,
          tarefaId,
          criadoPorId,
          atualizadoPorId,
          ...dadosHistoricoTarefa,
        }),
      ),
    );

    return this.tarefaHistoricoRepository.save(snapshotsTarefas);
  }

  async findAllHistoricoProjetos(id: number): Promise<HistoricoProjeto[]> {
    await this.projetoService.findOne(id);

    return this.projetoHistoricoRepository.find({
      where: {
        projetoId: id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findAllHistoricoTarefas(id: number): Promise<HistoricoTarefa[]> {
    return this.tarefaHistoricoRepository.find({
      where: {
        tarefaId: id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  private normalizarDecimal(valor: string | null | undefined): string | null {
    if (valor === null || valor === undefined || valor === '') {
      return null;
    }

    return valor.replace(',', '.');
  }
}
