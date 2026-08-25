import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>
  ) { }

  throwConflictException(message?: string): never {
    throw new ConflictException(message ? message : 'Usuário já cadastrado')
  }

  throwNotFoundException(message?: string): never {
    throw new NotFoundException(message ? message : 'Usuário não encontrado')
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({
      email: createUsuarioDto.email
    })

    if(usuario){this.throwConflictException()}

    const novoUsuario = this.usuarioRepository.create({
      nome: createUsuarioDto.nome,
      email: createUsuarioDto.email
    })

    return await this.usuarioRepository.save(novoUsuario)
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find()
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({
      id: id
    })

    if (!usuario) { this.throwNotFoundException() }

    return usuario
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const projeto = await this.usuarioRepository.preload({
      id: id,
      ...updateUsuarioDto
    })

    if(!projeto){this.throwNotFoundException()}

    return await this.usuarioRepository.save(projeto)
  }

  async remove(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id)

    await this.usuarioRepository.remove(usuario)

    return usuario
  }
}
