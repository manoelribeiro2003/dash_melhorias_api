import { Tarefa } from "src/tarefa/entities/tarefa.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('projetos')
export class Projeto {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nome!: string;

    @Column({ type: 'varchar' })
    categoria?: string;

    @Column({ type: 'varchar', default: 'Não iniciado' })
    status?: string;

    @Column({ type: 'date', })
    dataInicio?: Date

    @Column({ type: 'date' })
    dataTermino?: Date

    @Column({ type: 'varchar' })
    orcamento?: string

    @Column({ type: 'varchar' })
    prioridade?: string

    @Column({ type: 'boolean', default: false })
    atrasado?: boolean;

    @OneToMany(() => Tarefa, tarefa => tarefa.projeto)
    tarefas?: Tarefa[]

    @ManyToOne(() => Usuario, usuario => usuario.projetos)
    @JoinColumn({ name: 'criadoPor' })
    criadoPor!: Usuario;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;


}
