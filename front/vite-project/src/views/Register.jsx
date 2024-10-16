import { useFormik } from "formik";
import { validateRegisterForm } from "../helpers/validate";
import Styles from './Register.module.css';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import{ useDispatch}from "react-redux"
import { registerUser } from "../redux/userReducer";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            birthdate: "",
            nDni: "",
            username: "",
            password: ""
        },
        validate: validateRegisterForm,
        onSubmit: async (values) => {
            try {
                await dispatch(registerUser(values)).unwrap()
                navigate("/login")
                Swal.fire({
                    icon: "success",
                    title: "User registered succesfully"
                })
            } catch (err) {
                if (err.response && err.response.data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: err.response.data.details
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error desconocido",
                        text: "Intente nuevamente."
                    });
                }
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className={Styles.formContainer}>
            <h2 className={Styles.formTitle}>Formulario de Registro</h2>

            <div className={Styles.inputGroup}>
                <label htmlFor="name" className={Styles.label}>Nombre: </label>
                <input 
                    type="text" 
                    id="name"
                    name="name" 
                    placeholder="Tu nombre completo" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className={formik.errors.name && formik.touched.name ? Styles.inputError : Styles.input}
                />
                {formik.errors.name && formik.touched.name ? (
                    <span className={Styles.errorMessage}>{formik.errors.name}</span>
                ) : null}
            </div>

            <div className={Styles.inputGroup}>
                <label htmlFor="email" className={Styles.label}>Email: </label>
                <input 
                    type="email" 
                    id="email"
                    name="email" 
                    placeholder="tuemail@mail.com" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={formik.errors.email && formik.touched.email ? Styles.inputError : Styles.input}
                />
                {formik.errors.email && formik.touched.email ? (
                    <span className={Styles.errorMessage}>{formik.errors.email}</span>
                ) : null}
            </div>

            <div className={Styles.inputGroup}>
                <label htmlFor="birthdate" className={Styles.label}>Fecha de Nacimiento: </label>
                <input 
                    type="date" 
                    id="birthdate"
                    name="birthdate" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthdate}
                    className={formik.errors.birthdate && formik.touched.birthdate ? Styles.inputError : Styles.input}
                />
                {formik.errors.birthdate && formik.touched.birthdate ? (
                    <span className={Styles.errorMessage}>{formik.errors.birthdate}</span>
                ) : null}
            </div>

            <div className={Styles.inputGroup}>
                <label htmlFor="nDni" className={Styles.label}>Número de DNI: </label>
                <input 
                    type="number" 
                    id="nDni"
                    name="nDni" 
                    placeholder="Tu número de DNI" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nDni}
                    className={formik.errors.nDni && formik.touched.nDni ? Styles.inputError : Styles.input}
                />
                {formik.errors.nDni && formik.touched.nDni ? (
                    <span className={Styles.errorMessage}>{formik.errors.nDni}</span>
                ) : null}
            </div>

            <div className={Styles.inputGroup}>
                <label htmlFor="username" className={Styles.label}>Username: </label>
                <input 
                    type="text" 
                    id="username"
                    name="username" 
                    placeholder="Elige un nombre de usuario" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className={formik.errors.username && formik.touched.username ? Styles.inputError : Styles.input}
                />
                {formik.errors.username && formik.touched.username ? (
                    <span className={Styles.errorMessage}>{formik.errors.username}</span>
                ) : null}
            </div>


            <div className={Styles.inputGroup}>
                <label htmlFor="password" className={Styles.label}>Password: </label>
                <input 
                    type="password" 
                    id="password"
                    name="password" 
                    placeholder="******" 
                    onChange={(e) => {
                        formik.handleChange(e);
                        formik.validateField("password"); 
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={formik.errors.password  ? Styles.inputError : Styles.input}
                />
                {formik.errors.password ? (
                    <span className={Styles.errorMessage}>{formik.errors.password}</span>
                ) : null}
            </div>

            <button 
                type="submit" 
                className={formik.isValid && formik.dirty ? Styles.submitButton : Styles.disabledButton} 
                disabled={!formik.isValid || !formik.dirty}
            >
                Submit
            </button>

            <span 
                className={Styles.linkText} 
                onClick={() => navigate('/login')}
                style={{ cursor: "pointer", color: "#007BFF", textDecoration: "underline", marginTop: "10px" }}
            >
                Ya tienes una cuenta? Inicia sesión aquí
            </span>
        </form>
    );
};

export default Register;
