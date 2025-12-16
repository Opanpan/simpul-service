import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTasksTable1702737600001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'expired_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'is_done',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_delete',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
  }
}
