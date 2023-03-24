import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateReservedBooks1679660913837 implements MigrationInterface {
  name = 'updateReservedBooks1679660913837';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reserved_books" DROP CONSTRAINT "FK_613ca654baf03b08fad6a3f2f9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserved_books" DROP CONSTRAINT "REL_613ca654baf03b08fad6a3f2f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserved_books" ADD CONSTRAINT "FK_613ca654baf03b08fad6a3f2f9e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reserved_books" DROP CONSTRAINT "FK_613ca654baf03b08fad6a3f2f9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserved_books" ADD CONSTRAINT "REL_613ca654baf03b08fad6a3f2f9" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserved_books" ADD CONSTRAINT "FK_613ca654baf03b08fad6a3f2f9e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
