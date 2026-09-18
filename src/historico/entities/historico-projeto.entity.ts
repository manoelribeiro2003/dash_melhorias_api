import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('historico_projetos')
export class HistoricoProjeto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'projeto_id', type: 'integer' })
  projetoId!: number;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  categoria!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status!: string | null;

  @Column({ type: 'boolean', default: false })
  excluido!: boolean;

  @Column({ name: 'data_inicio', type: 'date', nullable: true })
  dataInicio!: Date | null;

  @Column({ name: 'data_termino', type: 'date', nullable: true })
  dataTermino!: Date | null;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  orcamento!: string | null;

  @Column({
    name: 'ganho_par',
    type: 'numeric',
    precision: 15,
    scale: 4,
    nullable: true,
  })
  ganhoPar!: string | null;

  @Column({ type: 'boolean', default: false })
  prioridade!: boolean;

  @Column({ name: 'atualizado_por_id', type: 'integer', nullable: true })
  atualizadoPorId!: number | null;

  @Column({ name: 'criado_por_id', type: 'integer', nullable: true })
  criadoPorId!: number | null;

  @Column({ name: 'gestor_id', type: 'integer', nullable: true })
  gestorId!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
