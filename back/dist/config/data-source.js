"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = exports.CredentialModel = exports.UserModel = exports.AppDataSource = void 0;
const UserEntity_1 = require("../entities/UserEntity");
const AppointmentEntity_1 = require("../entities/AppointmentEntity");
const CredentialEntity_1 = require("../entities/CredentialEntity");
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USERNAME,
    password: envs_1.PASSWORD_DB,
    database: envs_1.DB_NAME,
    synchronize: envs_1.DB_SYNC,
    logging: envs_1.DB_LOGIN,
    dropSchema: true,
    entities: ["src/entities/**/*.ts"],
    subscribers: [],
    migrations: [],
});
exports.UserModel = exports.AppDataSource.getRepository(UserEntity_1.User);
exports.CredentialModel = exports.AppDataSource.getRepository(CredentialEntity_1.Credential);
exports.AppointmentModel = exports.AppDataSource.getRepository(AppointmentEntity_1.Appointment);
