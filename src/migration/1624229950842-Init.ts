import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class Init1624229950842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'candlesticks',
            columns: [
                new TableColumn({
                    name: 'id', type: 'bigint', isPrimary: true, isGenerated: true, generationStrategy: 'increment'
                }),
                new TableColumn({
                    name: 'open', type: 'decimal(18, 10)'
                }),
                new TableColumn({
                    name: 'close', type: 'decimal(18, 10)'
                }),
                new TableColumn({
                    name: 'high', type: 'decimal(18, 10)'
                }),
                new TableColumn({
                    name: 'low', type: 'decimal(18, 10)'
                }),
                new TableColumn({
                    name: 'volume', type: 'bigint'
                }),
                new TableColumn({
                    name: 'moment', type: 'datetime'
                })
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('candlesticks')
    }

}
