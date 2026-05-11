/* global setInterval, clearInterval */
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { isAvailableNow } from '../services/dataService';

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());
  const available = isAvailableNow();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Peru time (UTC-5)
  const peruTime = new Intl.DateTimeFormat('es-PE', {
    timeZone: 'America/Lima',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(time);

  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-full border w-fit transition-colors duration-500 ${available ? 'bg-tech-orange/10 border-tech-orange/20 text-tech-orange' : 'bg-negative/5 border-negative/10 text-negative/40'
      }`}>
      <Clock size={16} className={available ? 'animate-pulse' : ''} />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest opacity-70">Huancayo, PE</span>
        <span className="text-sm font-bold font-mono leading-none">{peruTime}</span>
      </div>
      <div className="ml-2 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          {available && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-orange opacity-75"></span>}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${available ? 'bg-tech-orange' : 'bg-negative/20'}`}></span>
        </span>
        <span className="text-[10px] uppercase font-semibold">
          {available ? 'Disponible' : 'Descansando'}
        </span>
      </div>
    </div>
  );
};

export default TimeDisplay;
