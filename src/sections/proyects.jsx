/* global window */
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/cardProyect';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { getProjects, getProjectCategories } from '../services/dataService';
import Button from '../components/ui/Button';

function Proyects() {
  const [state, setState] = useState({
    allProjects: [],
    categories: {},
    loading: true,
    activeCategory: null,
    hoveredIndex: null,
    showAll: false,
    isMobile: false
  });

  const { allProjects, categories, loading, activeCategory, hoveredIndex, showAll, isMobile } = state;

  const setActiveCategory = (activeCategory) => setState(prev => ({ ...prev, activeCategory }));
  const setHoveredIndex = (hoveredIndex) => setState(prev => ({ ...prev, hoveredIndex }));
  const setShowAll = (showAll) => setState(prev => ({ ...prev, showAll }));
  const setIsMobile = (isMobile) => setState(prev => ({ ...prev, isMobile }));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projects, cats] = await Promise.all([
          getProjects(),
          getProjectCategories(),
        ]);
        setState(prev => ({
          ...prev,
          allProjects: projects,
          categories: cats,
          loading: false
        }));
      } catch (err) {
        console.error('Error fetching projects:', err);
        setState(prev => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);

  const categoryKeys = Object.keys(categories);

  const filteredProjects = activeCategory
    ? allProjects.filter(p => p.categoryKey === activeCategory)
    : allProjects;

  const displayLimit = isMobile ? 3 : 6;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, displayLimit);

  if (loading) {
    return (
      <section id="proyects" className="flex flex-col gap-12 scroll-mt-24">
        <div className="flex flex-col gap-4">
          <h3 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Proyectos</h3>
        </div>
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="animate-spin text-tech-orange" />
        </div>
      </section>
    );
  }

  return (
    <section id="proyects" className="flex flex-col gap-12 scroll-mt-24">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm uppercase tracking-widest text-tech-orange font-bold">Proyectos</h3>
        <h2 className="text-[22px] font-bold text-negative">Galería de Proyectos</h2>
        <p className="text-negative/60 text-[18px] max-w-xl">Una selección de mis trabajos más recientes y destacados.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-thin">
        <Button
          variant={!activeCategory ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setActiveCategory(null)}
          className="rounded-full flex-shrink-0"
        >
          Todos
        </Button>
        {categoryKeys.map((key) => (
          <Button
            key={key}
            variant={activeCategory === key ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveCategory(key)}
            className="rounded-full flex-shrink-0"
          >
            {categories[key]}
          </Button>
        ))}
      </div>

      {/* Projects List (Single Column) */}
      <div className="flex flex-col gap-12">
        {visibleProjects.map((project, index) => (
          <Card
            key={project.id || `${project.name}-${index}`}
            data={project}
            isDimmed={hoveredIndex !== null && hoveredIndex !== index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {filteredProjects.length > displayLimit && (
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          className="self-center"
        >
          {showAll ? (
            <>Ver menos <ChevronUp size={18} className="group-hover:-translate-y-1 transition-transform" /></>
          ) : (
            <>Ver todos los proyectos <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" /></>
          )}
        </Button>
      )}
    </section>
  );
}

export default Proyects;
