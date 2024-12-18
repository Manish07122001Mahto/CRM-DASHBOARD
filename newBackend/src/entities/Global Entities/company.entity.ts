import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/auth/enums/roles.enum';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  company_id: number; // Primary Key

  @Column({ length: 255 })
  companyName: string; // Name of the company

  @Column({ length: 255, unique: true })
  email: string; // Email address of the company

  @Column({ length: 20 })
  phone: string; // Phone number

  @Column({ length: 255 })
  password: string; // Password for company access (hashed)

  @Column({ type: 'enum', enum: Role, default: Role.SUPERADMIN })
  role: Role;

  @Column({ length: 255, nullable: true })
  location?: string; // Optional: Company location

  @Column({ length: 500, nullable: true })
  companyLogoUrl?: string; // Optional: URL of the company logo

  @Column({ type: 'text', nullable: true })
  notes?: string; // Additional notes about the company

  @Column({ type: 'jsonb', nullable: true })
  additionalInfo?: Record<string, any>; // for custom fields

  @CreateDateColumn()
  createdAt: Date; // Automatically set at creation

  @UpdateDateColumn()
  updatedAt: Date; // Automatically set on updates
}
