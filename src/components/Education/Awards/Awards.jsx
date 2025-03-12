import { useEffect, useRef } from "react";
import SectionTitle from "../../common/SectionTitle";
import portfolioData from "../../../data/portfolio-data.json";
import "./Awards.css";

export default function Awards() {
  const awardsRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.3 };
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("awards-visible");
          observer.disconnect();
        }
      },
      observerOptions
    );
    
    if (awardsRef.current) observer.observe(awardsRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="awards-section" ref={awardsRef}>
      <SectionTitle title="Premios y Reconocimientos" />
      
      <div className="awards-grid">
        {portfolioData.awards.map((award, index) => (
          <div className="award-card" key={index}>
            <h4 className="award-title">{award.title}</h4>
            <p className="award-details">{award.awarder} - {award.date}</p>
            {award.summary && <p className="award-summary">{award.summary}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}