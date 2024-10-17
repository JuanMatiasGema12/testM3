import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  credentialId: number;

  @Column({nullable:false, unique: true})
  username: string;

  @Column({nullable:false})
  password: string;
}
