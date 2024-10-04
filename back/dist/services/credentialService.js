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
exports.checkUserData = exports.getCredentialService = void 0;
const data_source_1 = require("../config/data-source");
const passwordHash_1 = require("../utils/passwordHash");
const getCredentialService = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCredential = yield data_source_1.CredentialModel.findOne({ where: { username } });
    if (!existingCredential) {
        const hashedPassword = yield (0, passwordHash_1.hashPassword)(password);
        const newCredential = data_source_1.CredentialModel.create({
            username,
            password: hashedPassword,
        });
        yield entityManager.save(newCredential);
        return newCredential;
    }
    else {
        throw new Error('Ya existe un usuario registrado con este nombre de usuario.');
    }
});
exports.getCredentialService = getCredentialService;
const checkUserData = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ESTE ES EL USERNAME: ", username);
    const usernameFound = yield data_source_1.CredentialModel.findOne({ where: { username } });
    console.log("ESTE ES EL USERFOUND: ", usernameFound);
    if (!usernameFound) {
        throw new Error('El usuario o la contraseña son incorrectos.');
    }
    console.log("PASÉ EL IF DEL USERNAME.");
    const passwordCompared = yield (0, passwordHash_1.comparePassword)(password, usernameFound.password);
    if (!passwordCompared) {
        throw new Error('El usuario o la contraseña son incorrectos.');
    }
    console.log("PASÉ EL IF DE LAS PASSWORDS.");
    return usernameFound.credentialId;
});
exports.checkUserData = checkUserData;
