import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Activity } from './activity.entity';
import { Deal } from './deal.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  contact_id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  poc: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  source?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  industry?: string;

  @Column({ type: 'text', nullable: true })
  services?: string;

  @Column({ nullable: true })
  assignee?: string;

  @Column({ type: 'text', nullable: true })
  note?: string;

  // for activity.entity.ts
  @OneToMany(() => Activity, (activity) => activity.contact)
  activities: Activity[];

  // for deals.entity.ts
  @OneToMany(() => Deal, (deal) => deal.contact)
  deals: Deal[];
}
