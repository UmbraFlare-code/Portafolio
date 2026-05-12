import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github, Folder } from 'lucide-react';
import SkillTag from './SkillTag';

const Card = ({ data, isDimmed, onMouseEnter, onMouseLeave }) => {
  const { name, slug, description, tags, url, img, status, period } = data;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/projects/${slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex="0"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 cursor-pointer ${isDimmed ? 'opacity-50 blur-[0.5px]' : ''}`}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition-all duration-300 lg:-inset-x-6 lg:block group-hover:bg-tech-orange/[0.03] group-hover:shadow-[0_0_40px_rgba(255,95,31,0.05)] border border-transparent group-hover:border-tech-orange/10"></div>

      {/* Project Image & Period - Column Left (sm:col-span-2) */}
      <header className="z-10 mb-2 mt-1 sm:col-span-2 flex flex-col gap-2">
        <div className="relative aspect-video rounded border-2 border-negative/10 overflow-hidden bg-negative/10 block transition group-hover:border-tech-orange/30">
          {img ? (
            <img
              src={img}
              alt={name}
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-negative/20">
              <Folder size={24} />
            </div>
          )}
          {status && (
            <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-sm bg-tech-orange text-[8px] font-bold uppercase text-white shadow-lg">
              {status}
            </div>
          )}
        </div>
        {period && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-negative/40">
            {period}
          </span>
        )}
      </header>

      {/* Project Content - Column Right (sm:col-span-6) */}
      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug text-negative">
          <div>
            <div className="inline-flex items-baseline font-medium leading-tight text-negative group-hover:text-tech-orange transition-colors focus-visible:text-tech-orange group/link text-[18px]">
              <span className="inline-block group-hover:text-tech-orange transition-colors">
                {name}
              </span>
            </div>
          </div>
        </h3>

        <p className="mt-2 text-[16px] leading-normal text-negative/60">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-tech-orange font-bold uppercase tracking-widest group-hover:text-tech-orange/80 transition-colors text-[12px]">
          <span>Ver detalles</span>
          <ExternalLink size={12} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>

        <div className="flex items-center gap-4 mt-3">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-negative/40 hover:text-tech-orange transition-colors"
              title="Ver detalles"
            >
              {url.includes('github.com') ? <Github size={18} /> : <ExternalLink size={18} />}
            </a>
          )}

          <ul className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <li key={tag}>
                <SkillTag label={tag} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;