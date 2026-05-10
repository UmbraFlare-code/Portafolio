import React from 'react';
import experienceData from '../data/experience.json';
import { ExternalLink, Briefcase } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="flex flex-col gap-12 scroll-mt-24">
      <div className="flex flex-col gap-4">
        <h3 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Experiencia</h3>
      </div>

      <div className="flex flex-col gap-12">
        {experienceData.map((exp, index) => (
          <div key={index} className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-negative/5 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] lg:group-hover:drop-shadow-lg"></div>
            
            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-negative/40 sm:col-span-2">
              {exp.period}
            </header>

            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-negative">
                <div>
                  <div className="inline-flex items-baseline font-medium leading-tight text-negative hover:text-tech-orange transition-colors focus-visible:text-tech-orange group/link text-base">
                    <span>
                      {exp.role} ·{" "}
                      <span className="inline-block">
                        {exp.company}
                        <ExternalLink size={14} className="inline-block ml-1 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                      </span>
                    </span>
                  </div>
                </div>
              </h3>
              <p className="mt-2 text-sm leading-normal text-negative/60">
                {exp.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <li key={tag} className="flex items-center rounded-full bg-tech-orange/10 px-3 py-1 text-xs font-medium leading-5 text-tech-orange">
                    {tag}
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
