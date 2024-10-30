import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../helpers/validate';
import { useUser } from '../../context/UserContext';
import Swal from 'sweetalert2';
import Styles from './Login.module.css';

const Login = () => {
    const { loginUser } = useUser();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validate: validateLoginForm,
        onSubmit: async (values) => {
            try {
                await loginUser(values);
                await Swal.fire({
                    icon: 'success',
                    title: 'User logged successfully',
                });
                navigate('/');
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: error.response?.data?.details,
                });
            }
        },
    });

    const { errors, touched } = formik;

    return (
        <div className={Styles.formContainer}>
            <h2 className={Styles.formTitle}>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={Styles.inputGroup}>
                    <label className={Styles.label} htmlFor="userName">Username</label>
                    <input
                        className={`${Styles.input} ${touched.userName && errors.userName ? Styles.inputError : ''}`}
                        id="userName"
                        type="text"
                        {...formik.getFieldProps('userName')}
                    />
                    {touched.userName && errors.userName && <div className={Styles.errorMessage}>{errors.userName}</div>}
                </div>

                <div className={Styles.inputGroup}>
                    <label className={Styles.label} htmlFor="password">Password</label>
                    <input
                        className={`${Styles.input} ${touched.password && errors.password ? Styles.inputError : ''}`}
                        id="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {touched.password && errors.password && <div className={Styles.errorMessage}>{errors.password}</div>}
                </div>

                <button 
                type="submit" 
                className={formik.isValid && formik.dirty ? Styles.submitButton : Styles.disabledButton} 
                disabled={!formik.isValid || !formik.dirty}
            >
                Log In
            </button>
                <br />
                <br />
                <span 
                className={Styles.linkText} 
                onClick={() => navigate('/register')}
                style={{ cursor: "pointer", color: "#007BFF", textDecoration: "underline", marginTop: "10px" }}
            >
                No tienes una cuenta? Registrate aquí
            </span>
            </form>
        </div>
    );
};

export default Login;
