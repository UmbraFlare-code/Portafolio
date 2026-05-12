import React, { useState, useEffect } from 'react';
import { ExternalLink, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getExperiences } from '../services/dataService';
import SkillTag from '../components/ui/SkillTag';

const Experience = () => {
  const [state, setState] = useState({
    experiences: [],
    loading: true,
  });
  const { experiences, loading } = state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const data = await getExperiences();
        setState({
          experiences: data || [],
          loading: false,
        });
      } catch (err) {
        console.error('Error fetching experience:', err);
        setState(prev => ({ ...prev, loading: false }));
      }
    };
    fetchExp();
  }, []);

  const handleNavigate = (slug, id) => {
    const target = slug || id;
    if (target) navigate(`/experience/${target}`);
  };

  if (loading) {
    return (
      <section id="experience" className="flex flex-col gap-12 scroll-mt-24">
        <div className="flex flex-col gap-4">
          <h3 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Experiencia</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-tech-orange" />
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="flex flex-col gap-12 scroll-mt-24">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm uppercase tracking-widest text-tech-orange font-bold">Experiencia</h3>
        <h2 className="text-[22px] font-bold text-negative">Trayectoria Profesional</h2>
      </div>

      <div className="flex flex-col gap-12">
        {experiences.map((exp, index) => (
          <div
            key={exp.id || index}
            onClick={() => handleNavigate(exp.slug, exp.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigate(exp.slug, exp.id);
              }
            }}
            role="button"
            tabIndex={0}
            className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 cursor-pointer"
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition-all duration-300 lg:-inset-x-6 lg:block group-hover:bg-tech-orange/[0.03] group-hover:shadow-[0_0_40px_rgba(255,95,31,0.05)] border border-transparent group-hover:border-tech-orange/10"></div>

            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-negative/40 sm:col-span-2">
              {exp.period}
            </header>

            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-negative">
                <div>
                  <div className="inline-flex items-baseline font-medium leading-tight text-negative group-hover:text-tech-orange transition-colors focus-visible:text-tech-orange group/link text-[18px]">
                    <span>
                      {exp.role} ·{" "}
                      <span className="inline-block">
                        {exp.company}
                        {exp.slug ? (
                          <ArrowRight size={14} className="inline-block ml-1 transition-transform group-hover/link:translate-x-1" />
                        ) : (
                          <ExternalLink size={14} className="inline-block ml-1 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              </h3>
              <p className="mt-2 text-[16px] leading-normal text-negative/60">
                {exp.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-tech-orange font-bold uppercase tracking-widest group-hover:text-tech-orange/80 transition-colors text-[12px]">
                <span>Ver detalles</span>
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {exp.tags?.map((tag) => (
                  <li key={tag}>
                    <SkillTag label={tag} size="sm" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
