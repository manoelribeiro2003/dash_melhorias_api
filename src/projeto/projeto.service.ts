import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { TarefaService } from 'src/tarefa/tarefa.service';
import { Projeto } from './entities/projeto.entity';
import { HistoricoService } from 'src/historico/historico.service';
import { CreateHistoricoProjetoDto } from 'src/historico/dto/create-historico-projeto.dto';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private readonly projetoRepository: Repository<Projeto>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @Inject(forwardRef(() => HistoricoService))
    private readonly historicoService: HistoricoService,

    private readonly tarefaService: TarefaService,
  ) {}

  throwConflictException(message?: string): never {
    throw new ConflictException(message ? message : 'Projeto já cadastrado');
  }

  throwNotFoundException(message?: string): never {
    throw new NotFoundException(message ? message : 'Projeto não encontrado');
  }

  async create(createProjetoDto: CreateProjetoDto): Promise<Projeto> {
    const { criadoPorId, gestorId, tarefas, ...dadosProjeto } =
      createProjetoDto;

    const usuario = await this.usuarioRepository.findOneBy({
      id: criadoPorId,
    });
    if (!usuario) {
      this.throwNotFoundException('Usuário não encontrado');
    }

    const gestor = await this.usuarioRepository.findOneBy({
      id: gestorId,
    });
    if (!gestor) {
      this.throwNotFoundException('Gestor não encontrado');
    }

    const projetoCriado = this.projetoRepository.create({
      criadoPor: {
        id: criadoPorId,
      },
      gestor: {
        id: gestorId,
      },
      tarefas: tarefas,
      ...dadosProjeto,
    });

    const projetoSalvo = await this.projetoRepository.save(projetoCriado);

    if (createProjetoDto.tarefas?.length) {
      await this.tarefaService.createMany(
        projetoSalvo.id,
        createProjetoDto.tarefas,
        criadoPorId,
      );
    }

    const projetoRetornado = await this.projetoRepository.findOneOrFail({
      relations: {
        criadoPor: true,
        gestor: true,
        tarefas: true,
      },
      where: {
        id: projetoSalvo.id,
      },
    });

    const createHistoricoProjetoDto: CreateHistoricoProjetoDto = {
      gestorId: gestorId,
      criadoPorId: criadoPorId,
      atualizadoPorId: criadoPorId,
      nome: dadosProjeto.nome,
      projetoId: projetoRetornado.id,
      categoria: dadosProjeto.categoria,
      dataInicio: dadosProjeto.dataInicio,
      dataTermino: dadosProjeto.dataTermino,
      excluido: false,
      ganhoPar: dadosProjeto.ganhoPar,
      orcamento: dadosProjeto.orcamento,
      prioridade: dadosProjeto.prioridade,
      status: dadosProjeto.status,
    };

    this.historicoService.createHistoricoProjeto(createHistoricoProjetoDto);

    return projetoRetornado;
  }

  async findAll(): Promise<Projeto[]> {
    return this.projetoRepository.find({
      relations: {
        criadoPor: true,
        gestor: true,
        tarefas: true,
      },
      select: {
        id: true,
        nome: true,
        categoria: true,
        status: true,
        dataInicio: true,
        dataTermino: true,
        orcamento: true,
        ganhoPar: true,
        prioridade: true,
        criadoPor: true,
        gestor: true,
        tarefas: true,
        createdAt: true,
        updatedAt: true,
      },
      order: {
        id: 'ASC',
        tarefas: {
          ordem: 'ASC',
        },
      },
    });
  }

  async findOne(id: number): Promise<Projeto> {
    const projeto = await this.projetoRepository.findOne({
      relations: { criadoPor: true, tarefas: true },
      where: { id: id },
    });

    if (!projeto) {
      this.throwNotFoundException();
    }

    return projeto;
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {
    const { tarefas, criadoPorId, atualizadoPorId, gestorId, ...dadosProjeto } =
      updateProjetoDto;

    const usuario = await this.usuarioRepository.findOne({
      where: {
        id: criadoPorId,
      },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const gestor = await this.usuarioRepository.findOne({
      where: {
        id: gestorId,
      },
    });

    if (!gestor) {
      throw new NotFoundException('Gestor não encontrado');
    }

    const updatedProjeto = await this.projetoRepository.preload({
      id,
      ...dadosProjeto,
      criadoPor: usuario,
      gestor: gestor,
    });

    if (!updatedProjeto) {
      this.throwNotFoundException();
    }

    if (tarefas?.length) {
      await this.tarefaService.updateMany(
        id,
        tarefas,
        criadoPorId!,
        atualizadoPorId,
      );
    }

    await this.projetoRepository.save(updatedProjeto);

    const createHistoricoProjetoDto: CreateHistoricoProjetoDto = {
      gestorId: gestorId!,
      criadoPorId: criadoPorId!,
      atualizadoPorId: atualizadoPorId!,
      projetoId: updatedProjeto.id,
      nome: dadosProjeto.nome!,
      categoria: dadosProjeto.categoria,
      dataInicio: dadosProjeto.dataInicio,
      dataTermino: dadosProjeto.dataTermino,
      excluido: false,
      ganhoPar: dadosProjeto.ganhoPar,
      orcamento: dadosProjeto.orcamento,
      prioridade: dadosProjeto.prioridade,
      status: dadosProjeto.status,
    };

    this.historicoService.createHistoricoProjeto(createHistoricoProjetoDto);

    return await this.projetoRepository.findOne({
      where: {
        id,
      },
      relations: {
        criadoPor: true,
        gestor: true,
        tarefas: true,
      },
      select: {
        id: true,
        nome: true,
        categoria: true,
        status: true,
        dataInicio: true,
        dataTermino: true,
        orcamento: true,
        ganhoPar: true,
        prioridade: true,
        criadoPor: true,
        gestor: true,
        tarefas: true,
        createdAt: true,
        updatedAt: true,
      },
      order: {
        tarefas: {
          ordem: 'ASC',
        },
      },
    });
  }

  async remove(id: number): Promise<Projeto> {
    const projeto = await this.projetoRepository.findOne({
      where: { id },
      relations: {
        gestor: true,
        criadoPor: true,
      },
    });

    if (!projeto) {
      this.throwNotFoundException('Projeto não encontrado');
    }

    const createHistoricoProjetoDto: CreateHistoricoProjetoDto = {
      gestorId: projeto.gestor.id,
      criadoPorId: projeto.criadoPor.id,
      atualizadoPorId: projeto.criadoPor.id,
      projetoId: projeto.id,
      nome: projeto.nome,
      categoria: projeto.categoria,
      dataInicio: projeto.dataInicio,
      dataTermino: projeto.dataTermino,
      excluido: true,
      ganhoPar: projeto.ganhoPar,
      orcamento: projeto.orcamento,
      prioridade: projeto.prioridade,
      status: projeto.status,
    };

    console.log('DTO HISTÓRICO:', createHistoricoProjetoDto);

    await this.historicoService.createHistoricoProjeto(
      createHistoricoProjetoDto,
    );

    console.log('Histórico criado');

    const projetoExcluido = await this.projetoRepository.remove(projeto);

    console.log('Projeto excluído');

    return projetoExcluido;
  }
}
