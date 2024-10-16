import { validateLoginForm } from "../helpers/validate";
import { useFormik } from "formik";
import Styles from './Login.module.css';
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.user)

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validate: validateLoginForm,
        onSubmit: async (values) => {  
            try {
                await dispatch(loginUser(values)).unwrap()
                navigate("/")
                Swal.fire({
                    icon: "success",
                    title: "User logged succesfully"
                })
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: `${error.response.data.details}`,
                    text: "Try again."
                })
            } 
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className={Styles.formContainer}>
            <h2 className={Styles.formTitle}>Formulario de Login</h2>
            
            <div className={Styles.inputGroup}>
                <label htmlFor="userName" className={Styles.label}>Username: </label>
                <input 
                    type="text" 
                    id="userName" 
                    name="userName"
                    placeholder="Type username..." 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName} 
                    className={formik.errors.userName && formik.touched.userName ? Styles.inputError : Styles.input}
                />
                {formik.errors.userName && formik.touched.userName ? (
                    <span className={Styles.errorMessage}>{formik.errors.userName}</span>
                ) : null}
            </div>

            <div className={Styles.inputGroup}>
                <label htmlFor="password" className={Styles.label}>Password: </label>
                <input 
                    type="password" 
                    id="password"
                    name="password" 
                    placeholder="******"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={formik.errors.password && formik.touched.password ? Styles.inputError : Styles.input}
                />
                {formik.errors.password && formik.touched.password ? (
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
                onClick={() => navigate('/register')} 
                style={{ cursor: "pointer", color: "#007BFF", textDecoration: "underline", marginTop: "10px" }}
            >
                No tienes una cuenta? Regístrate aquí
            </span>
        </form>
    );
};

export default Login;
