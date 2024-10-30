import { useEffect, useState } from 'react';
import Styles from './AppointmentCard.module.css';
import Swal from 'sweetalert2';
import { useUser } from '../../context/UserContext';

const TurnoCard = (props) => {
    const [turno, setTurno] = useState({});
    const { cancelAppointment } = useUser();

    const handleClick = (id) => {
        Swal.fire({
            title: `¿Quieres cancelar el turno con el ID: ${id}?`,
            icon: "warning",
            confirmButtonText: 'Continuar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
        }).then((res) => {
            if (res.isConfirmed) {
                cancelAppointment(id)
                .then((res) => {
                    Swal.fire({
                        title: res.message,
                        icon: "success"
                    });
                    setTurno({ ...turno, status: 'cancelled' });
                })
                .catch((err) => {
                    Swal.fire({
                        title: err.response.data.details,
                        icon: "error"
                    });
                });
            }
        });
    };

    useEffect(() => {
        setTurno(props.turno);
    }, [props.turno]);

    return (
        <div className={Styles.card}>
            <h3>Turno #{turno.id}</h3>
            <h3>{turno.date}</h3>
            <p>{turno.time}</p>
            <p>{turno.userId}</p>
            <div>
                <p className={`${Styles.status} ${turno.status === 'active' ? Styles.active : Styles.cancelled}`}>{turno.status}</p>
                <button onClick={() => handleClick(turno.id)} className={Styles.button_status} disabled={turno.status !== 'active'}>
                    Cancel Appointment
                </button>
            </div>
        </div>
    );
};

export default TurnoCard;
