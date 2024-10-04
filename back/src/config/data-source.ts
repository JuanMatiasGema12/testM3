import { DataSource } from "typeorm"
import { User } from "../entities/UserEntity"
import { Appointment } from "../entities/AppointmentEntity"
import { Credential } from "../entities/CredentialEntity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "matiasgema123456",
    database: "demo_typeorm",
    //dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
})

export const UserModel = AppDataSource.getRepository(User)

export const AppointmentModel = AppDataSource.getRepository(Appointment)

export const CredentialModel = AppDataSource.getRepository(Credential)