import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1597934661834 implements MigrationInterface {
    name = 'Initialize1597934661834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_log" ("gameLogCd" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "lang" character varying(10) NOT NULL, "value" character varying(1000), CONSTRAINT "PK_5a0c428b37a1a6442e727b4eca7" PRIMARY KEY ("gameLogCd", "key", "lang"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" character varying(50) NOT NULL, "userName" character varying(20) NOT NULL, "location" character varying(50) NOT NULL, "lang" character varying(10) NOT NULL, CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "game_log"`);
    }

}
