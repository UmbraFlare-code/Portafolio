import React, { useState, useEffect } from 'react';
import { SiLinkedin, SiGithub, SiWhatsapp } from 'react-icons/si';
import { FaFilePdf } from 'react-icons/fa6';
import Button from '../components/ui/button'; 
import foto from '/assets/img/perfil.webp';
import logo1 from '/assets/icons/logo.svg';
import homeData from '../data/home.json';
import contactData from '../data/contact.json';

const iconMap = {
  SiLinkedin: SiLinkedin,
  SiGithub: SiGithub,
  FaFilePdf: FaFilePdf,
  SiWhatsapp: SiWhatsapp,
};

const iconColors = {
  SiLinkedin: '#0077B5',
  SiGithub: '#181717',
  SiWhatsapp: '#25D366',
  FaFilePdf: '#E63946',
};

function Home() {
  const data = homeData || homeData;
  const contact = contactData || contactData;
  const socialLinks = contact.socialLinks;

  // Detecta si el dispositivo es móvil
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="home-section">
      <div className="home-left">
        <img className="logo-home" src={logo1} alt="logo" />
        <span className="dynamic-text">{data.name}</span>
        <section className='buttons'>
          <div className="home-buttons">
            <Button href="#projects" variant="primary">
              {data.cta.primary}
            </Button>
            <Button href="#contact" variant="secondary">
              {data.cta.secondary}
            </Button>
          </div>
          <div className="icon-redes">
            {socialLinks && socialLinks.map((item) => {
              const Icon = iconMap[item.icon];
              const hoverColor = iconColors[item.icon] || '#000';
              if (!Icon) return null; // Solo renderiza si el icono existe
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                  className="icon-social"
                  style={{ '--hover-color': hoverColor }}
                >
                  <Icon size={34} className="icon" />
                </a>
              );
            })}
          </div>
        </section>
      </div>

      <div className="home-right">
        <div className="contenedor-perfil">
          <img src={foto} alt="foto de perfil" className="foto-perfil" />
        </div>
        <p className="dynamic-text">{data.description}</p>
      </div>
    </section>
  );
}

export default Home;