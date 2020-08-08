import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1588401964996 implements MigrationInterface {
    name = 'Initialize1588401964996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "character" ("charId" character varying(50) NOT NULL, CONSTRAINT "PK_5c4afdbaecba422bb78cf4c127d" PRIMARY KEY ("charId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "map_tile_posotion" ("mapId" character varying(50) NOT NULL, "value" jsonb, CONSTRAINT "PK_c4d31bbe219001542af19658e88" PRIMARY KEY ("mapId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "num_character_attribute" ("charId" character varying(50) NOT NULL, "charAttrCd" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "value" double precision, CONSTRAINT "PK_f802bd2dad40749069fa0d30d45" PRIMARY KEY ("charId", "charAttrCd", "key"))`, undefined);
        await queryRunner.query(`CREATE TABLE "str_character_attribute" ("charId" character varying(50) NOT NULL, "charAttrCd" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "value" character varying(1000), CONSTRAINT "PK_0afe15b54689b9b224067a48421" PRIMARY KEY ("charId", "charAttrCd", "key"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "str_character_attribute"`, undefined);
        await queryRunner.query(`DROP TABLE "num_character_attribute"`, undefined);
        await queryRunner.query(`DROP TABLE "map_tile_posotion"`, undefined);
        await queryRunner.query(`DROP TABLE "character"`, undefined);
    }

}
