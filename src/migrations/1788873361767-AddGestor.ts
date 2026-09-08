import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGestor1788873361767 implements MigrationInterface {
    name = 'AddGestor1788873361767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "gestor" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "gestor"`);
    }

}
