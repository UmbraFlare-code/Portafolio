import React from 'react';
import { Briefcase, Rocket, Award, ChevronRight } from 'lucide-react';

const StatsGrid = ({ dynamicStats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <a href="#experience" className="group p-5 rounded-2xl bg-tech-orange/5 border border-tech-orange/10 hover:border-tech-orange/30 transition-all hover:bg-tech-orange/[0.08] cursor-pointer">
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 rounded-lg bg-tech-orange/10 w-fit group-hover:scale-110 transition-transform">
          <Briefcase size={20} className="text-tech-orange" />
        </div>
        <span className="text-3xl font-semibold text-tech-orange tabular-nums">{dynamicStats.years}+</span>
      </div>
      <span className="block text-[14px] uppercase tracking-widest font-bold text-negative/60">Años de formación</span>
      <span className="text-[12px] text-tech-orange font-semibold mt-2 flex items-center gap-1 group-hover:text-tech-orange/80 transition-colors">
        Ver experiencia <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </span>
    </a>

    <a href="#proyects" className="group p-5 rounded-2xl bg-tech-orange/5 border border-tech-orange/10 hover:border-tech-orange/30 transition-all hover:bg-tech-orange/[0.08] cursor-pointer">
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 rounded-lg bg-tech-orange/10 w-fit group-hover:scale-110 transition-transform">
          <Rocket size={20} className="text-tech-orange" />
        </div>
        <span className="text-3xl font-semibold text-tech-orange tabular-nums">{dynamicStats.projects}</span>
      </div>
      <span className="block text-[14px] uppercase tracking-widest font-bold text-negative/60">Proyectos desarrollados</span>
      <span className="text-[12px] text-tech-orange font-semibold mt-2 flex items-center gap-1 group-hover:text-tech-orange/80 transition-colors">
        Ver proyectos <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </span>
    </a>

    <a href="#awards" className="group p-5 rounded-2xl bg-tech-orange/5 border border-tech-orange/10 hover:border-tech-orange/30 transition-all hover:bg-tech-orange/[0.08] cursor-pointer">
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2 rounded-lg bg-tech-orange/10 w-fit group-hover:scale-110 transition-transform">
          <Award size={20} className="text-tech-orange" />
        </div>
        <span className="text-3xl font-semibold text-tech-orange tabular-nums">{dynamicStats.certs}</span>
      </div>
      <span className="block text-[14px] uppercase tracking-widest font-bold text-negative/60">Certificaciones</span>
      <span className="text-[12px] text-tech-orange font-semibold mt-2 flex items-center gap-1 group-hover:text-tech-orange/80 transition-colors">
        Ver logros <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </span>
    </a>
  </div>
);

export default StatsGrid;
