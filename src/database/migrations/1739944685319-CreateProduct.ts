import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProduct1739944685319 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE product (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price INT NOT NULL,
                weight INT NOT NULL,
                is_checked BOOLEAN DEFAULT FALSE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE product;`);
    }

}
