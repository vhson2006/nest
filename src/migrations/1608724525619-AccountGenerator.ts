import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import data from './data';

export class AccountGenerator1608724525619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'aboutUs',
            type: 'text',
          },
          {
            name: 'wcode',
            type: 'varchar',
          },
          {
            name: 'contactUsImage',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'account',
      new TableIndex({
        name: 'IDX_ACCOUNT_EMAIL',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createIndex(
      'account',
      new TableIndex({
        name: 'IDX_ACCOUNT_WCODE',
        columnNames: ['wcode'],
      }),
    );

    await this.seed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('account', 'IDX_ACCOUNT_WCODE');
    await queryRunner.dropIndex('account', 'IDX_ACCOUNT_EMAIL');
    await queryRunner.dropTable('account');
  }

  private async seed(queryRunner: QueryRunner): Promise<void> {
    const list = [
      'email',
      'name',
      'phone',
      'address',
      'aboutUs',
      'wcode',
      'contactUsImage',
    ];
    const query = 'INSERT INTO "public"."account" ("%col") VALUES %vals';
    const template = "('%val')";
    const reducer = (values, currentValue) => {
      values.push(
        template.replace(
          '%val',
          list.map((element) => currentValue[element]).join("','"),
        ),
      );
      return values;
    };

    await queryRunner.query(
      query
        .replace('%col', list.join('","'))
        .replace('%vals', data().account.reduce(reducer, []).join(',')),
    );
  }
}
