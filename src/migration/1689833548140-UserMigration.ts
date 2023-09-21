import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1689833548140 implements MigrationInterface {
    name = 'UserMigration1689833548140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`passwurd\` \`password\` varchar(255) NOT NULL COMMENT 'パスワード'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL COMMENT 'パスワード'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL COMMENT 'パスワード'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`passwurd\` varchar(255) NOT NULL COMMENT 'パスワード'`);
    }

}
