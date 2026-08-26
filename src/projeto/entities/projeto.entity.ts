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

    @Column({ type: 'date', nullable: true, name: 'data_inicio'})
    dataInicio?: Date //ok

    @Column({ type: 'date', nullable: true, name: 'data_termino'})
    dataTermino?: Date // ok

    @Column({ type: 'varchar' })
    orcamento?: string //ok 

    @Column({ type: 'boolean' })
    prioridade?: boolean //ok

    @ManyToOne(() => Usuario, usuario => usuario.projetos)
    @JoinColumn({ name: 'criado_por_id' })
    criadoPor!: Usuario; //ok

    @OneToMany(() => Tarefa, tarefa => tarefa.projeto)
    tarefas?: Tarefa[] //ok

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date; // ok (dados do banco)

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date; // ok (dados do banco)

}
