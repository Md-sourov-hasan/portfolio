import { useEffect, useRef } from 'react';

/**
 * useReveal — IntersectionObserver that adds .visible to .reveal elements
 * inside the given container ref.
 */
export function useReveal(containerRef) {
  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.reveal') ?? [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);
}
