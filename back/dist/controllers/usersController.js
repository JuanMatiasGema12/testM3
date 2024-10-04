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
exports.deleteUserController = exports.createUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const usersService_1 = require("../services/usersService");
const getUsersController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getUsersService)();
        res.status(200).json({
            message: "Obtener el listado con todos los usuarios",
            data: users
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Hubo un error en la aplicación",
            details: error
        });
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        res.status(200).json({
            message: `Obtener el usuario con el ID: ${id}`,
            data: { users: `aqui esta el usuario buscado ${id}` }
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Hubo un error en la aplicación",
            details: error
        });
    }
});
exports.getUserByIdController = getUserByIdController;
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, active } = req.body;
    const newUser = yield (0, usersService_1.createUserService)({ name, email, active });
    res.status(201).json(newUser);
});
exports.createUserController = createUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield (0, usersService_1.deleteUserService)(id);
    res.status(200).json({ message: "Eliminado correctamente." });
});
exports.deleteUserController = deleteUserController;
