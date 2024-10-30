
import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.aboutContent}>
            <h1 className={styles.aboutTitle}>Sobre Nosotros</h1>
            <p className={styles.aboutText}>
                Nuestro equipo está formado por dentistas experimentados y dedicados a proporcionar la mejor atención dental.
            </p>
            <h2>Nuestra Filosofía</h2>
            <p className={styles.aboutText}>
                Creemos en la atención personalizada y en hacer que cada visita sea lo más cómoda posible.
            </p>
            <h2>Horarios de Atención</h2>
            <p className={styles.aboutText}>
                Lunes - Viernes: 08:00 HS a 18:00 HS<br />
            </p>
        </div>
    );
};

export default About;
