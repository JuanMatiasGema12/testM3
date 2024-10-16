import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './NavBar.module.css'; 
import userLogo from '../images/userLogo.png';
import sonrisa from '../images/sonrisa.png';
import { logoutUser } from '../redux/userReducer'; 

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user);

    const handleLoginClick = () => {
        navigate('/Login');
    };

    const handleLogoutClick = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <div className={Styles.navbar}>
            <div className={Styles.navbarHeader}>
                <img src={sonrisa} alt="Page Icon" className={Styles.userIcon} />
                <h2> HappySmile</h2>
            </div>
            <ul className={Styles.navbarLinks}>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/appointments">APPOINTMENTS</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/agendar">AGENDAR APPOINTMENT</Link></li>
            </ul>
            <div className={Styles.navbarUser}>
                <img src={userLogo} alt="User Icon" className={Styles.userIcon} />
                {userId ? (
                    <p onClick={handleLogoutClick} style={{ cursor: 'pointer', color: '#FF0000', textDecoration: 'underline' }}>
                        Cerrar Sesión
                    </p>
                ) : (
                    <p onClick={handleLoginClick} style={{ cursor: 'pointer', color: '#007BFF', textDecoration: 'underline' }}>
                        Iniciar Sesión
                    </p>
                )}
            </div>
        </div>
    );
};

export default NavBar;
