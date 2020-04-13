import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1586776014230 implements MigrationInterface {
    name = 'Initialize1586776014230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "num_param" ("paramCd" character(5) NOT NULL, "seq" SERIAL NOT NULL, "value" numeric, CONSTRAINT "PK_41a038f89d0f9f53cdd96783073" PRIMARY KEY ("paramCd", "seq"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "num_param"`, undefined);
    }

}
