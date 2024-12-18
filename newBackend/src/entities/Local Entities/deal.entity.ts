import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity('deals')
export class Deal {
  @PrimaryGeneratedColumn()
  deal_id: number;

  @ManyToOne(() => Contact, (contact) => contact.deals, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' }) // FK for Contact
  contact: Contact;

  @Column({ length: 255 })
  dealName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  dealValue: number;

  @Column({ length: 50 })
  stages: string;

  @Column({ type: 'date' })
  expectedCloseDate: Date;

  @Column({ type: 'float', nullable: true })
  probability?: number;

  @Column({ length: 255, nullable: true })
  proposalLink?: string;

  @Column({ type: 'text', nullable: true })
  contracts?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
