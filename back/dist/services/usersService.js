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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = exports.getUserByIdService = exports.getUsersService = void 0;
const credentialService_1 = require("./credentialService");
const data_source_1 = require("../config/data-source");
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.UserModel.find({ relations: ['appointments'] });
    return users;
});
exports.getUsersService = getUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield data_source_1.UserModel.findOne({ where: { id } });
    if (!userFound) {
        throw new Error(`El usuario con el id: ${id} no fue encontrado.`);
    }
    else
        return userFound;
});
exports.getUserByIdService = getUserByIdService;
const registerUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const UserCredentials = yield (0, credentialService_1.getCredentialService)(entityManager, userData.username, userData.password);
        console.log(UserCredentials);
        const newUser = data_source_1.UserModel.create({
            name: userData.name,
            email: userData.email,
            birthdate: new Date(userData.birthdate),
            nDni: userData.nDni,
            credential: UserCredentials
        });
        yield entityManager.save(newUser);
        console.log(newUser);
    }));
});
exports.registerUserService = registerUserService;
const loginUserService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ESTE ES EL LOGINDATA.USERNAME: ", loginData.userName);
    const credential = yield (0, credentialService_1.checkUserData)(loginData.userName, loginData.password);
    const userFound = yield data_source_1.UserModel.findOne({
        where: {
            credential: { credentialId: credential }
        },
        relations: ['credential']
    });
    if (!userFound) {
        throw new Error("El usuario o la contraseña son incorrectos.");
    }
    console.log(userFound);
    return userFound;
});
exports.loginUserService = loginUserService;
