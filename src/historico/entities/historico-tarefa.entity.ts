import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('historico_tarefas')
export class HistoricoTarefa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'tarefa_id', type: 'integer' })
  tarefaId!: number;

  @Column({ name: 'projeto_id', type: 'integer' })
  projetoId!: number;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'integer' })
  ordem!: number;

  @Column({ name: 'data_inicio', type: 'date', nullable: true })
  dataInicio!: Date | null;

  @Column({ name: 'data_termino', type: 'date', nullable: true })
  dataTermino!: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status!: string | null;

  @Column({ type: 'boolean', default: false })
  excluido!: boolean;

  @Column({ name: 'criado_por_id', type: 'integer', nullable: true })
  criadoPorId!: number | null;

  @Column({ name: 'atualizado_por_id', type: 'integer', nullable: true })
  atualizadoPorId!: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
