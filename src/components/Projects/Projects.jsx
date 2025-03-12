import { useState, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import data from "../../data/portfolio-data.json";
import Card from "../common/Card/Card.jsx";
import ModularButton from "../common/Button/Button.jsx";
import SectionTitle from "../common/SectionTitle";
import "./Projects.css";

export default function Projects() {
  const webProjects = data.projectsweb;
  const generalProjects = data.projectsgeneral;
  const [indexWeb, setIndexWeb] = useState(0);
  const [indexGeneral, setIndexGeneral] = useState(0);

  const handleNavWeb = useCallback(
    (dir) => {
      setIndexWeb((prev) => (prev + dir + webProjects.length) % webProjects.length);
    },
    [webProjects.length]
  );

  const handleNavGeneral = useCallback(
    (dir) => {
      setIndexGeneral((prev) => (prev + dir + generalProjects.length) % generalProjects.length);
    },
    [generalProjects.length]
  );

  return (
    <div className="projects-section">
      <SectionTitle title="Mis Proyectos" />
      
      <div className="project-category">
        <div className="category-header">
          <h3 className="category-title">Desarrollo Web</h3>
        </div>
        <div className="card-container">
          <ModularButton 
            id="web-prev"
            icon={<FaChevronLeft />}
            onClick={() => handleNavWeb(-1)}
            className="round"
            position="left"
            ariaLabel="Proyecto web anterior"
          />
          <Card project={webProjects[indexWeb]} />
          <ModularButton 
            id="web-next"
            icon={<FaChevronRight />}
            onClick={() => handleNavWeb(1)}
            className="round"
            position="right"
            ariaLabel="Siguiente proyecto web"
          />
        </div>
      </div>
      
      <div className="project-category">
        <div className="category-header">
          <h3 className="category-title">Otros Proyectos</h3>
        </div>
        <div className="card-container">
          <ModularButton 
            id="general-prev"
            icon={<FaChevronLeft />}
            onClick={() => handleNavGeneral(-1)}
            className="round"
            position="left"
          />
          <Card project={generalProjects[indexGeneral]} />
          <ModularButton 
            id="general-next"
            icon={<FaChevronRight />}
            onClick={() => handleNavGeneral(1)}
            className="round"
            position="right"
          />
        </div>
      </div>
    </div>
  );
}