import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1674195009502 implements MigrationInterface {
  name = 'nullable_credentials1674195009502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "libraries"."employees" ALTER COLUMN "password" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "libraries"."employees" ALTER COLUMN "login" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "libraries"."employees" ALTER COLUMN "login" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "libraries"."employees" ALTER COLUMN "password" SET NOT NULL`,
    );
  }
}
