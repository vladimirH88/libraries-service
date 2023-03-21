import { MigrationInterface, QueryRunner } from 'typeorm';

export class uniqueIsbn1679383073487 implements MigrationInterface {
  name = 'uniqueIsbn1679383073487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "UQ_54337dc30d9bb2c3fadebc69094" UNIQUE ("isbn")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "UQ_54337dc30d9bb2c3fadebc69094"`,
    );
  }
}
