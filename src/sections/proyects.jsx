/* global window */
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/cardProyect';
import proyectosData from '../data/proyects.json';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

function Proyects() {
  const data = proyectosData;
  const categories = data.categories || {};
  const categoryKeys = Object.keys(categories);

  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allProjects = [
    ...data.web.map(p => ({ ...p, cat: 'web' })),
    ...data.general.map(p => ({ ...p, cat: 'general' })),
    ...data.hardware.map(p => ({ ...p, cat: 'hardware' })),
    ...data.automat.map(p => ({ ...p, cat: 'automat' }))
  ].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const filteredProjects = activeCategory 
    ? allProjects.filter(p => p.cat === activeCategory)
    : allProjects;

  const displayLimit = isMobile ? 3 : 6;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, displayLimit);

  return (
    <section id="proyects" className="flex flex-col gap-12 scroll-mt-24">
      <div className="flex flex-col gap-4">
        <h3 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Proyectos</h3>
        <h2 className="text-4xl font-bold text-negative">{data.title}</h2>
        <p className="text-negative/60 text-lg max-w-xl">{data.subtitle}</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveCategory(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${!activeCategory ? 'bg-tech-orange border-tech-orange text-white' : 'bg-negative/5 border-negative/10 text-negative/60 hover:border-negative/30'}`}
        >
          Todos
        </button>
        {categoryKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory === key ? 'bg-tech-orange border-tech-orange text-white' : 'bg-negative/5 border-negative/10 text-negative/60 hover:border-negative/30'}`}
          >
            {categories[key]}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleProjects.map((project, index) => (
          <div 
            key={`${project.name}-${index}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card 
              data={project} 
              isDimmed={hoveredIndex !== null && hoveredIndex !== index}
            />
          </div>
        ))}
      </div>

      {filteredProjects.length > displayLimit && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="group flex items-center gap-3 self-center px-8 py-4 rounded-xl border border-negative/10 hover:border-tech-orange/50 transition-all text-sm font-bold uppercase tracking-widest text-negative/60 hover:text-tech-orange lg:hover:bg-tech-orange/5"
        >
          {showAll ? (
            <>Ver menos <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" /></>
          ) : (
            <>Ver todos los proyectos <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" /></>
          )}
        </button>
      )}
    </section>
  );
}

export default Proyects;
