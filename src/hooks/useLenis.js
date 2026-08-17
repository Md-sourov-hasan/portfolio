import { useEffect, useRef } from 'react';

/**
 * useLenis — initialises Lenis smooth scroll and ticks it via rAF.
 * Returns the lenis instance so GSAP ScrollTrigger can sync to it.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;
    let rafId;

    async function init() {
      const { default: Lenis } = await import('lenis');

      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });

      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return lenisRef;
}
