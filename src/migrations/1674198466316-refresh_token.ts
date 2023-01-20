import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1674198466316 implements MigrationInterface {
  name = 'refresh_token1674198466316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "libraries"."employees" ADD "refresh_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "libraries"."employees" DROP COLUMN "refresh_token"`,
    );
  }
}
