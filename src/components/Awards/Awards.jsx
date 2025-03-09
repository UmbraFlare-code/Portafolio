import { useEffect, useRef } from "react";
import SectionTitle from "../common/SectionTitle";
import portfolioData from "../../data/portfolio-data.json";
import "./Awards.css";

export default function Awards() {
  const awardsRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.3 };
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible-awards");
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
    <div className="section-awards" ref={awardsRef}>
      <SectionTitle title="Premios y Reconocimientos" />
      
      <div className="grid-container">
        {portfolioData.awards.map((award, index) => (
          <div className="grid-item" key={index}>
            <h4 className="item-subtitle">{award.title}</h4>
            <p>{award.awarder} - {award.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}