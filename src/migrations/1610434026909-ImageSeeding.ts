import { MigrationInterface, QueryRunner } from 'typeorm';
import data from './data';

export class ImageSeeding1610434026909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.seedImage(queryRunner);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "background" varchar(255)`,
    );
    await this.updateOldData(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const urls = data().image.reduce((result, current) => {
      result.push(current.url);
      return result;
    }, []);
    const selectTemplate = `SELECT id FROM "public"."image" WHERE "image"."url" in ('%vals');`;
    const objs: Array<any> = await queryRunner.query(
      selectTemplate.replace('%vals', urls.join("','")),
    );
    const ids = objs.reduce((vals, current) => {
      vals.push(current.id);
      return vals;
    }, []);

    const removeAccInfo = `UPDATE "public"."account" SET "avatar" = '', "background" = '', "contactUsImage" = '' WHERE avatar in ('%vals') OR "background" in ('%vals') OR "contactUsImage" in ('%vals');`;
    const removeServiceInfo = `UPDATE "public"."service" SET "serviceImage" = '' WHERE "serviceImage" in ('%vals');`;
    const removeProductInfo = `UPDATE "public"."product" SET "imageId" = '' WHERE "imageId" in ('%vals');`;
    const removeHomeImageInfo = `DELETE FROM "public"."home_image" WHERE "imageId" in ('%vals');`;
    const delTemplate = `DELETE FROM "public"."image" WHERE "image"."url" in ('%vals');`;
    await queryRunner.query(
      ''.concat(
        removeAccInfo.replace('%vals', ids.join("','")),
        removeServiceInfo.replace('%vals', ids.join("','")),
        removeProductInfo.replace('%vals', ids.join("','")),
        removeHomeImageInfo.replace('%vals', ids.join("','")),
        delTemplate.replace('%vals', urls.join("','")),
        `ALTER TABLE "account" DROP "background"`,
      ),
    );
  }

  private async seedImage(queryRunner: QueryRunner): Promise<void> {
    const list = ['original', 'type', 'url'];
    const query = 'INSERT INTO "public"."image" ("%col") VALUES %vals;';
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
        .replace('%vals', data().image.reduce(reducer, []).join(',')),
    );
  }

  private async updateOldData(queryRunner: QueryRunner): Promise<void> {
    const updateAccTemplate = `UPDATE "public"."account" SET "avatar" = '%a', "background" = '%b', "contactUsImage" = '%c' WHERE id = '%d';`;
    const updateServiceTemplate = `UPDATE "public"."service" SET "serviceImage" = '%s' WHERE "accountId" = '%d';`;
    const updateHomeTemplate = `INSERT INTO "public"."home_image" ("accountId", "position", "imageId") VALUES ('%a', '%p', '%i');`;
    const updateProductTemplate = `UPDATE "public"."product" SET "imageId" = '%s' WHERE "accountId" = '%d';`;
    const rawData: Array<any> = await queryRunner.query(
      `SELECT id, type FROM "public"."image" where "image"."type" IN('DEFAULT_AVATAR', 'DEFAULT_BACKGROUND', 'DEFAULT_CONTACT', 'DEFAULT_SERVICE', 'DEFAULT_HOME_1', 'DEFAULT_HOME_2', 'DEFAULT_HOME_3', 'DEFAULT_HOME_4', 'DEFAULT_PRODUCT')`,
    );
    const types = rawData.reduce((result, cur) => {
      result[cur.type] = cur.id;
      return result;
    }, {});
    data().account.map(async (val) => {
      const accounts = await queryRunner.query(
        `SELECT id FROM "public"."account" where "account"."email" = '%s'`.replace(
          '%s',
          val.email,
        ),
      );
      const finalQuery = ''.concat(
        updateAccTemplate
          .replace('%a', types.DEFAULT_AVATAR)
          .replace('%b', types.DEFAULT_BACKGROUND)
          .replace('%c', types.DEFAULT_CONTACT)
          .replace('%d', accounts[0].id),
        updateServiceTemplate
          .replace('%s', types.DEFAULT_SERVICE)
          .replace('%d', accounts[0].id),
        updateHomeTemplate
          .replace('%a', accounts[0].id)
          .replace('%p', '1')
          .replace('%i', types.DEFAULT_HOME_1),
        updateHomeTemplate
          .replace('%a', accounts[0].id)
          .replace('%p', '2')
          .replace('%i', types.DEFAULT_HOME_2),
        updateHomeTemplate
          .replace('%a', accounts[0].id)
          .replace('%p', '3')
          .replace('%i', types.DEFAULT_HOME_3),
        updateHomeTemplate
          .replace('%a', accounts[0].id)
          .replace('%p', '4')
          .replace('%i', types.DEFAULT_HOME_4),
        updateProductTemplate
          .replace('%s', types.DEFAULT_PRODUCT)
          .replace('%d', accounts[0].id),
      );
      await queryRunner.query(finalQuery);
    });
  }
}
