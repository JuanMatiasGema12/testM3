import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/AppointmentEntity";
import moment from 'moment';



export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({


    validateAllowAppointment: function (date: Date, time: string): void {
        const [hours, minutes] = time.split(":").map(Number);
        const appointmentDate = moment(date).set({ hour: hours, minute: minutes, second: 0 });
    
        const now = moment();
    
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
    
    

    validateExistingAppointment: async function (userId: number, date: Date, time: string): Promise<void> {
        const [hours, minutes] = time.split(":").map(Number);
        const appointmentDateTime = moment(date)
            .set({ hour: hours, minute: minutes, second: 0, millisecond: 0 })
            .startOf('minute')
            .toDate();
    
        const appointmentFound = await this.findOne({
            where: { 
                user: { id: userId },
                date: appointmentDateTime 
            }
        });
    
        if (appointmentFound) {
            throw new Error(`La cita con fecha: ${moment(date).format('YYYY-MM-DD')} y hora: ${time}, ya existe para el usuario con el id: ${userId}`);
        }
    }

})