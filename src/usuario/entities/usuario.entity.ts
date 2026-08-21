import { Projeto } from "src/projeto/entities/projeto.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    nome!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @OneToMany(() => Projeto, projeto => projeto.criadoPor)
    @JoinColumn({ name: 'projetos' })
    projetos?: Projeto[]

}
