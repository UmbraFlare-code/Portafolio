import React, { useState, useEffect, useMemo, useRef } from 'react';
import { List, X } from 'lucide-react';

// Helper to slugify heading text
export const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

// Heading component for ReactMarkdown
export const HeadingComponent = ({ level, children }) => {
  const getPlainText = (nodes) => {
    return React.Children.toArray(nodes)
      .map(child => {
        if (typeof child === 'string') return child;
        if (typeof child === 'object' && child.props && child.props.children) {
          return getPlainText(child.props.children);
        }
        return '';
      })
      .join('');
  };

  const text = getPlainText(children);
  const id = slugify(text);
  const Tag = `h${level}`;
  
  return (
    <Tag id={id} className="scroll-mt-32 group relative">
      {children}
      <a 
        href={`#${id}`} 
        className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-tech-orange text-lg hidden md:block"
        title={`Enlace a ${text}`}
      >
        #
      </a>
    </Tag>
  );
};

const TableOfContents = ({ content = '', extraHeadings = [], title = "Índice" }) => {
  const [activeId, setActiveId] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observer = useRef(null);

  // Extract headings from markdown content
  const extractedHeadings = useMemo(() => {
    if (!content) return [];
    
    const normalizedContent = content.replace(/\r\n/g, '\n');
    const lines = normalizedContent.split('\n');
    const extracted = [];
    let inCodeBlock = false;

    lines.forEach(line => {
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        return;
      }

      if (!inCodeBlock) {
        const match = line.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const rawText = match[2].trim();
          const cleanText = rawText.replace(/[*_`]/g, '').trim();
          
          if (cleanText) {
            extracted.push({
              id: slugify(cleanText),
              text: cleanText,
              level
            });
          }
        }
      }
    });
    return extracted;
  }, [content]);

  // Combine with extra headings
  const allHeadings = useMemo(() => {
    return [...extraHeadings, ...extractedHeadings];
  }, [extraHeadings, extractedHeadings]);

  // Setup Intersection Observer for active heading
  useEffect(() => {
    if (!allHeadings.length) return;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0.1
    });

    allHeadings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.current.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [allHeadings]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const scrollTop = element.scrollTop;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileNavOpen(false);
    }
  };

  if (allHeadings.length === 0) return null;

  return (
    <>
      {/* Progress Bar (Global Top) */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-negative/5">
        <div
          className="h-full bg-tech-orange transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Desktop TOC (Sidebar) */}
      <aside className="scrollbar-none hidden lg:sticky lg:top-32 lg:flex lg:max-h-[calc(100vh-8rem)] lg:w-2/5 lg:flex-col self-start overflow-y-auto pr-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-tech-orange">{title}</span>
            <nav className="flex flex-col gap-4 border-l border-negative/5 pl-4">
              {allHeadings.map((h, idx) => (
                <button
                  key={`${h.id}-${h.level}-${idx}`}
                  onClick={() => scrollToHeading(h.id)}
                  className={`text-left text-sm transition-all duration-300 hover:text-tech-orange hover:translate-x-1 ${
                    activeId === h.id
                      ? 'text-tech-orange font-bold translate-x-1'
                      : 'text-negative/30'
                  }`}
                  style={{ 
                    paddingLeft: h.level > 1 ? `${(h.level - 1) * 0.75}rem` : '0',
                    fontSize: h.level > 2 ? '0.8rem' : '0.875rem'
                  }}
                >
                  {h.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Mobile Nav Button */}
      <div className="lg:hidden fixed bottom-8 right-6 z-[70]">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="flex items-center justify-center size-14 rounded-full bg-tech-orange text-white shadow-lg shadow-tech-orange/30 transition-all hover:scale-110 active:scale-95"
        >
          {isMobileNavOpen ? <X size={24} /> : <List size={24} />}
        </button>

        {/* Mobile Nav Menu Overlay */}
        {isMobileNavOpen && (
          <div className="absolute bottom-16 right-0 w-64 max-h-[60vh] bg-dark-bg/95 backdrop-blur-xl border border-negative/10 rounded-2xl p-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl">
            <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-tech-orange mb-4">{title}</span>
            <nav className="flex flex-col gap-4">
              {allHeadings.map((h, idx) => (
                <button
                  key={`${h.id}-${h.level}-${idx}-mobile`}
                  onClick={() => scrollToHeading(h.id)}
                  className={`text-left text-sm transition-all duration-300 ${
                    activeId === h.id
                      ? 'text-tech-orange font-bold'
                      : 'text-negative/60'
                  }`}
                  style={{ 
                    paddingLeft: h.level > 1 ? `${(h.level - 1) * 0.75}rem` : '0'
                  }}
                >
                  {h.text}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default TableOfContents;
