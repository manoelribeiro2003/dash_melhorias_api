import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionarPropriedadeGanhoPar1789564308746 implements MigrationInterface {
    name = 'AdicionarPropriedadeGanhoPar1789564308746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projetos" ADD "ganhoPar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projetos" DROP COLUMN "ganhoPar"`);
    }

}
