"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialModel = exports.AppointmentModel = exports.UserModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("../entities/UserEntity");
const AppointmentEntity_1 = require("../entities/AppointmentEntity");
const CredentialEntity_1 = require("../entities/CredentialEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "matiasgema123456",
    database: "demo_typeorm",
    //dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [UserEntity_1.User, AppointmentEntity_1.Appointment, CredentialEntity_1.Credential],
    subscribers: [],
    migrations: [],
});
exports.UserModel = exports.AppDataSource.getRepository(UserEntity_1.User);
exports.AppointmentModel = exports.AppDataSource.getRepository(AppointmentEntity_1.Appointment);
exports.CredentialModel = exports.AppDataSource.getRepository(CredentialEntity_1.Credential);
