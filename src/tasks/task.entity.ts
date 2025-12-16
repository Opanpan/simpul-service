import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  expired_date: Date;

  @Column({ default: false })
  is_done: boolean;

  @Column({ default: false })
  is_delete: false;
}
