"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGenerator1608735574081 = void 0;
const typeorm_1 = require("typeorm");
const data_1 = require("./data");
class ProductGenerator1608735574081 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        await queryRunner.createIndex('product', new typeorm_1.TableIndex({
            name: 'IDX_PRODUCT_ACCOUNT',
            columnNames: ['accountId'],
        }));
        this.seed(queryRunner);
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('product', 'IDX_PRODUCT_ACCOUNT');
        await queryRunner.dropTable('product');
    }
    async seed(queryRunner) {
        const list = ['title', 'description', 'tags', 'imageId', 'accountId'];
        const query = 'INSERT INTO "public"."product" ("%col") VALUES %vals';
        const template = "('%val')";
        const reducer = (values, currentValue) => {
            values.push(template.replace('%val', list.map((element) => currentValue[element]).join("','")));
            return values;
        };
        const seedOneAccount = async (queryRunner, element) => {
            const accounts = await queryRunner.query(`SELECT id FROM account WHERE "email"='${element.account}'`);
            await queryRunner.query(query.replace('%col', list.join('","')).replace('%vals', element.data
                .map((productData) => {
                productData.accountId = accounts[0].id;
                return productData;
            })
                .reduce(reducer, [])
                .join(',')));
        };
        await Promise.all(data_1.default().product.map((element) => seedOneAccount(queryRunner, element)));
    }
}
exports.ProductGenerator1608735574081 = ProductGenerator1608735574081;
//# sourceMappingURL=1608735574081-ProductGenerator.js.map