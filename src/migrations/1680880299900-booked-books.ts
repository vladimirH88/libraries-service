import { MigrationInterface, QueryRunner } from 'typeorm';

export class bookedBooks1680880299900 implements MigrationInterface {
  name = 'bookedBooks1680880299900';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "booked-book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP DEFAULT ('now'::text)::timestamp(6) with time zone, "book_id" uuid NOT NULL, "user_id" uuid NOT NULL, "relevant" boolean NOT NULL DEFAULT true, "issue_date" TIMESTAMP, CONSTRAINT "PK_46ad04030a5b1b70b6e5d8f2a1f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "booked-book" ADD CONSTRAINT "FK_681df9853ba649d106e5845452c" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booked-book" ADD CONSTRAINT "FK_3d7e536d64f082a679d7f80d62b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booked-book" DROP CONSTRAINT "FK_3d7e536d64f082a679d7f80d62b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booked-book" DROP CONSTRAINT "FK_681df9853ba649d106e5845452c"`,
    );
    await queryRunner.query(`DROP TABLE "booked-book"`);
  }
}
