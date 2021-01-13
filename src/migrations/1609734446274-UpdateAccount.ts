import { MigrationInterface, QueryRunner } from 'typeorm';
import * as crypto from 'crypto';
import data from './data';

export class UpdateAccount1609734446274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ADD "password" varchar(255)`,
    );
    data().account.map(async (val) => {
      const updateAccTemplate = `UPDATE "public"."account" SET "password" = '%p' WHERE "email" = '%e';`;
      queryRunner.query(
        updateAccTemplate
          .replace(
            '%p',
            crypto.createHash('md5').update(val.password).digest('hex'),
          )
          .replace('%e', val.email),
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "account" DROP "password"`);
  }
}
