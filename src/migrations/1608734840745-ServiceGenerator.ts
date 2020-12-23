import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import data from './data';

export class ServiceGenerator1608734840745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'jumbotronTitle',
            type: 'varchar',
          },
          {
            name: 'serviceImage',
            type: 'varchar',
          },
          {
            name: 'mainTitle',
            type: 'varchar',
          },
          {
            name: 'accountId',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'service',
      new TableIndex({
        name: 'IDX_SERVICE_ACCOUNT',
        columnNames: ['accountId'],
      }),
    );
    this.seed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('service', 'IDX_SERVICE_ACCOUNT');
    await queryRunner.dropTable('service');
  }

  private async seed(queryRunner: QueryRunner): Promise<void> {
    const list = ['jumbotronTitle', 'serviceImage', 'mainTitle', 'accountId'];
    const query = 'INSERT INTO "public"."service" ("%col") VALUES %vals';
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
    const seedOneAccount = async (
      queryRunner: QueryRunner,
      element,
    ): Promise<void> => {
      const accounts = await queryRunner.query(
        `SELECT id FROM account WHERE "email"='${element.account}'`,
      );
      await queryRunner.query(
        query.replace('%col', list.join('","')).replace(
          '%vals',
          element.data
            .map((serviceData) => {
              serviceData.accountId = accounts[0].id;
              return serviceData;
            })
            .reduce(reducer, [])
            .join(','),
        ),
      );
    };
    await Promise.all(
      data().service.map((element) => seedOneAccount(queryRunner, element)),
    );
  }
}
