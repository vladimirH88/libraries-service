import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672052640889 implements MigrationInterface {
    name = 'migrations1672052640889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "FK_303bfdf60626224de6c883f6ba5"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "FK_727d9c30d77d3a253177b2e918f"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "REL_8b14204e8af5e371e36b8c11e1"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "REL_303bfdf60626224de6c883f6ba"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "REL_727d9c30d77d3a253177b2e918"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b" FOREIGN KEY ("position_id") REFERENCES "libraries"."positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "FK_303bfdf60626224de6c883f6ba5" FOREIGN KEY ("library_id") REFERENCES "libraries"."libraries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "FK_727d9c30d77d3a253177b2e918f" FOREIGN KEY ("role_id") REFERENCES "libraries"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "FK_727d9c30d77d3a253177b2e918f"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "FK_303bfdf60626224de6c883f6ba5"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "REL_727d9c30d77d3a253177b2e918" UNIQUE ("role_id")`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "REL_303bfdf60626224de6c883f6ba" UNIQUE ("library_id")`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "REL_8b14204e8af5e371e36b8c11e1" UNIQUE ("position_id")`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "FK_727d9c30d77d3a253177b2e918f" FOREIGN KEY ("role_id") REFERENCES "libraries"."roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "FK_303bfdf60626224de6c883f6ba5" FOREIGN KEY ("library_id") REFERENCES "libraries"."libraries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b" FOREIGN KEY ("position_id") REFERENCES "libraries"."positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
