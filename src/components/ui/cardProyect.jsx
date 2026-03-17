import React from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';

const Card = ({ data, isDimmed }) => {
  const { name, description, tags, url, img, status } = data;

  return (
    <div 
      className={`group relative flex flex-col gap-4 p-6 rounded-2xl bg-negative/5 border border-negative/10 transition-all duration-500 hover:bg-negative/[0.07] hover:border-tech-orange/30 hover:shadow-[0_0_30px_rgba(255,95,31,0.1)] ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}
    >
      {/* Project Image / Placeholder */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-negative/10 mb-2">
        {img ? (
          <img 
            src={img} 
            alt={name} 
            className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-negative/20">
            <Folder size={48} />
          </div>
        )}
        {status && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-tech-orange text-[10px] font-bold uppercase text-white shadow-lg">
            {status}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-negative group-hover:text-tech-orange transition-colors">
            {name}
          </h3>
          {url && (
            <div className="flex gap-3">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-negative/40 hover:text-tech-orange transition-colors"
                title="Ver proyecto"
              >
                {url.includes('github.com') ? <Github size={20} /> : <ExternalLink size={20} />}
              </a>
            </div>
          )}
        </div>

        <p className="text-sm text-negative/60 leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-tech-orange/10 text-tech-orange border border-tech-orange/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;