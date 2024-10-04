import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  credentialId: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;
}
