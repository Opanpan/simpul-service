import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column('simple-array')
  participantIds: number[];

  @Column({ nullable: true })
  lastMessage: string;

  @Column({ nullable: true })
  lastMessageAt: Date;

  @Column({ nullable: true })
  lastMessageById: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
