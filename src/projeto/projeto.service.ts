import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { TarefaService } from 'src/tarefa/tarefa.service';
import { Projeto } from './entities/projeto.entity';

@Injectable()
export class ProjetoService {

  constructor(
    @InjectRepository(Projeto) private readonly projetoRepository: Repository<Projeto>,
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
    private readonly tarefaService: TarefaService
  ) { }

  throwConflictException(message?: string): never {
    throw new ConflictException(message ? message : 'Projeto já cadastrado')
  }

  throwNotFoundException(message?: string): never {
    throw new NotFoundException(message ? message : 'Projeto não encontrado')
  }

  async create(createProjetoDto: CreateProjetoDto): Promise<Projeto> {
    const {
      criadoPorId,
      tarefas,
      ...dadosProjeto
    } = createProjetoDto;

    const usuario = await this.usuarioRepository.findOneBy({
      id: criadoPorId
    })

    if (!usuario) { this.throwNotFoundException('Usuário não encontrado') }


    const projetoCriado = this.projetoRepository.create({
      criadoPor: {
        id: criadoPorId
      },
      tarefas: tarefas,
      ...dadosProjeto
    })

    const projetoSalvo = await this.projetoRepository.save(projetoCriado)

    if (createProjetoDto.tarefas?.length) {
      await this.tarefaService.createMany(
        projetoSalvo.id, createProjetoDto.tarefas
      )
    }

    const projetoRetornado = await this.projetoRepository.findOneOrFail({
      relations: {
        criadoPor: true,
        tarefas: true
      },
      where: {
        id: projetoSalvo.id
      }
    })

    return projetoRetornado;

  }

  async findAll(): Promise<Projeto[]> {
    return this.projetoRepository.find({
      relations: {
        criadoPor: true,
        tarefas: true
      },
      select: {
        id: true,
        nome: true,
        categoria: true,
        status: true,
        dataInicio: true,
        dataTermino: true,
        orcamento: true,
        prioridade: true,
        criadoPor: true,
        tarefas: true,
        createdAt: true,
        updatedAt: true
      },
      order: {
        id: 'ASC',
        tarefas: {
          ordem: 'ASC'
        }
      }
    });
  }

  async findOne(id: number): Promise<Projeto> {
    const projeto = await this.projetoRepository.findOne({
      relations: { criadoPor: true, tarefas: true },
      where: { id: id },
    })

    if (!projeto) { this.throwNotFoundException() }

    return projeto
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {
    const {
      tarefas = updateProjetoDto.tarefas,
      criadoPorId,
      ...dadosProjeto
    } = updateProjetoDto;

    const usuario = await this.usuarioRepository.findOne({
      where: {
        id: criadoPorId
      }
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updatedProjeto = await this.projetoRepository.preload({
      id,
      ...dadosProjeto,
      criadoPor: usuario
    });

    if (!updatedProjeto) {
      this.throwNotFoundException();
    }

    if (tarefas?.length) {
      await this.tarefaService.updateMany(id, tarefas);
    }

    const projetoSalvo = await this.projetoRepository.save(updatedProjeto);

    return await this.projetoRepository.findOne({
      where: {
        id
      },
      relations: {
        criadoPor: true,
        tarefas: true
      },
      select: {
        id: true,
        nome: true,
        categoria: true,
        status: true,
        dataInicio: true,
        dataTermino: true,
        orcamento: true,
        prioridade: true,
        criadoPor: true,
        tarefas: true,
        createdAt: true,
        updatedAt: true
      },
      order: {
        tarefas: {
          ordem: 'ASC'
        }
      }
    });
  }

  async remove(id: number): Promise<Projeto> {

    let projeto = await this.projetoRepository.findOneBy({ id });

    if (!projeto) {
      this.throwNotFoundException();
    }

    const projetoExcluido = await this.projetoRepository.remove(projeto)

    projeto = {
      ...projetoExcluido,
      id: id,
    };
    

    return projeto;
  }
}
