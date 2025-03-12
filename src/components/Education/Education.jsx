import { useEffect, useRef } from "react";
import SectionTitle from "../common/SectionTitle";
import { FaGraduationCap, FaCertificate } from "react-icons/fa";
import portfolioData from "../../data/portfolio-data.json";
import Awards from "./Awards/Awards.jsx";
import "./Education.css";

export default function Education() {
  const timelineRef = useRef(null);

  const timelineEvents = [
    ...portfolioData.certifications.map(cert => ({ type: "certification", ...cert })),
    { type: "education", ...portfolioData.education },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible-timeline");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) observer.observe(timelineRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="education-contain" ref={timelineRef}> 
      <div className="section-timeline">
        <SectionTitle title="Educación y Certificaciones" />
        
        <div className="timeline">
          {timelineEvents.map((event, index) => (
            <div className={`timeline-item ${event.type}`} key={index}>
              <div className="timeline-date">{event.date}</div>
              
              <div className="timeline-content">
                <span className="timeline-label">
                  <div 
                    className="timeline-dot"
                    role="img"
                    aria-label={event.type === "education" ? "Ícono de educación" : "Ícono de certificación"}
                  >
                    {event.type === "education" ? 
                      <FaGraduationCap className="timeline-icon" /> : 
                      <FaCertificate className="timeline-icon" />
                    }
                  </div>
                  {event.type === "education" ? "Educación" : "Certificación"}
                </span>
                <h4 className="item-subtitle">{event.type === "education" ? event.area : event.name}</h4>
                <p className="timeline-details">{event.type === "education" ? `${event.institution} - ${event.studyType}` : event.issuer}</p>
                {event.url && (
                  <a 
                    href={event.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="timeline-link"
                    aria-label={`Más información sobre ${event.type === "education" ? event.area : event.name}`}
                  >
                    Pagina de la carrera
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="awards">
        <Awards />
      </div>
    </div>
  );
}