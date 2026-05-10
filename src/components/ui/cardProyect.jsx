import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github, Folder } from 'lucide-react';

const Card = ({ data, isDimmed, onMouseEnter, onMouseLeave }) => {
  const { name, slug, description, tags, url, img, status, period } = data;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/projects/${slug}`);
  };

  return (
    <div 
      onClick={handleCardClick}
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
            <div className="inline-flex items-baseline font-medium leading-tight text-negative group-hover:text-tech-orange transition-colors focus-visible:text-tech-orange group/link text-base">
              <span className="inline-block group-hover:text-tech-orange transition-colors">
                 {name}
                 <ExternalLink size={14} className="inline-block ml-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </h3>
        
        <p className="mt-2 text-sm leading-normal text-negative/60">
          {description}
        </p>

        <div className="flex items-center gap-4 mt-3">
          {url && (
             <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-negative/40 hover:text-tech-orange transition-colors"
              title="Ver proyecto"
            >
              {url.includes('github.com') ? <Github size={18} /> : <ExternalLink size={18} />}
            </a>
          )}
          
          <ul className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <li key={tag} className="flex items-center rounded-full bg-tech-orange/10 px-3 py-1 text-xs font-medium leading-5 text-tech-orange">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;