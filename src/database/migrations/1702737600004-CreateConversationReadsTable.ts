import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateConversationReadsTable1702737600004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'conversation_reads',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'conversationId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'lastReadAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['conversationId'],
            referencedTableName: 'conversations',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        uniques: [
          {
            columnNames: ['conversationId', 'userId'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('conversation_reads');
  }
}
