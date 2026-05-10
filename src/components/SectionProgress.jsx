/* global IntersectionObserver, document */
import React, { useState, useEffect, useRef, useCallback } from 'react';

const SectionProgress = () => {
  const [activeSection, setActiveSection] = useState('');
  const sectionsRef = useRef([]);

  const sections = [
    { id: 'about', label: "Sobre mí" },
    { id: 'experience', label: "Experiencia" },
    { id: 'proyects', label: "Proyectos" },
    { id: 'logros', label: "Logros" },
    { id: 'blog', label: "Artículos" },
    { id: 'contact', label: "Contacto" },
  ];

  // Calculate which section is most visible — works in both scroll directions
  const calculateActiveSection = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    let bestSection = '';
    let bestDistance = Infinity;

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Distance from the element's vertical center to the viewport center
      const elCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elCenter - viewportCenter);

      // Only consider elements that are at least partially visible
      if (rect.bottom > 0 && rect.top < viewportHeight) {
        if (distance < bestDistance) {
          bestDistance = distance;
          bestSection = section.id;
        }
      }
    }

    // Edge case: if scrolled to the very bottom, activate the last visible section
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
      // Find the last section that exists in the DOM
      for (let i = sections.length - 1; i >= 0; i--) {
        if (document.getElementById(sections[i].id)) {
          bestSection = sections[i].id;
          break;
        }
      }
    }

    if (bestSection && bestSection !== activeSection) {
      setActiveSection(bestSection);
    }
  }, [activeSection]);

  useEffect(() => {
    // Initial calculation
    calculateActiveSection();

    // Use a passive scroll listener for bidirectional tracking
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [calculateActiveSection]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="mt-16 flex flex-col gap-1 notranslate">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center py-3 outline-none"
            aria-label={section.label}
          >
            <span
              className={`mr-4 h-px transition-all duration-500 group-hover:w-16 group-hover:bg-tech-orange ${isActive
                  ? 'w-16 bg-tech-orange shadow-[0_0_8px_rgba(255,95,31,0.4)]'
                  : 'w-8 bg-negative/20'
                }`}
            />
            <span
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:text-tech-orange ${isActive ? 'text-tech-orange' : 'text-negative/40'
                }`}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default SectionProgress;
