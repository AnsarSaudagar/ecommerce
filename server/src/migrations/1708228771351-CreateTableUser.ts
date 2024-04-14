import { MigrationInterface, QueryRunner } from 'typeorm';
export class CreateTableUser1708228771351 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` ( \`id\` INT NOT NULL AUTO_INCREMENT, \`first_name\` VARCHAR(255) NOT NULL, \`last_name\` VARCHAR(255), \`username\` VARCHAR(255) NOT NULL UNIQUE, \`email\` VARCHAR(255) NOT NULL, \`passwordHash\` VARCHAR(255) NOT NULL, PRIMARY KEY (\`id\`)) `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
