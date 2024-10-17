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

  @Column({type: "date", nullable:false})
  date: Date;

  @Column({type: "varchar", length: 5, nullable:false})
  time: string;

  @ManyToOne(() => User, user => user.appointments)
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.active,
    nullable:false
  })
  status: Status;
}
