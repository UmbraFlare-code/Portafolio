import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Card = ({ project, handleNav }) => (
  <div className="card-container">
    <button onClick={() => handleNav(-1)} className="nav-btn left-btn" aria-label="Previous project">
      <i className="fa fa-chevron-left"></i>
    </button>
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
            <a href={project.url} className="card-link" target="_blank" rel="noopener noreferrer">
              {project.url.includes('github') ? (
                <><FaGithub /> Ver código</>
              ) : (
                <><FaExternalLinkAlt /> Ver proyecto</>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
    <button onClick={() => handleNav(1)} className="nav-btn right-btn" aria-label="Next project">
      <i className="fa fa-chevron-right"></i>
    </button>
  </div>
);

export default Card;