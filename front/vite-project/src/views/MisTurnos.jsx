import { useEffect, useState } from 'react';
import Styles from "./MisTurnos.module.css";
import TurnoCard from '../components/AppointmentCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../redux/userReducer';

const MisTurnos = () => {
  const [loading, setLoading] = useState(true); 
  const userAppointments = useSelector((state) => state.userAppointments);
  const userId = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getAppointments(userId));
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, [dispatch, userId]);

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
          {userAppointments.length > 0 ? (
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
