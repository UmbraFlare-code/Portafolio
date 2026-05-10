import React from 'react';
import { Github, Linkedin, MessageSquare, FileText } from 'lucide-react';
import homeData from '../data/home.json';
import contactData from '../data/contact.json';

const socialIcons = {
  FaLinkedin: Linkedin,
  SiGithub: Github,
  SiWhatsapp: MessageSquare,
  FaFilePdf: FileText,
};

function Home() {
  const { name, description } = homeData;
  const { socialLinks } = contactData;

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
              className="group transition-all duration-300 hover:-translate-y-1"
              aria-label={link.name}
              title={link.name}
            >
              <Icon 
                size={24} 
                className="text-negative/40 group-hover:text-tech-orange group-hover:drop-shadow-[0_0_8px_rgba(255,95,31,0.5)] transition-colors" 
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
