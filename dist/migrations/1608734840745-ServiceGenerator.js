"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceGenerator1608734840745 = void 0;
const typeorm_1 = require("typeorm");
const data_1 = require("./data");
class ServiceGenerator1608734840745 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        await queryRunner.createIndex('service', new typeorm_1.TableIndex({
            name: 'IDX_SERVICE_ACCOUNT',
            columnNames: ['accountId'],
        }));
        this.seed(queryRunner);
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('service', 'IDX_SERVICE_ACCOUNT');
        await queryRunner.dropTable('service');
    }
    async seed(queryRunner) {
        const list = ['jumbotronTitle', 'serviceImage', 'mainTitle', 'accountId'];
        const query = 'INSERT INTO "public"."service" ("%col") VALUES %vals';
        const template = "('%val')";
        const reducer = (values, currentValue) => {
            values.push(template.replace('%val', list.map((element) => currentValue[element]).join("','")));
            return values;
        };
        const seedOneAccount = async (queryRunner, element) => {
            const accounts = await queryRunner.query(`SELECT id FROM account WHERE "email"='${element.account}'`);
            await queryRunner.query(query.replace('%col', list.join('","')).replace('%vals', element.data
                .map((serviceData) => {
                serviceData.accountId = accounts[0].id;
                return serviceData;
            })
                .reduce(reducer, [])
                .join(',')));
        };
        await Promise.all(data_1.default().service.map((element) => seedOneAccount(queryRunner, element)));
    }
}
exports.ServiceGenerator1608734840745 = ServiceGenerator1608734840745;
//# sourceMappingURL=1608734840745-ServiceGenerator.js.map