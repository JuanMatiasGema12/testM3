


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
        type: "varchar",
        length: 100,
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable:false
    })
    email: string;

    @Column({type:"date", nullable:false})
    birthdate: Date;

    @Column({type: 'integer', unique: true, nullable:false})
    nDni: number;

    @OneToMany(()=>Appointment ,(appointments)=> appointments.user)
    @JoinColumn()
    appointments: Appointment

    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential
}
