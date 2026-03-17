/* global IntersectionObserver, document */
import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'about', label: 'Sobre mí' },
  { id: 'proyects', label: 'Proyectos' },
  { id: 'contact', label: 'Contacto' }
];

const SectionProgress = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="mt-16 flex flex-col gap-4">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center py-3 outline-none"
            aria-label={`Saltar a ${section.label}`}
          >
            <span className={`mr-4 h-px transition-all group-hover:w-16 group-hover:bg-tech-orange group-focus-visible:w-16 group-focus-visible:bg-tech-orange ${isActive ? 'w-16 bg-tech-orange' : 'w-8 bg-negative/20'}`}></span>
            <span className={`text-xs font-bold uppercase tracking-widest transition-all group-hover:text-tech-orange group-focus-visible:text-tech-orange ${isActive ? 'text-tech-orange' : 'text-negative/40'}`}>
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default SectionProgress;
