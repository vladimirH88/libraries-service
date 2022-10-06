import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1665046469907 implements MigrationInterface {
    name = 'migrations1665046469907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "libraries"."authors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "patronymic" character varying, "surname" character varying NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libraries"."libraries" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying, CONSTRAINT "PK_505fedfcad00a09b3734b4223de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libraries"."positions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libraries"."employees" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "patronymic" character varying NOT NULL, "surname" character varying NOT NULL, "employment_date" TIMESTAMP NOT NULL DEFAULT now(), "fired_date" TIMESTAMP, "position_id" integer, "library_id" integer, CONSTRAINT "REL_8b14204e8af5e371e36b8c11e1" UNIQUE ("position_id"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libraries"."genres" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libraries"."books" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "isbn" character varying NOT NULL, "library_id" integer, "genre_id" integer, "author_id" integer, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libraries"."users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "patronymic" character varying, "surname" character varying NOT NULL, "registration_date" TIMESTAMP NOT NULL DEFAULT now(), "block" boolean NOT NULL DEFAULT false, "block_date" TIMESTAMP, "block_reason" character varying, "library_id" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libraries"."reserved_books" ("id" SERIAL NOT NULL, "reserved_from" TIMESTAMP NOT NULL, "reserved_to" TIMESTAMP NOT NULL, "return_date" TIMESTAMP, "returned" boolean NOT NULL DEFAULT false, "user_id" integer, "book_id" integer, CONSTRAINT "REL_613ca654baf03b08fad6a3f2f9" UNIQUE ("user_id"), CONSTRAINT "REL_4680bc73b4fb15a3e4a42734aa" UNIQUE ("book_id"), CONSTRAINT "PK_810efc660e83cc2545bad918127" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b" FOREIGN KEY ("position_id") REFERENCES "libraries"."positions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" ADD CONSTRAINT "FK_303bfdf60626224de6c883f6ba5" FOREIGN KEY ("library_id") REFERENCES "libraries"."libraries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."books" ADD CONSTRAINT "FK_ab3dd6e5939268a45a19e2a8746" FOREIGN KEY ("library_id") REFERENCES "libraries"."libraries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."books" ADD CONSTRAINT "FK_3b94b035d80d7564abd012014c8" FOREIGN KEY ("genre_id") REFERENCES "libraries"."genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."books" ADD CONSTRAINT "FK_1056dbee4616479f7d562c562df" FOREIGN KEY ("author_id") REFERENCES "libraries"."authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."users" ADD CONSTRAINT "FK_78cd3bd1f12d3a3129110c6be16" FOREIGN KEY ("library_id") REFERENCES "libraries"."libraries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."reserved_books" ADD CONSTRAINT "FK_613ca654baf03b08fad6a3f2f9e" FOREIGN KEY ("user_id") REFERENCES "libraries"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libraries"."reserved_books" ADD CONSTRAINT "FK_4680bc73b4fb15a3e4a42734aad" FOREIGN KEY ("book_id") REFERENCES "libraries"."books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "libraries"."reserved_books" DROP CONSTRAINT "FK_4680bc73b4fb15a3e4a42734aad"`);
        await queryRunner.query(`ALTER TABLE "libraries"."reserved_books" DROP CONSTRAINT "FK_613ca654baf03b08fad6a3f2f9e"`);
        await queryRunner.query(`ALTER TABLE "libraries"."users" DROP CONSTRAINT "FK_78cd3bd1f12d3a3129110c6be16"`);
        await queryRunner.query(`ALTER TABLE "libraries"."books" DROP CONSTRAINT "FK_1056dbee4616479f7d562c562df"`);
        await queryRunner.query(`ALTER TABLE "libraries"."books" DROP CONSTRAINT "FK_3b94b035d80d7564abd012014c8"`);
        await queryRunner.query(`ALTER TABLE "libraries"."books" DROP CONSTRAINT "FK_ab3dd6e5939268a45a19e2a8746"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "FK_303bfdf60626224de6c883f6ba5"`);
        await queryRunner.query(`ALTER TABLE "libraries"."employees" DROP CONSTRAINT "FK_8b14204e8af5e371e36b8c11e1b"`);
        await queryRunner.query(`DROP TABLE "libraries"."reserved_books"`);
        await queryRunner.query(`DROP TABLE "libraries"."users"`);
        await queryRunner.query(`DROP TABLE "libraries"."books"`);
        await queryRunner.query(`DROP TABLE "libraries"."genres"`);
        await queryRunner.query(`DROP TABLE "libraries"."employees"`);
        await queryRunner.query(`DROP TABLE "libraries"."positions"`);
        await queryRunner.query(`DROP TABLE "libraries"."libraries"`);
        await queryRunner.query(`DROP TABLE "libraries"."authors"`);
    }

}
