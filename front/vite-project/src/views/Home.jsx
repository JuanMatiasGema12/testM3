
import React from 'react';
import Styles from './Home.module.css'; 

const Home = () => {
    return (
        <div className={Styles.homeContent}>
            <h1 className={Styles.welcomeMessage}>¡Bienvenido a Nuestra Clínica Dental!</h1>
            <p className={Styles.serviceDescription}>
                Ofrecemos servicios dentales de alta calidad para toda la familia.
            </p>
            <h2>Testimonios</h2>
            <div className={Styles.testimonial}>“Excelente atención y resultados, estoy muy satisfecho!”</div>
            <div className={Styles.testimonial}>“El mejor dentista que he tenido, muy recomendado!”</div>
        </div>
    );
};

export default Home;
