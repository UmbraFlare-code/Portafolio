import { useEffect, useRef } from "react";
import SectionTitle from "../common/SectionTitle";
import { FaGraduationCap, FaCertificate } from "react-icons/fa";
import portfolioData from "../../data/portfolio-data.json";
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
    <div className="section-timeline" ref={timelineRef}>
      <SectionTitle title="Educación y Certificaciones" />
      
      <div className="timeline">
        {timelineEvents.map((event, index) => (
          <div className={`timeline-item ${event.type}`} key={index}>
            <div className="timeline-date">{event.date}</div>
            <div className="timeline-dot">
              {event.type === "education" ? 
                <FaGraduationCap className="timeline-icon" /> : 
                <FaCertificate className="timeline-icon" />
              }
            </div>
            <div className="timeline-content">
              <span className="timeline-label">{event.type === "education" ? "Educación" : "Certificación"}</span>
              <h4 className="item-subtitle">{event.type === "education" ? event.area : event.name}</h4>
              <p className="timeline-details">{event.type === "education" ? `${event.institution} - ${event.studyType}` : event.issuer}</p>
              {event.url && <a href={event.url} target="_blank" rel="noopener noreferrer" className="timeline-link">Más información</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}