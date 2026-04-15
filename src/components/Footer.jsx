import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        

        <p style={styles.text}>
          © {new Date().getFullYear()} All Rights Reserved
        </p>

        <p style={styles.text}>
          Developed by Hiren Kanzariya
        </p>

      </div>
    </footer>
  );
}

const styles = {
  footer: {
    color: '#fff',
    textAlign: 'center',
    marginTop: '50px',
    backgroundColor:'#1889EA',
  },
  container: {
    margin: 'auto',
    padding: '0 20px',
    display:'flex',
    justifyContent:'space-between'
  },
  logo: {
    marginBottom: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  text: {
    margin: '5px 0',
    fontSize: '14px',
    opacity: 0.8,
  },
  name: {
    color: '#38bdf8',
    fontWeight: 'bold',
  },
  socials: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  icon: {
    color: '#fff',
    fontSize: '20px',
    transition: '0.3s',
  }
};

export default Footer;