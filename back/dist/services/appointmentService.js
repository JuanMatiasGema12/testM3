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
exports.cancelAppointmentByIdService = exports.registerAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentService = void 0;
const AppointmentEntity_1 = require("../entities/AppointmentEntity");
const usersService_1 = require("./usersService");
const data_source_1 = require("../config/data-source");
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentRepository = yield data_source_1.AppointmentModel.find();
    return appointmentRepository;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield data_source_1.AppointmentModel.findOne({ where: { id } });
    if (!appointmentFound) {
        throw new Error(`La cita con el id: ${id} no se encontró`);
    }
    return appointmentFound;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const registerAppointmentService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ESTE ES EL APPOINTMENTDATA: ", appointmentData);
    const userFound = yield (0, usersService_1.getUserByIdService)(appointmentData.userId);
    console.log("ESTE ES EL USERFOUND: ", userFound);
    if (!userFound) {
        throw new Error(`El usuario con el id: ${appointmentData.userId} no existe.`);
    }
    const appointmentFound = yield data_source_1.AppointmentModel.findOne({
        where: {
            time: appointmentData.time,
            date: new Date(appointmentData.date),
            user: { id: userFound.id }
        }
    });
    console.log("ESTE ES EL APPOINTMENTFOUND: ", appointmentFound);
    if (appointmentFound) {
        throw new Error(`La cita con fecha: ${appointmentData.date} y hora: ${appointmentData.time}, ya existe para el usuario con el id: ${appointmentData.userId}`);
    }
    console.log("Estoy arriba del .create");
    const newAppointment = data_source_1.AppointmentModel.create({
        date: appointmentData.date,
        time: appointmentData.time,
        user: userFound,
        status: AppointmentEntity_1.Status.active
    });
    yield data_source_1.AppointmentModel.save(newAppointment);
    return newAppointment;
});
exports.registerAppointmentService = registerAppointmentService;
const cancelAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield data_source_1.AppointmentModel.findOne({ where: { id } });
    if (!appointmentFound) {
        throw new Error(`La cita con el id: ${id} no se encontró`);
    }
    appointmentFound.status = AppointmentEntity_1.Status.cancelled;
    yield data_source_1.AppointmentModel.save(appointmentFound);
});
exports.cancelAppointmentByIdService = cancelAppointmentByIdService;
