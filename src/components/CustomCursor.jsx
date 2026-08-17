import { useEffect, useRef } from 'react';

/**
 * CustomCursor — Interactive dual-element trailing cursor.
 * - Inner glowing cyan dot follows mouse quickly.
 * - Outer glowing ring trails smoothly behind dot (physics Lerp).
 * - When mouse stops, ring settles perfectly centered around the dot.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let dotX = mouseX;
    let dotY = mouseY;

    let ringX = mouseX;
    let ringY = mouseY;

    let isVisible = false;
    let isHovered = false;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check hover state over interactive elements
      const target = e.target;
      const isClickable = target && target.closest('a, button, input, select, textarea, [role="button"], .sheet-card, .cover-cta, .nav-link');
      isHovered = Boolean(isClickable);
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const animate = () => {
      // Inner Dot smoothly trails mouse (smoother duration: 0.20)
      dotX += (mouseX - dotX) * 0.20;
      dotY += (mouseY - dotY) * 0.20;

      // Outer Ring has extended fluid trailing duration (lerp speed: 0.068)
      ringX += (mouseX - ringX) * 0.068;
      ringY += (mouseY - ringY) * 0.068;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.4 : 1})`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.6 : 1})`;
        if (isHovered) {
          ringRef.current.classList.add('cursor-ring--hover');
        } else {
          ringRef.current.classList.remove('cursor-ring--hover');
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}
