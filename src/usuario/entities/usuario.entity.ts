import { Projeto } from '../../projeto/entities/projeto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @OneToMany(() => Projeto, (projeto) => projeto.criadoPor)
  @JoinColumn({ name: 'projetos' })
  projetos?: Projeto[];

  @OneToMany(() => Projeto, (projeto) => projeto.gestor)
  @JoinColumn({ name: 'projetos_geridos' })
  projetosGeridos?: Projeto[];

  @ManyToOne(() => Usuario, (usuario) => usuario.subordinados, {
    nullable: true,
  })
  @JoinColumn({ name: 'gestor_id' })
  gestor?: Usuario | null;

  @OneToMany(() => Usuario, (usuario) => usuario.gestor)
  subordinados?: Usuario[];
}
