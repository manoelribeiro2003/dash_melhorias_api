import { Projeto } from "src/projeto/entities/projeto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tarefas')
export class Tarefa {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false })
    nome!: string;

    @Column({ type: 'integer' })
    ordem!: number;

    @Column({ type: 'date', nullable: true, name: 'data_inicio' })
    dataInicio!: Date //ok

    @Column({ type: 'date', nullable: true, name: 'data_termino' })
    dataTermino!: Date // ok

    @Column({ type: 'boolean', default: false })
    concluido!: boolean;

    @ManyToOne(() => Projeto, projeto => projeto.tarefas, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'projeto_id' })
    projeto!: Projeto;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}