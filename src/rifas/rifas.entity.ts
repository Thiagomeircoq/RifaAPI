import { Ticket } from 'src/tickets/tickets.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('tbrifa')
export class Rifa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ticket_price: number;

  @Column({ type: 'int' })
  min_ticket: number;

  @Column({ type: 'int' })
  max_ticket: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.rifa)
  tickets: Ticket[];
}
