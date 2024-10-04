import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dto/AppointmentDTO";
import { getAppointmentByIdService, getAppointmentService, registerAppointmentService, cancelAppointmentByIdService } from "../services/appointmentService";

export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments = await getAppointmentService();
        res.status(200).json({
            message: "Listado de todos los turnos",
            data: appointments,
        });
    } catch (error) {
        res.status(400).json({
            message: "Hubo un error al obtener los turnos.",
            details: error,
        });
    }
};

export const getAppointmentByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    try {
        const appointment = await getAppointmentByIdService(id);
        res.status(200).json({
            message: `Turno con ID: ${id}`,
            data: appointment,
        });
    } catch (error) {
        res.status(400).json({
            message: `No se pudo obtener el turno con el ID: ${id}`,
            details: error,
        });
    }
};

export const createAppointmentController = async (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response): Promise<void> => {
    try {
        const newAppointment = await registerAppointmentService(req.body);
        res.status(200).json({
            message: "Nuevo turno registrado",
            data: newAppointment,
        });
    } catch (error) {
        res.status(400).json({
            message: "Hubo un error al registrar el turno.",
            details: error,
        });
    }
};

export const cancelAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const id = parseInt(req.params.id); 
    try {
        await cancelAppointmentByIdService(id); 
        res.status(200).json({
            message: `Turno con ID: ${id} cancelado`,
        });
    } catch (error) {
        res.status(400).json({
            message: `No se pudo cancelar el turno con el ID: ${id}`,
            details: error,
        });
    }
};
