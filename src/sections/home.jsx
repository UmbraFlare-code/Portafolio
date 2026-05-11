import React from 'react';
import { Github, Linkedin, MessageSquare, FileText } from 'lucide-react';
import { getHomeInfo, getContactInfo } from '../services/dataService';

const socialIcons = {
  FaLinkedin: Linkedin,
  SiGithub: Github,
  SiWhatsapp: MessageSquare,
  FaFilePdf: FileText,
};

function Home() {
  const { name, description } = getHomeInfo();
  const { socialLinks } = getContactInfo();

  return (
    <div id="home" className="flex flex-col gap-4 scroll-mt-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-negative">
          {name}
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-tech-orange uppercase tracking-widest">
          Software Engineer
        </h2>
      </div>
      
      <p className="max-w-xs text-negative/60 leading-relaxed">
        {description}
      </p>

      <div className="mt-8 flex items-center gap-6">
        {socialLinks.map((link) => {
          const Icon = socialIcons[link.icon];
          if (!Icon) return null;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 transition-all duration-300 hover:-translate-y-1"
              aria-label={link.name}
              title={link.name}
            >
              <Icon 
                size={22} 
                className="text-negative/40 group-hover:text-tech-orange group-hover:drop-shadow-[0_0_8px_rgba(255,95,31,0.5)] transition-colors" 
              />
              <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-negative/5 border border-negative/10 text-[10px] font-bold uppercase tracking-widest text-tech-orange opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-y-2 group-hover:translate-y-0">
                {link.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
