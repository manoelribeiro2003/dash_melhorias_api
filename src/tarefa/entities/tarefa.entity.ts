import { Projeto } from "src/projeto/entities/projeto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tarefas')
export class Tarefa {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false })
    nome!: string;

    @Column({ type: 'boolean' })
    concluido?: boolean;

    @ManyToOne(() => Projeto, projeto => projeto.tarefas)
    @JoinColumn({ name: 'projetos' })
    projeto!: Projeto;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
