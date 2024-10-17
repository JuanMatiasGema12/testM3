import { Request, Response } from "express";
import { AppointmentRegisterDTO } from "../dto/AppointmentDTO";
import { getAppointmentByIdService, getAppointmentService, registerAppointmentService, cancelAppointmentByIdService } from "../services/appointmentService";
import { handleError } from "./userController";

export const getAppointmentsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments = await getAppointmentService();
        res.status(200).json({
            message: "Listado de todos los turnos",
            data: appointments,
        });
    } catch (error) {
        handleError(error, res, "No se pudo obtener el listado de citas.")
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
        handleError(error, res, `No se pudo obtener el turno con el ID: ${id}`)
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
        handleError(error, res, "No se pudo registrar el turno. Intentelo de nuevo.")
    }
};

export const cancelAppointmentController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const {id} = req.params; 
    try {
        await cancelAppointmentByIdService(Number(id)); 
        res.status(200).json({
            message: `Turno con ID: ${id} cancelado`,
        });
    } catch (error) {
        handleError(error, res, `No se pudo cancelar el turno con el ID: ${id}`)
    }
};
