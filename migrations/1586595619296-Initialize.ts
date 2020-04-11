import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1586595619296 implements MigrationInterface {
    name = 'Initialize1586595619296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "num_param" ("id" SERIAL NOT NULL, "seq" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_f25b44456fb1a73fb1cfbac6256" PRIMARY KEY ("id", "seq"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "num_param"`, undefined);
    }

}
