import React from 'react';
import { SiLinkedin, SiGithub, SiGmail, SiReaddotcv } from "react-icons/si";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import data from '../../data/portfolio-data.json';
import './Footer.css';

const Footer = () => {
  const { footer } = data;
  
  const getIconComponent = (iconName) => {
    const icons = {
      SiLinkedin,
      SiGithub,
      SiGmail,
      SiReaddotcv
    };
    return icons[iconName] || null;
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">{footer.title}</h3>
          <p className="footer-subtitle">{footer.subtitle}</p>
          
          <div className="contact-info">
            <div className="contact-item">
              <FaWhatsapp className="contact-icon" />
              <a href={footer.phone.whatsappUrl} className="contact-link">
                {footer.phone.number}
              </a>
            </div>
            
            <div className="contact-item">
              <SiGmail className="contact-icon" />
              <a href={`mailto:${footer.email}`} className="contact-link">
                {footer.email}
              </a>
            </div>
            
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>{footer.location}</span>
            </div>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Enlaces rápidos</h3>
          <ul className="quick-links">
            {footer.quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} className="quick-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Sígueme</h3>
          <div className="social-icons">
            {footer.socialLinks.map((link, index) => {
              const Icon = getIconComponent(link.icon);
              return Icon && (
                <a 
                  key={index} 
                  href={link.url} 
                  className="social-icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">{footer.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;