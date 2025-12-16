import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('conversation_reads')
export class ConversationRead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  conversationId: number;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', nullable: true })
  lastReadAt: Date;
}
