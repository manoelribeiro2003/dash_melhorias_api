import { Branch } from "src/branch/entities/branch.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 100 })
    email!: string;

    @ManyToOne(() => Branch, branch => branch.users)
    @JoinColumn({name: 'branch'})
    branch!: Branch;

    @Column({ default: false })
    dimensionamento!: boolean;

    @Column({ default: true })
    setup_layout!: boolean;

    @Column({ default: false })
    admin!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}
