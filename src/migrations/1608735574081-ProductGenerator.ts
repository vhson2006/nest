import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';
import data from './data';

export class ProductGenerator1608735574081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'tags',
            type: 'varchar',
          },
          {
            name: 'imageId',
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
      'product',
      new TableIndex({
        name: 'IDX_PRODUCT_ACCOUNT',
        columnNames: ['accountId'],
      }),
    );
    this.seed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('product', 'IDX_PRODUCT_ACCOUNT');
    await queryRunner.dropTable('product');
  }

  private async seed(queryRunner: QueryRunner): Promise<void> {
    const list = ['title', 'description', 'tags', 'imageId', 'accountId'];
    const query = 'INSERT INTO "public"."product" ("%col") VALUES %vals';
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
            .map((productData) => {
              productData.accountId = accounts[0].id;
              return productData;
            })
            .reduce(reducer, [])
            .join(','),
        ),
      );
    };
    await Promise.all(
      data().product.map((element) => seedOneAccount(queryRunner, element)),
    );
  }
}
