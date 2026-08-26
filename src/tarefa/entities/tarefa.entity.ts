import { Projeto } from "src/projeto/entities/projeto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tarefas')
export class Tarefa {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false })
    nome!: string;
    
    @Column({ type: 'integer', nullable: false })
    ordem!: number;

    @Column({ type: 'boolean' })
    concluido!: boolean;

    @ManyToOne(() => Projeto, projeto => projeto.tarefas, { nullable: false })
    @JoinColumn({ name: 'projeto_id' })
    projeto!: Projeto;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}