"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = exports.getUserByIdService = exports.getUsersService = void 0;
const credentialService_1 = require("./credentialService");
const data_source_1 = require("../config/data-source");
const UserEntity_1 = require("../entities/UserEntity");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.UserModel.find({ relations: ['appointments'] });
    return users;
});
exports.getUsersService = getUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield data_source_1.UserModel.findOne({ where: { id }, relations: ['appointments'] });
    if (!userFound) {
        throw new Error(`El usuario con el id: ${id} no fue encontrado.`);
    }
    else
        return userFound;
});
exports.getUserByIdService = getUserByIdService;
const registerUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userFoundEmail = yield UserRepository_1.default.findOne({
        where: {
            email: userData.email,
        }
    });
    if (userFoundEmail) {
        throw new Error("Ya existe un usuario registrado con este email.");
    }
    const userFoundDni = yield UserRepository_1.default.findOne({
        where: {
            nDni: userData.nDni,
        }
    });
    if (userFoundDni) {
        throw new Error("Ya existe un usuario registrado con este DNI.");
    }
    const result = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const UserCredentials = yield (0, credentialService_1.getCredentialService)(entityManager, userData.username, userData.password);
        const newUser = entityManager.create(UserEntity_1.User, {
            name: userData.name,
            email: userData.email,
            birthdate: new Date(userData.birthdate),
            nDni: userData.nDni,
            credential: UserCredentials
        });
        yield entityManager.save(newUser);
    }));
    return {
        message: "Usuario creado con exito.",
        newUser: result
    };
});
exports.registerUserService = registerUserService;
const loginUserService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = yield (0, credentialService_1.checkUserData)(loginData.userName, loginData.password);
    const userFound = yield data_source_1.UserModel.findOne({
        where: {
            credential: { credentialId: credential }
        },
        relations: ["appointments"]
    });
    if (!userFound) {
        throw new Error("El usuario o la contraseña son incorrectos.");
    }
    return userFound;
});
exports.loginUserService = loginUserService;
