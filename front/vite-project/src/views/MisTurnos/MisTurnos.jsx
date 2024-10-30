import { useEffect, useState } from 'react';
import Styles from "./MisTurnos.module.css";
import TurnoCard from '../../components/AppointmentCard/AppointmentCard';
import { useUser } from "../../context/UserContext";

const MisTurnos = () => {
  const [loading, setLoading] = useState(true);
  const { userAppointments, userId, getAppointments } = useUser();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (userId && loading) { 
        await getAppointments(userId);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId, getAppointments, loading]);

  if (loading) {
    return (
      <div className={Styles.loadingContainer}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={Styles.content}>
      <div className={Styles.container}>
        <div className={Styles.cardsContainer}>
          {userAppointments && userAppointments.length > 0 ? (
            userAppointments.map(turno => (
              <TurnoCard turno={turno} key={turno.id} />
            ))
          ) : (
            <div>No hay turnos disponibles.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisTurnos;
