import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block notranslate"
      style={{
        transform: `translate(${position.x - 3}px, ${position.y - 3}px)`,
      }}
    >
      <div className="w-1.5 h-1.5 bg-tech-orange rounded-full opacity-60" />
    </div>
  );
};

export default CustomCursor;
