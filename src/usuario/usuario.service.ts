import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  throwConflictException(message?: string): never {
    throw new ConflictException(message ? message : 'Usuário já cadastrado');
  }

  throwNotFoundException(message?: string): never {
    throw new NotFoundException(message ? message : 'Usuário não encontrado');
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    if (createUsuarioDto.gestorId) {
      const gestor = await this.usuarioRepository.findOneBy({
        id: createUsuarioDto.gestorId,
      });

      if (!gestor) {
        this.throwNotFoundException('Id de gestor não encontrado');
      }

      const usuario = await this.usuarioRepository.findOne({
        relations: {
          gestor: true,
        },
        where: {
          email: createUsuarioDto.email,
        },
      });

      if (usuario) {
        this.throwConflictException();
      }

      const novoUsuario = this.usuarioRepository.create({
        nome: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        gestor: gestor,
      });

      return await this.usuarioRepository.save(novoUsuario);
    } else {
      const usuario = await this.usuarioRepository.findOne({
        relations: {
          gestor: true,
        },
        where: {
          email: createUsuarioDto.email,
        },
      });

      if (usuario) {
        this.throwConflictException();
      }

      const novoUsuario: Usuario = this.usuarioRepository.create({
        nome: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        gestor: null
      });

      return await this.usuarioRepository.save(novoUsuario);
    }
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.find({
      relations: {
        gestor: true,
      },
    });

    return usuarios.map((usuario) => ({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      gestor: {
        id: usuario.gestor?.id,
        nome: usuario.gestor?.nome,
      },
    }));
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({
      id: id,
    });

    if (!usuario) {
      this.throwNotFoundException();
    }

    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    if (!updateUsuarioDto || Object.keys(updateUsuarioDto).length === 0) {
      throw new BadRequestException('Sem dados para atualizar');
    }

    if (updateUsuarioDto.gestorId) {
      const gestor = await this.usuarioRepository.findOneBy({
        id: updateUsuarioDto.gestorId,
      });
      if (!gestor) {
        this.throwNotFoundException('Gestor Id não encontrado');
      }
    }

    const usuario = await this.usuarioRepository.preload({
      id: id,
      gestor: {
        id: updateUsuarioDto.gestorId,
      },
      ...updateUsuarioDto,
    });

    if (!usuario) {
      this.throwNotFoundException();
    }

    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);

    await this.usuarioRepository.remove(usuario);

    return usuario;
  }
}
