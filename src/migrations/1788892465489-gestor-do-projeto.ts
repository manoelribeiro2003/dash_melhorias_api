import { MigrationInterface, QueryRunner } from "typeorm";

export class GestorDoProjeto1788892465489 implements MigrationInterface {
    name = 'GestorDoProjeto1788892465489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projetos" ADD "gestor_id" integer`);
        await queryRunner.query(`ALTER TABLE "projetos" ADD CONSTRAINT "FK_28e06e6f19c94d9dd52ee3653a7" FOREIGN KEY ("gestor_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projetos" DROP CONSTRAINT "FK_28e06e6f19c94d9dd52ee3653a7"`);
        await queryRunner.query(`ALTER TABLE "projetos" DROP COLUMN "gestor_id"`);
    }

}
