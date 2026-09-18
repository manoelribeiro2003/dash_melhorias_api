import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelasDeHistoricos1789750074177 implements MigrationInterface {
    name = 'CriarTabelasDeHistoricos1789750074177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "historico_tarefas" ("id" SERIAL NOT NULL, "tarefa_id" integer NOT NULL, "projeto_id" integer NOT NULL, "nome" character varying(255) NOT NULL, "ordem" integer NOT NULL, "data_inicio" date, "data_termino" date, "status" character varying(50), "excluido" boolean NOT NULL DEFAULT false, "criado_por_id" integer, "atualizado_por_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1607a878f2c8e4b8ea1d62e64c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historico_projetos" ("id" SERIAL NOT NULL, "projeto_id" integer NOT NULL, "nome" character varying(100) NOT NULL, "categoria" character varying(100), "status" character varying(50), "excluido" boolean NOT NULL DEFAULT false, "data_inicio" date, "data_termino" date, "orcamento" numeric(15,2), "ganho_par" numeric(15,4), "prioridade" boolean NOT NULL DEFAULT false, "atualizado_por_id" integer, "criado_por_id" integer, "gestor_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1ec58457cb111b8a36d4e9d8133" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "historico_projetos"`);
        await queryRunner.query(`DROP TABLE "historico_tarefas"`);
    }

}
