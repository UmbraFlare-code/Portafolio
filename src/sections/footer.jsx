import React from 'react';
import { Github, Linkedin, MessageSquare, Terminal } from 'lucide-react';
import { getContactInfo, getHomeInfo } from '../services/dataService';

const socialIcons = {
    FaLinkedin: Linkedin,
    SiGithub: Github,
    SiWhatsapp: MessageSquare,
};

const Footer = () => {
    const { socialLinks } = getContactInfo();
    const { name } = getHomeInfo();

    return (
        <footer className="footer-section flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center gap-2 text-tech-orange font-bold uppercase tracking-tighter text-xl">
                    <Terminal size={24} />
                    <span>{name}</span>
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
        </footer>
    );
};

export default Footer;
