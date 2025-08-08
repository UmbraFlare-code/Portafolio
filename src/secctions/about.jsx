import React, { useState } from "react";
import aboutData from "../data/about.json";
import ExpandableCard from "../components/ui/expandable-card";

import { SiJavascript, SiReact, SiCss3, SiPython, SiCplusplus, SiFigma, SiArduino, SiGit } from "react-icons/si";

const iconMap = {
  JavaScript: <SiJavascript />,
  React: <SiReact />,
  CSS: <SiCss3 />,
  Python: <SiPython />,
  "C++": <SiCplusplus />,
  Figma: <SiFigma />,
  Arduino: <SiArduino />,
  Git: <SiGit />
};

const About = () => {
  const [expandedAward, setExpandedAward] = useState(null); 
  const [expandedCert, setExpandedCert] = useState(null);   

  const handleExpandAward = (index) => {
    setExpandedAward(expandedAward === index ? null : index);
    setExpandedCert(null); // Cierra cualquier certificación abierta
  };

  const handleExpandCert = (index) => {
    setExpandedCert(expandedCert === index ? null : index);
    setExpandedAward(null); // Cierra cualquier premio abierto
  };

  return (
    <section className="aboutme-section">
      <header className="aboutme-header">
        <h2 className="dynamic-text">Sobre mí</h2>
        <p className="description">{aboutData.description}</p>
      </header>

      <div className="aboutme-container">
        
        {/* Habilidades */}
        <div className="info-box">
          <h3 className="subtitle">{aboutData.skills.title}</h3>
          <div className="skills-list">
            {aboutData.skills.list.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-icon">{iconMap[skill]}</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>

          {/* Premios */}
          <h3 className="section-subtitle">Premios</h3>
          <div className="cards-container">
            {aboutData.awards.map((award, index) => (
              <ExpandableCard
                key={index}
                index={index}
                title={award.title}
                description={award.date}
                image={award.image}
                isExpanded={expandedAward === index}
                onExpand={() => handleExpandAward(index)}
              />
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="stats">
          {aboutData.stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certificaciones */}
        <div className="info-box">
          <h3 className="subtitle">Formación</h3>
          <div className="cards-container">
            {aboutData.certifications.map((cert, index) => (
              <ExpandableCard
                key={index}
                index={index}
                title={cert.title}
                description={cert.date}
                image={cert.image}
                isExpanded={expandedCert === index}
                onExpand={() => handleExpandCert(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
