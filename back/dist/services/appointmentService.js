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
const AppointmentRepository_1 = require("../repositories/AppointmentRepository");
const getAppointmentService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentRepository = yield AppointmentRepository_1.AppointmentRepository.find();
    return appointmentRepository;
});
exports.getAppointmentService = getAppointmentService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield AppointmentRepository_1.AppointmentRepository.findOne({ where: { id } });
    if (!appointmentFound) {
        throw new Error(`La cita con el id: ${id} no se encontró`);
    }
    return appointmentFound;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const registerAppointmentService = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, usersService_1.getUserByIdService)(appointment.userId);
    AppointmentRepository_1.AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time);
    yield AppointmentRepository_1.AppointmentRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time);
    const newAppointment = AppointmentRepository_1.AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: { id: appointment.userId },
    });
    return yield AppointmentRepository_1.AppointmentRepository.save(newAppointment);
});
exports.registerAppointmentService = registerAppointmentService;
const cancelAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield AppointmentRepository_1.AppointmentRepository.findOneBy({ id });
    if (!appointmentFound) {
        throw new Error(`La cita con el id: ${id} no se encontró`);
    }
    appointmentFound.status = AppointmentEntity_1.Status.cancelled;
    yield AppointmentRepository_1.AppointmentRepository.save(appointmentFound);
});
exports.cancelAppointmentByIdService = cancelAppointmentByIdService;
