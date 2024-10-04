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
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
// Función para hashear una contraseña
function hashPassword(plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10; // Número de veces que se aplica el algoritmo de hashing
        const hashedPassword = yield bcrypt_1.default.hash(plainPassword, saltRounds);
        return hashedPassword;
    });
}
function comparePassword(plainPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcrypt_1.default.compare(plainPassword, hashedPassword);
        return isMatch;
    });
}