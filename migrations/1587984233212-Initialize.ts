import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1587984233212 implements MigrationInterface {
    name = 'Initialize1587984233212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "num_param" DROP COLUMN "value"`, undefined);
        await queryRunner.query(`ALTER TABLE "num_param" ADD "value" double precision`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "num_param" DROP COLUMN "value"`, undefined);
        await queryRunner.query(`ALTER TABLE "num_param" ADD "value" numeric`, undefined);
    }

}
