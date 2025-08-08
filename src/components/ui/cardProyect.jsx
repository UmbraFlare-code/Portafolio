import React, { useState, useEffect } from 'react';
import '../../styles/card.css';

function Card({ index, data }) {
  const [mostrarContenido, setMostrarContenido] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!data || data.proximamente) {
    return (
      <div className="card">
        <p className="proximamente">Próximamente</p>
      </div>
    );
  }

  const { name, description, img, url, tags, status } = data;
  const isRight = index % 2 === 1; // Antes era "isPar"

  return (
    <div
      className={`cardP card-${isRight ? 'left' : 'right'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {!isMobile ? (
        <div className='card-content'>
          <div className="card-desktop-layout">
            <div className="card-image-wrapper">
              <img src={img} alt={name} className="card-img" />
            </div>
            <div className="card-content"> 
              <div className="card-content">
                <h3 className="card-title">{name}</h3>
                <p className="card-description">{description}</p>
                {status && <span className="card-status">{status}</span>}
                <div className="card-tags">
                  {tags && tags.map((tag, i) => (
                    <span key={i} className="card-tag">{tag}</span>
                  ))}
                </div>
              </div> 
            </div>
            {isRight && <img src={img} alt={name} className="card-img" />}
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="card-link">
              Ver proyecto
            </a>
          )}
          </div>
        </div>
      ) : (
        // Layout para móvil
        <>
          {!mostrarContenido ? (
            <div className="card-image-wrapper" onClick={() => setMostrarContenido(true)}>
              <img src={img} alt={name} className="card-img" />
            </div>
          ) : (
            <div className="card-content" onClick={() => setMostrarContenido(false)}>
              <h3 className="card-title">{name}</h3>
              <p className="card-description">{description}</p>
              {status && <span className="card-status">{status}</span>}
              <div className="card-tags">
                {tags && tags.map((tag, i) => (
                  <span key={i} className="card-tag">{tag}</span>
                ))}
              </div>
              {url && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="card-link">
                  Ver proyecto
                </a>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Card;