import React from 'react';
import { Github, Linkedin, MessageSquare, Terminal } from 'lucide-react';
import contactData from '../data/contact.json';

const socialIcons = {
  FaLinkedin: Linkedin,
  SiGithub: Github,
  SiWhatsapp: MessageSquare,
};

const Footer = () => {
    const { socialLinks } = contactData;

    return (
        <footer className="footer-section py-16 flex flex-col items-center gap-8 border-t border-negative/5">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center gap-2 text-tech-orange font-bold uppercase tracking-tighter text-xl">
                    <Terminal size={24} />
                    <span>Francis Maxuel</span>
                </div>
                <p className="text-negative/40 text-sm max-w-md leading-relaxed">
                    Diseñado y desarrollado con pasión por el código y la innovación tech. 
                    © {new Date().getFullYear()} Todos los derechos reservados.
                </p>
            </div>

            <div className="flex items-center gap-8">
                {socialLinks.filter(l => socialIcons[l.icon]).map((link) => {
                    const Icon = socialIcons[link.icon];
                    return (
                        <a 
                            key={link.name} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-negative/20 hover:text-tech-orange transition-all duration-300 hover:-translate-y-1"
                            title={link.name}
                        >
                            <Icon size={20} />
                        </a>
                    );
                })}
            </div>

            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-negative/20 mt-4">
                <span className="hover:text-negative/40 transition-colors cursor-default">React</span>
                <span className="block w-1 h-1 rounded-full bg-negative/10"></span>
                <span className="hover:text-negative/40 transition-colors cursor-default">Tailwind CSS</span>
                <span className="block w-1 h-1 rounded-full bg-negative/10"></span>
                <span className="hover:text-negative/40 transition-colors cursor-default">Lucide Icons</span>
            </div>
        </footer>
    );
};

export default Footer;
