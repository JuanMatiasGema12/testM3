


import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Appointment } from './AppointmentEntity';
import { Credential } from './CredentialEntity';

@Entity({
    name : "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    birthdate: Date;

    @Column({type: 'integer', unique: true})
    nDni: number;

    @OneToMany(()=>Appointment ,(appointments)=> appointments.user)
    @JoinColumn()
    appointments: Appointment

    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential
}
