import { Appointment, Status } from '../entities/AppointmentEntity';
import { AppointmentRegisterDTO } from '../dto/AppointmentDTO';
import { getUserByIdService } from './usersService';
import { AppointmentModel } from '../config/data-source';

export const getAppointmentService = async (): Promise<Appointment[]> => {
    const appointmentRepository = await AppointmentModel.find()
    return appointmentRepository
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment | undefined> => {
    const appointmentFound = await AppointmentModel.findOne({where: {id}});

    if (!appointmentFound) {
        throw new Error(`La cita con el id: ${id} no se encontró`);
    }
    return appointmentFound;
};

export const registerAppointmentService = async (appointmentData: AppointmentRegisterDTO): Promise<Appointment> => {
    console.log("ESTE ES EL APPOINTMENTDATA: ",appointmentData)
    const userFound = await getUserByIdService(appointmentData.userId);
    console.log("ESTE ES EL USERFOUND: ",userFound)
    

    if (!userFound) {
        throw new Error(`El usuario con el id: ${appointmentData.userId} no existe.`);
    }

    const appointmentFound = await AppointmentModel.findOne({
        where: {
            time: appointmentData.time,
            date: new Date(appointmentData.date),
            user: {id: userFound.id}
        }
    });

    console.log("ESTE ES EL APPOINTMENTFOUND: ", appointmentFound)

    if (appointmentFound) {
        throw new Error(`La cita con fecha: ${appointmentData.date} y hora: ${appointmentData.time}, ya existe para el usuario con el id: ${appointmentData.userId}`);
    }

    console.log("Estoy arriba del .create")
    const newAppointment = AppointmentModel.create({
        date: appointmentData.date,
        time: appointmentData.time,
        user: userFound,
        status: Status.active
    });

    await AppointmentModel.save(newAppointment);

    return newAppointment;
};

export const cancelAppointmentByIdService = async (id: number): Promise<void> => {
    const appointmentFound = await AppointmentModel.findOne({where: {id}});

    if (!appointmentFound) {
        throw new Error(`La cita con el id: ${id} no se encontró`);
    }

    appointmentFound.status = Status.cancelled;

    await AppointmentModel.save(appointmentFound);
};
