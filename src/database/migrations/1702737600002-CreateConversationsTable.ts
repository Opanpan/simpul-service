import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateConversationsTable1702737600002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'conversations',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'subject',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'participantIds',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'lastMessage',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'lastMessageAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'lastMessageById',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('conversations');
  }
}
