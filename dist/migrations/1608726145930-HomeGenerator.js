"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeGenerator1608726145930 = void 0;
const typeorm_1 = require("typeorm");
const data_1 = require("./data");
class HomeGenerator1608726145930 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        await queryRunner.createIndex('home', new typeorm_1.TableIndex({
            name: 'IDX_HOME_ACCOUNT',
            columnNames: ['accountId'],
        }));
        this.seed(queryRunner);
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('home', 'IDX_HOME_ACCOUNT');
        await queryRunner.dropTable('home');
    }
    async seed(queryRunner) {
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
            values.push(template.replace('%val', list.map((element) => currentValue[element]).join("','")));
            return values;
        };
        const seedOneAccount = async (queryRunner, element) => {
            const accounts = await queryRunner.query(`SELECT id FROM account WHERE "email"='${element.account}'`);
            await queryRunner.query(query.replace('%col', list.join('","')).replace('%vals', element.data
                .map((homeData) => {
                homeData.accountId = accounts[0].id;
                return homeData;
            })
                .reduce(reducer, [])
                .join(',')));
        };
        await Promise.all(data_1.default().home.map((element) => seedOneAccount(queryRunner, element)));
    }
}
exports.HomeGenerator1608726145930 = HomeGenerator1608726145930;
//# sourceMappingURL=1608726145930-HomeGenerator.js.map