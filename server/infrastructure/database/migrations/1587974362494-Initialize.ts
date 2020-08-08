import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1587974362494 implements MigrationInterface {
    name = 'Initialize1587974362494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "num_param" ("paramCd" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "value" numeric, CONSTRAINT "PK_17116db8bca240ece8148940a5b" PRIMARY KEY ("paramCd", "key"))`, undefined);
        await queryRunner.query(`CREATE TABLE "str_param" ("paramCd" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "value" character varying(1000), CONSTRAINT "PK_cd509b949c6dbdf8a46af3b1890" PRIMARY KEY ("paramCd", "key"))`, undefined);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`, undefined);
        await queryRunner.query(`DROP TABLE "str_param"`, undefined);
        await queryRunner.query(`DROP TABLE "num_param"`, undefined);
    }

}
