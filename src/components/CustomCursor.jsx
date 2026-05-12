import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(dotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0,
      });
    };

    const onMouseDown = () => {
      gsap.to(dotRef.current, { scale: 0.8, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(dotRef.current, { scale: 1, duration: 0.15 });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('button, a, [role="button"], input, select, textarea');
      if (isClickable) {
        gsap.to(dotRef.current, {
          scale: 2.5,
          backgroundColor: 'rgba(255, 95, 31, 0.2)',
          border: '1px solid rgba(255, 95, 31, 0.8)',
          duration: 0.3
        });
      } else {
        gsap.to(dotRef.current, {
          scale: 1,
          backgroundColor: '#ff5f1f',
          border: 'none',
          duration: 0.3
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Thicker Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 size-3 -ml-1.5 -mt-1.5 bg-tech-orange rounded-full shadow-[0_0_15px_rgba(255,95,31,0.5)]"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
    </div>
  );
};

export default CustomCursor;
