import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UpdateImage1610379236525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'image',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'original',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'home_image',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'accountId',
            type: 'varchar',
          },
          {
            name: 'position',
            type: 'varchar',
          },
          {
            name: 'imageId',
            type: 'varchar',
          },
        ],
      }),
      true,
    );
    await queryRunner.query(`ALTER TABLE "account" ADD "avatar" varchar(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP "avatar"`);
    await queryRunner.dropTable('home_image');
    await queryRunner.dropTable('image');
  }
}
