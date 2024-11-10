import { Rifa } from 'src/rifas/rifas.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tbticket')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Rifa, (rifa) => rifa.tickets, { nullable: false })
  @JoinColumn({ name: 'rifa_id' })
  rifa: Rifa;

  @Column({ type: 'int' })
  ticket_number: number;

  @Column({ type: 'varchar', default: 'available' })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
