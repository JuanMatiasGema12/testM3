import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './UserEntity'; 

export enum Status {
  active = 'active',
  cancelled = 'cancelled',
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @ManyToOne(() => User, user => user.appointments)
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.active,
  })
  status: Status;
}
