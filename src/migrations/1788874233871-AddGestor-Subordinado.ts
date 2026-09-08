import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGestorSubordinado1788874233871 implements MigrationInterface {
    name = 'AddGestorSubordinado1788874233871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME COLUMN "gestor" TO "gestor_id"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "gestor_id"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "gestor_id" integer`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_25353a95585676e5a1942ff8461" FOREIGN KEY ("gestor_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_25353a95585676e5a1942ff8461"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "gestor_id"`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "gestor_id" character varying`);
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME COLUMN "gestor_id" TO "gestor"`);
    }

}
