import React, { useState, useEffect } from 'react';
import { SiLinkedin, SiGithub, SiWhatsapp } from 'react-icons/si';
import { FaFilePdf } from 'react-icons/fa6';
import contactData from '../data/contact.json';

const iconMap = {
  SiLinkedin: SiLinkedin,
  SiGithub: SiGithub,
  SiWhatsapp: SiWhatsapp,
  FaFilePdf: FaFilePdf,
};

const iconColors = {
  SiLinkedin: '#0077B5',
  SiGithub: '#181717',
  SiWhatsapp: '#25D366',
  FaFilePdf: '#E63946',
};

function Contact() {
  const contact = contactData;
  const { 
    title, 
    subtitle, 
    description, 
    email, 
    phone, 
    location, 
    availability, 
    responseTime, 
    socialLinks,
    services 
  } = contact;

  return (
    <section id="contact" className="contacto-section">
      <div className="contacto-header">
        <h2 className="dynamic-text">{title}</h2>
        <h3 className="subtitle">{subtitle}</h3>
        <p className="description">{description}</p>
      </div>
      
      <div className="contacto-container">
        {/* Información de contacto */}
        <div className="info-contacto">
          <h3 className="section-title">Información de contacto</h3>
          
          {/* Información principal */}
          <div className="contact-details">
            <div className="email-info">
              <h4>Email directo</h4>
              <a href={email.mailtoUrl} className="email-link">
                {email.address}
              </a>
            </div>
          </div>
          
          <div className="location-info">
            <h4>Ubicación</h4>
            <p className="location">{location}</p>
          </div>

          {/* Estado y disponibilidad */}
          <div className="availability-info">
            <p className="availability">{availability}</p>
            <p className="response-time">{responseTime}</p>
          </div>

          {/* Redes sociales */}
          <div className="redes-sociales">
            <h4>Sígueme en</h4>
            <div className="contacto-links">
              {socialLinks
              .filter(link => link.icon !== 'FaFilePdf')
              .map((link, index) => {
                const Icon = iconMap[link.icon];
                const hoverColor = iconColors[link.icon] || '#000';
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-social"
                    style={{ '--hover-color': hoverColor }}
                    title={link.description || link.name}
                  >
                    <Icon className="icon" size={20} />
                    <span className="text">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="Servicios">
          <h3 className="section-title">Servicios disponibles</h3>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <h4 className="service-name">{service.name}</h4>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;