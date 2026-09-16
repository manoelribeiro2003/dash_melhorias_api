import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusDeTarefa1789568165746 implements MigrationInterface {
    name = 'AddStatusDeTarefa1789568165746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefas" ADD "status" character varying DEFAULT 'Não iniciada'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tarefas" DROP COLUMN "status"`);
    }

}
