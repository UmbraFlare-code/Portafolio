import React, { useState, useEffect, useRef } from 'react';
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
  const gridRef = useRef(null);

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
    // Ordenar todos los proyectos, destacados primero
    proyectosFiltrados = todosLosProyectos.sort((a, b) => {
      if (a.featured === b.featured) return 0;
      return a.featured ? -1 : 1;
    });
  } else {
    // Mostrar todos los de la categoría activa, ordenando destacados primero
    proyectosFiltrados = [...data[categoriaActiva]].sort((a, b) => {
      if (a.featured === b.featured) return 0;
      return a.featured ? -1 : 1;
    });
  }

  const mostrarVerMas = proyectosFiltrados.length > maxToShow;
  // Modificamos esta línea para asegurar que se muestren todos los proyectos cuando mostrarTodo es true
  const proyectos = mostrarTodo ? proyectosFiltrados : proyectosFiltrados.slice(0, maxToShow);

  // Añadimos un console.log para debuggear
  console.log({
    mostrarTodo,
    totalProyectos: proyectosFiltrados.length,
    proyectosMostrados: proyectos.length,
    maxToShow
  });

  const scrollToLastVisible = () => {
    if (gridRef.current) {
      const cards = gridRef.current.children;
      const lastVisibleIndex = maxToShow - 1;
      
      if (cards[lastVisibleIndex]) {
        const offset = 100; // Offset para mejor visualización
        const cardPosition = cards[lastVisibleIndex].offsetTop - offset;
        window.scrollTo({
          top: cardPosition,
          behavior: 'smooth'
        });
      }
    }
  };

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

      <div className="proyectos-grid" ref={gridRef}>
        {proyectos.map((proyecto, index) => (
          <Card key={index} data={proyecto} />
        ))}
      </div>

      {mostrarVerMas && (
        <div className="ver-mas-container">
          <button
            onClick={() => {
              setMostrarTodo(!mostrarTodo);
              if (mostrarTodo) {
                setTimeout(scrollToLastVisible, 100);
              }
            }}
            className="secondary"
          >
            {mostrarTodo ? 'Ver menos' : 'Ver más proyectos'}
            {categoriaActiva ? ` de ${labels[categoriaActiva] || categoriaActiva}` : ''}
          </button>
        </div>
      )}
    </section>
  );
}

export default Proyects;
