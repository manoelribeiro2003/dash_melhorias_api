import { Tarefa } from "src/tarefa/entities/tarefa.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('projetos')
export class Projeto {
    @PrimaryGeneratedColumn()
    id!: number; //ok

    @Column({ type: 'varchar', length: 100, nullable: false })
    nome!: string; // ok

    @Column({ type: 'varchar' })
    categoria?: string; //ok

    @Column({ type: 'varchar', default: 'Não iniciado' })
    status?: string; //ok

    @Column({ type: 'date', })
    dataInicio?: Date //ok

    @Column({ type: 'date' })
    dataTermino?: Date // ok

    @Column({ type: 'varchar' })
    orcamento?: string //ok 

    @Column({ type: 'boolean' })
    prioridade?: boolean //ok

    @OneToMany(() => Tarefa, tarefa => tarefa.projeto)
    tarefas?: Tarefa[] //ok

    @ManyToOne(() => Usuario, usuario => usuario.projetos)
    @JoinColumn({ name: 'criadoPor' })
    criadoPor!: Usuario; //ok

    @CreateDateColumn()
    createdAt!: Date; // ok (dados do banco)

    @UpdateDateColumn()
    updatedAt!: Date; // ok (dados do banco)

}
