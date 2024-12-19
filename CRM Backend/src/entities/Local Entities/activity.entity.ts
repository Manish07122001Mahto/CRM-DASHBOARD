import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  activity_id: number;

  @ManyToOne(() => Contact, (contact) => contact.activities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' }) // Specifies the FK column name
  contact: Contact;

  @Column({ type: 'date' })
  date: Date;

  @Column({ length: 50 })
  activityType: string;

  @Column({ type: 'text', nullable: true })
  details?: string;

  @Column({ type: 'date', nullable: true })
  followUpDate?: Date;

  @Column({ length: 255, nullable: true })
  assignedTo?: string;
}
