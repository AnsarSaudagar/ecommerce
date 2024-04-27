import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleColumnUsersTable1714219539793 implements MigrationInterface {
  name = 'RoleColumnUsersTable1714219539793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'Guest'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
  }
}
