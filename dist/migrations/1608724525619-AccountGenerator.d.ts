import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AccountGenerator1608724525619 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
    private seed;
}
