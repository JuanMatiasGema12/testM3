import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={Styles.notFoundContainer}>
            <h1>Página no encontrada</h1>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/" className={Styles.linkToHome}>Volver a Inicio</Link>
        </div>
    );
};

export default NotFound;

