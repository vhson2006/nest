import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import data from './data';

export class HomeGenerator1608726145930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'home',
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
            name: 'mainTitle',
            type: 'varchar',
          },
          {
            name: 'mainParagraph',
            type: 'text',
          },
          {
            name: 'sideParagraph',
            type: 'text',
          },
          {
            name: 'subTitle',
            type: 'varchar',
          },
          {
            name: 'subParagraph',
            type: 'text',
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
      'home',
      new TableIndex({
        name: 'IDX_HOME_ACCOUNT',
        columnNames: ['accountId'],
      }),
    );
    this.seed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('home', 'IDX_HOME_ACCOUNT');
    await queryRunner.dropTable('home');
  }

  private async seed(queryRunner: QueryRunner): Promise<void> {
    const list = [
      'jumbotronTitle',
      'mainTitle',
      'mainParagraph',
      'sideParagraph',
      'subTitle',
      'subParagraph',
      'accountId',
    ];
    const query = 'INSERT INTO "public"."home" ("%col") VALUES %vals';
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
            .map((homeData) => {
              homeData.accountId = accounts[0].id;
              return homeData;
            })
            .reduce(reducer, [])
            .join(','),
        ),
      );
    };
    await Promise.all(
      data().home.map((element) => seedOneAccount(queryRunner, element)),
    );
  }
}
