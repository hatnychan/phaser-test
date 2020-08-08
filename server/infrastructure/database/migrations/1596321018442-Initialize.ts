import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1596321018442 implements MigrationInterface {
    name = 'Initialize1596321018442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certification" ("userId" character varying(50) NOT NULL, "passPhrase" character varying(50) NOT NULL, CONSTRAINT "PK_5c8aa0b948082342bc49d1bcfd9" PRIMARY KEY ("userId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "game_log" ("gameLogCd" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "value" character varying(1000), CONSTRAINT "PK_3d550ba1566e1b1cec6f735f54e" PRIMARY KEY ("gameLogCd", "key"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("userId" character varying(50) NOT NULL, CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "game_log"`, undefined);
        await queryRunner.query(`DROP TABLE "certification"`, undefined);
    }

}
