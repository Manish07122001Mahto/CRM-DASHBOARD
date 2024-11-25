import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  company: string;

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
}
