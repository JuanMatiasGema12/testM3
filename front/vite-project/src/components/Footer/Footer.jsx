import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2024 HappySmile - Todos los derechos reservados.</p>
        <p>Contacto: happySmile@mail.com | Teléfono: +54 9 221 123-4567</p>
      </div>
    </footer>
  );
};

export default Footer;
