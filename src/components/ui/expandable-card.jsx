import React from "react";
import "../../styles/expandable-card.css";

function ExpandableCard({ title, description, image, link, index, isExpanded, onExpand }) {
  const handleClick = (e) => {
    e.preventDefault();
    onExpand();
  };

  return (
    <div
      className={`expandable-card ${isExpanded ? "expanded" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      <div className="card-header">
        <h3>{title}</h3>
        <p className="card-date">{description}</p>
      </div>

      <div className="card-preview">
        <div className="image-container">
          <img src={image} alt={title} loading="lazy" />
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="view-full"
            onClick={(e) => e.stopPropagation()}
          >
            🔍 Ver en tamaño completo
          </a>
        )}
      </div>
    </div>
  );
}

export default ExpandableCard;
