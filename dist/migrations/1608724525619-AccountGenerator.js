"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountGenerator1608724525619 = void 0;
const typeorm_1 = require("typeorm");
const data_1 = require("./data");
class AccountGenerator1608724525619 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }), true);
        await queryRunner.createIndex('account', new typeorm_1.TableIndex({
            name: 'IDX_ACCOUNT_EMAIL',
            columnNames: ['email'],
        }));
        await queryRunner.createIndex('account', new typeorm_1.TableIndex({
            name: 'IDX_ACCOUNT_WCODE',
            columnNames: ['wcode'],
        }));
        await this.seed(queryRunner);
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('account', 'IDX_ACCOUNT_WCODE');
        await queryRunner.dropIndex('account', 'IDX_ACCOUNT_EMAIL');
        await queryRunner.dropTable('account');
    }
    async seed(queryRunner) {
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
            values.push(template.replace('%val', list.map((element) => currentValue[element]).join("','")));
            return values;
        };
        await queryRunner.query(query
            .replace('%col', list.join('","'))
            .replace('%vals', data_1.default().account.reduce(reducer, []).join(',')));
    }
}
exports.AccountGenerator1608724525619 = AccountGenerator1608724525619;
//# sourceMappingURL=1608724525619-AccountGenerator.js.map