import React from 'react';

const AboutDescription = ({ descText }) => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-4">
      <h3 className="text-sm uppercase tracking-widest text-tech-orange font-bold">Sobre mí</h3>
      <h2 className="text-[22px] font-bold text-negative">Trayectoria y Enfoque</h2>
    </div>
    <div className="flex flex-col gap-6 text-negative/70 leading-relaxed text-[18px]">
      <p>{descText}</p>
    </div>
  </div>
);

export default AboutDescription;
