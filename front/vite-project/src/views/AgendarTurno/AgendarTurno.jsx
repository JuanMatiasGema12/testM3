import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { validateAppointmentForm } from '../../helpers/validate';
import { useUser } from '../../context/UserContext';
import Swal from 'sweetalert2';
import Styles from './AgendarTurno.module.css';

const AgendarTurno = () => {
    const { addAppointment, userId } = useUser();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
        },
        validate: validateAppointmentForm,
        onSubmit: async (values) => {
            try {
                const data = {
                    ...values,
                    userId: userId
                };
                const confirmed = await Swal.fire({
                    title: '¿Confirmar Turno?',
                    text: `Fecha: ${values.date}\nHora: ${values.time}`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, confirmar',
                    cancelButtonText: 'Cancelar'
                });

                if (confirmed.isConfirmed) {
                    await addAppointment(data);
                    
                    await Swal.fire({
                        icon: 'success',
                        title: 'Turno confirmado',
                        text: `Su turno para el ${values.date} a las ${values.time} fue registrado con éxito.`,
                        confirmButtonText: 'Aceptar'
                    });
                    navigate('/appointments');
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.details || error.message || "Ha ocurrido un error.",
                });
            }
        },
    });

    const { errors, touched } = formik;
    const isButtonDisabled = Object.keys(errors).length > 0;

    return (
        <div className={Styles.formContainer}>
            <h2 className={Styles.formTitle}>Agendar Turno</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={Styles.inputGroup}>
                    <label className={Styles.label} htmlFor="date">Fecha</label>
                    <input
                        className={`${Styles.input} ${touched.date && errors.date ? Styles.inputError : ''}`}
                        id="date"
                        type="date"
                        {...formik.getFieldProps('date')}
                    />
                    {touched.date && errors.date && <div className={Styles.errorMessage}>{errors.date}</div>}
                </div>

                <div className={Styles.inputGroup}>
                    <label className={Styles.label} htmlFor="time">Hora</label>
                    <input
                        className={`${Styles.input} ${touched.time && errors.time ? Styles.inputError : ''}`}
                        id="time"
                        type="time"
                        {...formik.getFieldProps('time')}
                    />
                    {touched.time && errors.time && <div className={Styles.errorMessage}>{errors.time}</div>}
                </div>

                <button className={isButtonDisabled ? Styles.disabledButton : Styles.submitButton} type="submit" disabled={isButtonDisabled}>
                    Agendar Turno
                </button>

                {isButtonDisabled && (
                    <div>
                        <h4>Por favor completa los siguientes campos:</h4>
                        <ul>
                            {errors.date && <li>Fecha</li>}
                            {errors.time && <li>Hora</li>}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AgendarTurno;

