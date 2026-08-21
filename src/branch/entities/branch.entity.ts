import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('branches')
export class Branch {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 50})
    name!: string;

    @OneToMany(() => User, user => user.branch)
    @JoinColumn({name: 'user'})
    users?: User[]
}
