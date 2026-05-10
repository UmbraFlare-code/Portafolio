import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './PageTransition.css';

/**
 * PageTransition — location-change driven splash overlay.
 *
 * Flow:
 *  1. On first load OR on route change, the overlay covers the viewport instantly
 *  2. Branding animation plays while the new page mounts & fetches data underneath
 *  3. After a minimum splash duration, the overlay exits — revealing the loaded page
 *
 * No special Link components needed — works with plain <Link> and useNavigate.
 */

const MIN_SPLASH_MS = 1400;      // Minimum splash duration on first load
const MIN_TRANSITION_MS = 900;   // Minimum splash on page-to-page navigation

const PageTransition = ({ children }) => {
  const overlayRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const brandRef = useRef(null);
  const lineRef = useRef(null);
  const scanlinesRef = useRef(null);
  const glitchRefs = useRef([]);
  const isFirstRender = useRef(true);
  const currentTimeline = useRef(null);

  const location = useLocation();
  const [contentVisible, setContentVisible] = useState(false);

  const setGlitchRef = (el, idx) => {
    if (el) glitchRefs.current[idx] = el;
  };

  // ── Play the splash (cover + branding + reveal) ──
  const playSplash = (isIntro = false) => {
    // Kill any running timeline
    if (currentTimeline.current) {
      currentTimeline.current.kill();
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.style.pointerEvents = 'all';

    const minDuration = isIntro ? MIN_SPLASH_MS : MIN_TRANSITION_MS;
    const splashStart = Date.now();

    // ── Instant cover: panels at full scale ──
    gsap.set([leftPanelRef.current, rightPanelRef.current], { scaleX: 1 });
    gsap.set(brandRef.current, { opacity: 0, y: 20 });
    gsap.set(lineRef.current, { width: 0 });
    gsap.set(scanlinesRef.current, { opacity: 0 });
    gsap.set(glitchRefs.current, { opacity: 0, scaleX: 0 });

    // ── Phase 1: Branding enters ──
    const tl = gsap.timeline();
    currentTimeline.current = tl;

    tl.to(scanlinesRef.current, { opacity: 1, duration: 0.25 }, 0.05)
      .to(brandRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.1)
      .to(lineRef.current, { width: 120, duration: 0.3, ease: 'power2.out' }, 0.25)
      .to(glitchRefs.current, {
        opacity: 0.8,
        scaleX: 1,
        duration: 0.15,
        stagger: 0.04,
        ease: 'power3.out',
      }, 0.3)

      // ── Phase 2: Wait for minimum splash time, then reveal ──
      .call(() => {
        const elapsed = Date.now() - splashStart;
        const remaining = Math.max(0, minDuration - elapsed);

        // Show children so React renders them behind the overlay
        setContentVisible(true);

        setTimeout(() => {
          // ── Phase 3: Exit animation ──
          const exitTl = gsap.timeline({
            onComplete: () => {
              overlay.style.pointerEvents = 'none';
              currentTimeline.current = null;
            },
          });

          exitTl
            .to(brandRef.current, { opacity: 0, y: -20, duration: 0.25, ease: 'power2.in' })
            .to(lineRef.current, { width: 0, duration: 0.2, ease: 'power2.in' }, '<')
            .to(glitchRefs.current, { opacity: 0, scaleX: 0, duration: 0.15, stagger: 0.02 }, '<')
            .to(scanlinesRef.current, { opacity: 0, duration: 0.15 }, '<')
            .to(leftPanelRef.current, { scaleX: 0, duration: 0.5, ease: 'power4.inOut' })
            .to(rightPanelRef.current, { scaleX: 0, duration: 0.5, ease: 'power4.inOut' }, '<');

          currentTimeline.current = exitTl;
        }, remaining);
      });
  };

  // ── On location change (including first load) ──
  useEffect(() => {
    window.scrollTo(0, 0);

    if (isFirstRender.current) {
      // First load: content hidden, show full intro splash
      isFirstRender.current = false;
      setContentVisible(false);
      playSplash(true);
    } else {
      // Subsequent navigation: hide content, play transition splash
      setContentVisible(false);
      playSplash(false);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Overlay — always mounted, animated by GSAP */}
      <div ref={overlayRef} className="page-transition-overlay" style={{ pointerEvents: 'all' }}>
        {/* Left panel */}
        <div
          ref={leftPanelRef}
          className="transition-panel transition-panel--left"
          style={{ right: '50%', transform: 'scaleX(1)' }}
        />
        {/* Right panel */}
        <div
          ref={rightPanelRef}
          className="transition-panel transition-panel--right"
          style={{ left: '50%', transform: 'scaleX(1)' }}
        />

        {/* Scanlines */}
        <div ref={scanlinesRef} className="transition-scanlines" />

        {/* Center brand */}
        <div ref={brandRef} className="transition-brand">
          <div className="transition-brand__icon" />
          <span className="transition-brand__name">Francis Maxuel</span>
          <div ref={lineRef} className="transition-brand__line" />
        </div>

        {/* Glitch blocks */}
        <div ref={(el) => setGlitchRef(el, 0)} className="transition-glitch transition-glitch--tl" />
        <div ref={(el) => setGlitchRef(el, 1)} className="transition-glitch transition-glitch--tr" />
        <div ref={(el) => setGlitchRef(el, 2)} className="transition-glitch transition-glitch--bl" />
        <div ref={(el) => setGlitchRef(el, 3)} className="transition-glitch transition-glitch--br" />
      </div>

      {/* Page content — rendered behind the overlay, hidden until splash is done */}
      <div style={{ opacity: contentVisible ? 1 : 0 }}>
        {children}
      </div>
    </>
  );
};

export default PageTransition;
