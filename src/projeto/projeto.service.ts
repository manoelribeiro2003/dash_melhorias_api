import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Projeto } from './entities/projeto.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { TarefaService } from 'src/tarefa/tarefa.service';

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

    const usuario = await this.usuarioRepository.findOneBy({ id: createProjetoDto.criadoPorId })

    if (!usuario) { this.throwNotFoundException('Usuário não encontrado') }

    const projeto = this.projetoRepository.create({
      nome: createProjetoDto.nome,
      criadoPor: usuario
    })

    const projetoSalvo = await this.projetoRepository.save(projeto)

    if (createProjetoDto.tarefas?.length) {
      await this.tarefaService.createMany(
        projetoSalvo.id, createProjetoDto.tarefas
      )
    }

    return projetoSalvo;

  }

  async findAll(): Promise<Projeto[]> {
    return await this.projetoRepository.find()
  }

  async findOne(id: number): Promise<Projeto> {
    const projeto = await this.projetoRepository.findOneBy({
      id: id
    })

    if (!projeto) { this.throwNotFoundException() }

    return projeto
  }

  async update(id: number, updateProjetoDto: UpdateProjetoDto) {

    const updatedProjeto = await this.projetoRepository.preload({
      id: id,
      ...updateProjetoDto
    })

    if (!updatedProjeto) { this.throwNotFoundException() }

    return await this.projetoRepository.save(updatedProjeto)
  }

  async remove(id: number): Promise<Projeto> {
    const existingProjeto = await this.findOne(id)

    await this.projetoRepository.remove(existingProjeto)

    return existingProjeto;
  }
}
