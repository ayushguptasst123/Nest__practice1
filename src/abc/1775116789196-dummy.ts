import { MigrationInterface, QueryRunner } from "typeorm";

export class Dummy1775116789196 implements MigrationInterface {
    name = 'Dummy1775116789196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Students\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`isHuman\` tinyint NOT NULL, \`dateOfBirth\` datetime NOT NULL, \`address\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`description\` varchar(500) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_64bfe27b3e874b1ddf8252330f\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_64bfe27b3e874b1ddf8252330f\` ON \`Students\``);
        await queryRunner.query(`DROP TABLE \`Students\``);
    }

}
