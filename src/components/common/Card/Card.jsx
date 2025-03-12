import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./Card.css"

const Card = ({ project, handleNav }) => (
  <div className="card-container">
    <div className="card">
      <div className="card-image-container">
        <img src={project.img} alt={project.name} className="card-img" />
        <div className="card-overlay">
          <h2 className="card-title">{project.name}</h2>
        </div>
      </div>
      <div className="card-content">
        <p className="card-desc">{project.description}</p>
        <div className="card-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="tag-item">{tag}</span>
          ))}
        </div>
        <div className="card-actions">
          {project.url && (
            <a 
              href={project.url} 
              className="card-link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={project.url.includes('github') ? 
                `Ver código de ${project.name}` : 
                `Ver proyecto ${project.name}`}
            >
              <span className="card-link-content">
                {project.url.includes('github') ? (
                  <><FaGithub className="card-link-icon" /> <span className="card-link-text">Ver código</span></>
                ) : (
                  <><FaExternalLinkAlt className="card-link-icon" /> <span className="card-link-text">Ver proyecto</span></>
                )}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Card;