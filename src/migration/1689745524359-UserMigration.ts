import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1689745524359 implements MigrationInterface {
    name = 'UserMigration1689745524359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'アカウントID', \`name\` varchar(255) NOT NULL COMMENT 'アカウント名', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
