import { Appointment, Status } from '../entities/AppointmentEntity';
import { AppointmentRegisterDTO } from '../dto/AppointmentDTO';
import { getUserByIdService } from './usersService';
import { AppointmentRepository } from '../repositories/AppointmentRepository';

export const getAppointmentService = async (): Promise<Appointment[]> => {
    const appointmentRepository = await AppointmentRepository.find()
    return appointmentRepository
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment | undefined> => {
    const appointmentFound = await AppointmentRepository.findOne({where: {id}});

    if (!appointmentFound) {
        throw new Error(`La cita con el id: ${id} no se encontró`);
    }
    return appointmentFound;
};

export const registerAppointmentService = async (appointment: AppointmentRegisterDTO): Promise<Appointment> => {

    await getUserByIdService(appointment.userId);

    AppointmentRepository.validateAllowAppointment(appointment.date, appointment.time);

    await AppointmentRepository.validateExistingAppointment(appointment.userId, appointment.date, appointment.time);

    const newAppointment: Appointment = AppointmentRepository.create({
        date: appointment.date,
        time: appointment.time,
        user: { id: appointment.userId },
    });

    return await AppointmentRepository.save(newAppointment);
};

export const cancelAppointmentByIdService = async (id: number): Promise<void> => {
    const appointmentFound = await AppointmentRepository.findOneBy( {id} );

    if (!appointmentFound) {
        throw new Error(`La cita con el id: ${id} no se encontró`);
    }

    appointmentFound.status = Status.cancelled;

    await AppointmentRepository.save(appointmentFound);
    
};
