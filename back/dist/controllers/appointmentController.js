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
exports.cancelAppointmentController = exports.createAppointmentController = exports.getAppointmentByIdController = exports.getAppointmentsController = void 0;
const appointmentService_1 = require("../services/appointmentService");
const userController_1 = require("./userController");
const getAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentService_1.getAppointmentService)();
        res.status(200).json({
            message: "Listado de todos los turnos",
            data: appointments,
        });
    }
    catch (error) {
        (0, userController_1.handleError)(error, res, "No se pudo obtener el listado de citas.");
    }
});
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const appointment = yield (0, appointmentService_1.getAppointmentByIdService)(id);
        res.status(200).json({
            message: `Turno con ID: ${id}`,
            data: appointment,
        });
    }
    catch (error) {
        (0, userController_1.handleError)(error, res, `No se pudo obtener el turno con el ID: ${id}`);
    }
});
exports.getAppointmentByIdController = getAppointmentByIdController;
const createAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = yield (0, appointmentService_1.registerAppointmentService)(req.body);
        res.status(200).json({
            message: "Nuevo turno registrado",
            data: newAppointment,
        });
    }
    catch (error) {
        (0, userController_1.handleError)(error, res, "No se pudo registrar el turno. Intentelo de nuevo.");
    }
});
exports.createAppointmentController = createAppointmentController;
const cancelAppointmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, appointmentService_1.cancelAppointmentByIdService)(Number(id));
        res.status(200).json({
            message: `Turno con ID: ${id} cancelado`,
        });
    }
    catch (error) {
        (0, userController_1.handleError)(error, res, `No se pudo cancelar el turno con el ID: ${id}`);
    }
});
exports.cancelAppointmentController = cancelAppointmentController;
