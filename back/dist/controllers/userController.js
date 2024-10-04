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
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const usersService_1 = require("../services/usersService");
const handleError = (error, res, defaultMessage) => {
    const errorMessage = {
        message: defaultMessage,
        details: error instanceof Error ? error.message : "Error desconocido"
    };
    res.status(400).json(errorMessage);
};
//Consultar sobre este detalle => (_req).
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usersService_1.getUsersService)();
        res.status(200).json({
            message: "Éste es el listado con todos los usuarios: ",
            data: users
        });
    }
    catch (error) {
        handleError(error, res, "No se pudo obtener el listado de usuarios.");
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const response = yield (0, usersService_1.getUserByIdService)(id);
        res.status(200).json({
            message: `Obtener el usuario con el ID: ${id}`,
            data: response
        });
    }
    catch (error) {
        handleError(error, res, "No se pudo obtener el usuario con el ID ingresado.");
    }
});
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, usersService_1.registerUserService)(req.body);
        res.status(200).json({
            message: "Usuario registrado con éxito.",
        });
    }
    catch (error) {
        handleError(error, res, "No se pudo realizar el registro del usuario. Intentelo nuevamente");
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("ESTE ES EL REQ.BODY: ", req.body);
        const loginUser = yield (0, usersService_1.loginUserService)(req.body);
        res.status(200).json({
            message: "El usuario se logueó con exito.",
            data: { loginUser }
        });
    }
    catch (error) {
        handleError(error, res, "No se pudo realizar el login del usuario. Intentelo nuevamente");
    }
});
exports.loginUserController = loginUserController;
