import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100 })
  role: string; // Role field for RBAC (Role-Based Access Control)

  @Column({ length: 50 })
  phone: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'date', nullable: true })
  dob?: Date;
}
