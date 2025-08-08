import React, { useState, useEffect } from 'react';
import Card from '../components/ui/cardProyect';
import proyectosData from '../data/proyects.json';
import Button from '../components/ui/button'; 

function Proyects() {
  const data = proyectosData;

  const categorias = Object.entries(data).filter(([key, value]) => Array.isArray(value));
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const labels = data.categories || {};

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [mostrarTodo, setMostrarTodo] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxToShow = isMobile ? 3 : 6;

  // Obtener proyectos destacados filtrados por categoría activa (si la hay)
  const todosLosProyectos = [
    ...data.web,
    ...data.general,
    ...data.hardware,
    ...data.automat
  ];
  
  let proyectosFiltrados;

  if (!categoriaActiva) {
    // Mostrar solo destacados de todas las categorías
    proyectosFiltrados = todosLosProyectos.filter(p => p.featured);
  } else {
    // Mostrar todos los de la categoría activa, ordenando destacados primero
    proyectosFiltrados = [...data[categoriaActiva]].sort((a, b) => {
      if (a.featured === b.featured) return 0;
      return a.featured ? -1 : 1; // featured true antes que false
    });
  }

  const mostrarVerMas = proyectosFiltrados.length > maxToShow;
  const proyectos = mostrarTodo ? proyectosFiltrados : proyectosFiltrados.slice(0, maxToShow);

  return (
    <section className="proyectos-section" id="projects">
      <h2 className="proyectos-title">{data.title}</h2>
      <p className="proyectos-subtitle">{data.subtitle}</p>
      <div className="proyectos-wrapper"> 
        <div className="proyectos-buttons">
          {categorias.map(([key]) => (
            <button
              key={key}
              className={`btn-toggle ${key === categoriaActiva ? 'active' : ''}`}
              onClick={() => {
                const nuevaCategoria = key === categoriaActiva ? null : key;
                setCategoriaActiva(nuevaCategoria);
                setMostrarTodo(false); // Reinicia la vista limitada al cambiar categoría
              }}
            >
              {labels[key] || key}
            </button>
          ))}
        </div>
      </div>

      <div className="proyectos-grid">
        {proyectos.map((proyecto, index) => (
          <Card key={index} data={proyecto} />
        ))}
      </div>

      {mostrarVerMas && (
        <div className="ver-mas-container">
          <Button
            onClick={() => setMostrarTodo(!mostrarTodo)}
            variant="secondary"
          >
            {mostrarTodo ? 'Ver menos' : 'Ver más proyectos'}
            {categoriaActiva ? ` de ${labels[categoriaActiva] || categoriaActiva}` : ''}
          </Button>
        </div>
      )}
    </section>
  );
}

export default Proyects;
