import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getHomeInfo } from '../services/dataService';
import './PageTransition.css';

/* ─── Timing constants (ms) ───────────────── */
const EXIT_DURATION = 600;   
const HOLD_DURATION = 600;   
const ENTRY_DURATION = 1000; 

/* ─── Easing helpers ───────────────── */
const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeIn = t => t * t * t;

/* ─── Blob drawing ───────────────── */
function drawBlob(ctx, cx, cy, r, points, roughness, seed) {
  const pts = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2 + seed;
    const noise = 1 + (Math.sin(seed * 7 + i * 2.3) * 0.4 + Math.cos(seed * 3 + i * 1.7) * 0.3) * roughness;
    pts.push({ x: cx + Math.cos(angle) * r * noise, y: cy + Math.sin(angle) * r * noise });
  }
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
  }
  ctx.closePath();
}

const PageTransition = ({ children }) => {
  const canvasRef = useRef(null);
  const symbolRef = useRef(null);
  const nameRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const isFirstRender = useRef(true);
  const pendingLocation = useRef(null);

  // ─── ANIMACIÓN DE SALIDA ───
  const animateExit = (ctx, W, H, cx, cy, maxR, progress) => {
    const r = maxR * easeInOut(progress);
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    drawBlob(ctx, cx, cy, r, 12, 0.2, 1.1);
    ctx.fillStyle = '#0a0a09';
    ctx.fill();
    ctx.restore();

    if (progress > 0.5) {
      const logoAlpha = (progress - 0.5) / 0.5;
      if (symbolRef.current) symbolRef.current.style.opacity = logoAlpha;
      if (nameRef.current) nameRef.current.style.opacity = logoAlpha;
    }
  };

  // ─── ANIMACIÓN DE ENTRADA ───
  const animateEntry = (ctx, W, H, cx, cy, maxR, progress) => {
    const alpha = 1 - easeInOut(progress);
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    drawBlob(ctx, cx, cy, maxR, 12, 0.15, 1.1 + progress);
    ctx.fillStyle = `rgba(10, 10, 9, ${alpha})`;
    ctx.fill();
    ctx.restore();

    if (progress < 0.4) {
      const logoAlpha = 1 - progress / 0.4;
      if (symbolRef.current) symbolRef.current.style.opacity = logoAlpha;
      if (nameRef.current) nameRef.current.style.opacity = logoAlpha;
    } else {
      if (symbolRef.current) symbolRef.current.style.opacity = 0;
      if (nameRef.current) nameRef.current.style.opacity = 0;
    }
  };

  const playFullTransition = useCallback((nextLoc) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const maxR = Math.sqrt(cx * cx + cy * cy) * 1.2;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    setIsAnimating(true);
    let locationSwitched = false;

    function frame(ts) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;

      // 1. SALIDA (Mantiene la ubicación anterior)
      if (elapsed < EXIT_DURATION) {
        animateExit(ctx, W, H, cx, cy, maxR, elapsed / EXIT_DURATION);
      } 
      // 2. CAMBIO DE UBICACIÓN + HOLD
      else if (elapsed < EXIT_DURATION + HOLD_DURATION) {
        if (!locationSwitched) {
          locationSwitched = true;
          setDisplayLocation(nextLoc); // Cambiamos la ubicación que ven los Routes
          window.scrollTo(0, 0);
        }
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#0a0a09';
        ctx.fillRect(0, 0, W, H);
        if (symbolRef.current) symbolRef.current.style.opacity = 1;
        if (nameRef.current) nameRef.current.style.opacity = 1;
      } 
      // 3. ENTRADA (Revela la nueva ubicación)
      else if (elapsed < EXIT_DURATION + HOLD_DURATION + ENTRY_DURATION) {
        const progress = (elapsed - (EXIT_DURATION + HOLD_DURATION)) / ENTRY_DURATION;
        animateEntry(ctx, W, H, cx, cy, maxR, progress);
      } 
      else {
        ctx.clearRect(0, 0, W, H);
        setIsAnimating(false);
        return;
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Solo disparamos la transición si la ruta ha cambiado realmente
    if (location.pathname !== displayLocation.pathname) {
      playFullTransition(location);
    }
  }, [location, displayLocation.pathname, playFullTransition]);

  const { name } = getHomeInfo();

  return (
    <>
      <div className={`ink-transition-overlay ${isAnimating ? 'pointer-events-all' : 'pointer-events-none'}`}>
        <canvas ref={canvasRef} className="ink-canvas" />
        <div className="ink-brand">
          <div ref={symbolRef} className="ink-brand__symbol flex justify-center mb-6">
            <img src={`${import.meta.env.BASE_URL}assets/icons/logo.svg`} alt="Logo" className="w-32 md:w-48 h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
          </div>
          <div ref={nameRef} className="ink-brand__name">{name}</div>
        </div>
      </div>

      <main className="page-content is-visible">
        {/* Pasamos la ubicación persistente a los hijos */}
        {typeof children === 'function' ? children(displayLocation) : children}
      </main>
    </>
  );
};

export default PageTransition;