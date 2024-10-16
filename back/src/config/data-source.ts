
import { User } from "../entities/UserEntity"
import { Credential } from "../entities/CredentialEntity"


import { DataSource } from "typeorm";
import { DB_HOST, DB_LOGIN, DB_NAME, DB_SYNC, DB_USERNAME, PASSWORD_DB } from "./envs";

export const AppDataSource = new DataSource({
    type:  "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USERNAME,
    password: PASSWORD_DB,
    database: DB_NAME,
    synchronize: DB_SYNC,
    logging: DB_LOGIN,
    dropSchema: true,
    entities: ["src/entities/*/.ts"],
    subscribers: [],
    migrations: [],
})

export const UserModel = AppDataSource.getRepository(User)

export const CredentialModel = AppDataSource.getRepository(Credential)
