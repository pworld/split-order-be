import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourierCharge1739944613557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE courier_charge (
                id SERIAL PRIMARY KEY,
                low INT NOT NULL,
                high INT NOT NULL,
                charge INT NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE courier_charge;`);
    }

}
