import React from 'react';
import { 
  Code2, 
  Cpu, 
  Layers, 
  Terminal, 
  GitBranch, 
  PenTool, 
  Mail, 
  Smartphone, 
  ExternalLink,
  ChevronRight,
  Cloud
} from 'lucide-react';
import aboutData from '../data/about.json';
import contactData from '../data/contact.json';

const skillIcons = {
  JavaScript: <Terminal size={20} />,
  TypeScript: <Code2 size={20} />,
  React: <Layers size={20} />,
  'Tailwind CSS': <Layers size={20} />,
  CSS: <PenTool size={20} />,
  AWS: <Cloud size={20} />,
  'C++': <Code2 size={20} />,
  Figma: <PenTool size={20} />,
  Arduino: <Cpu size={20} />,
  Git: <GitBranch size={20} />,
};

const AboutContact = () => {
  const { description, skills, stats } = aboutData;
  const { title, email, phone } = contactData;

  return (
    <section id="about" className="flex flex-col gap-24 scroll-mt-24">
      
      {/* About Section */}
      <div className="flex flex-col gap-8">
        <h3 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Sobre mí</h3>
        <div className="flex flex-col gap-6 text-negative/70 leading-relaxed text-lg">
          <p>{description}</p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.list.map((skill) => (
            <div 
              key={skill} 
              className="flex items-center gap-3 p-3 rounded-lg bg-negative/5 border border-negative/10 hover:border-tech-orange/50 transition-all group"
            >
              <span className="text-tech-orange group-hover:drop-shadow-[0_0_8px_rgba(255,95,31,0.5)] transition-all">
                {skillIcons[skill] || <Terminal size={20} />}
              </span>
              <span className="text-sm font-medium">{skill}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-tech-orange/5 border border-tech-orange/10">
              <span className="block text-3xl font-extrabold text-tech-orange">{stat.number}</span>
              <span className="text-xs uppercase tracking-wider text-negative/40">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="flex flex-col gap-8 scroll-mt-24">
        <h3 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Contacto</h3>
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-negative">{title}</h2>
          <p className="text-negative/60 text-lg">
            ¿Tienes un proyecto en mente? Hablemos y hagámoslo realidad.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <a 
              href={email.mailtoUrl}
              className="flex items-center justify-between p-6 rounded-2xl bg-negative/5 border border-negative/10 hover:border-tech-orange/50 transition-all group lg:hover:bg-negative/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-tech-orange/10 text-tech-orange">
                  <Mail size={24} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-negative/40">Email</span>
                  <span className="text-sm font-bold truncate max-w-[150px] sm:max-w-none">{email.address}</span>
                </div>
              </div>
              <ChevronRight className="text-negative/20 group-hover:text-tech-orange transition-colors" />
            </a>

            <a 
              href={phone.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-2xl bg-negative/5 border border-negative/10 hover:border-tech-orange/50 transition-all group lg:hover:bg-negative/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-tech-orange/10 text-tech-orange">
                  <Smartphone size={24} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-negative/40">WhatsApp</span>
                  <span className="text-sm font-bold">{phone.number}</span>
                </div>
              </div>
              <ChevronRight className="text-negative/20 group-hover:text-tech-orange transition-colors" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutContact;
