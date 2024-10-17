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
exports.AppointmentRepository = void 0;
const data_source_1 = require("../config/data-source");
const AppointmentEntity_1 = require("../entities/AppointmentEntity");
const moment_1 = __importDefault(require("moment"));
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(AppointmentEntity_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const [hours, minutes] = time.split(":").map(Number);
        const appointmentDate = (0, moment_1.default)(date).set({ hour: hours, minute: minutes, second: 0 });
        const now = (0, moment_1.default)();
        const diffMilliseconds = appointmentDate.diff(now);
        const diffHours = diffMilliseconds / (1000 * 60 * 60);
        if (diffHours < 24) {
            throw new Error("Deben pasar al menos 24 horas para poder agendar un turno.");
        }
        if (appointmentDate.isBefore(now)) {
            throw new Error("No se pueden agendar citas con fechas pasadas.");
        }
        const dayOfWeek = appointmentDate.day();
        if (dayOfWeek === 6 || dayOfWeek === 0) {
            throw new Error("No se pueden agendar turnos los fines de semana.");
        }
        if (hours < 8 || hours > 18) {
            throw new Error("No se pueden agendar turnos antes de las 8hs o después de las 18hs.");
        }
    },
    validateExistingAppointment: function (userId, date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hours, minutes] = time.split(":").map(Number);
            const appointmentDateTime = (0, moment_1.default)(date)
                .set({ hour: hours, minute: minutes, second: 0, millisecond: 0 })
                .startOf('minute')
                .toDate();
            const appointmentFound = yield this.findOne({
                where: {
                    user: { id: userId },
                    date: appointmentDateTime
                }
            });
            if (appointmentFound) {
                throw new Error(`La cita con fecha: ${(0, moment_1.default)(date).format('YYYY-MM-DD')} y hora: ${time}, ya existe para el usuario con el id: ${userId}`);
            }
        });
    }
});
