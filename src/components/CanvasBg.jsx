import { useEffect, useRef } from 'react';

/**
 * CanvasBg — animated Canvas2D blueprint background.
 *
 * Renders two layers:
 *   1. A fine grid of drifting lines
 *   2. A field of nested rounded-rectangle silhouettes (widget tree motif)
 *
 * Props:
 *   opacity      — base opacity multiplier (default 1, Craft section passes 1.8)
 *   panelMode    — if true, render nothing (--panel sheets use CSS grid only)
 */
export default function CanvasBg({ opacity = 1, panelMode = false }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (panelMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Colour tokens ─────────────────────────────────────────
    const CYAN = '0,240,255';

    // ── Resize helper ─────────────────────────────────────────
    let W = 0, H = 0;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Widget silhouettes (nested rounded rects) ──────────────
    // Each "widget" is a small cluster of 2-3 nested rounded rects
    // drifting very slowly across the canvas.
    const NUM_WIDGETS = 14;
    const widgets = Array.from({ length: NUM_WIDGETS }, (_, i) => ({
      x: Math.random() * 1.2 - 0.1,   // 0..1 fraction of W (allow offscreen)
      y: Math.random() * 1.2 - 0.1,
      w: 80 + Math.random() * 120,     // base width px
      h: 50 + Math.random() * 80,
      rx: 6 + Math.random() * 10,
      speed: { x: (Math.random() - 0.5) * 0.00008, y: (Math.random() - 0.5) * 0.00008 },
      layers: 2 + Math.floor(Math.random() * 2), // 2 or 3 nested rects
      alpha: 0.028 + Math.random() * 0.03,
    }));

    // ── Grid lines ─────────────────────────────────────────────
    // Two sets of slowly drifting grid lines (like a technical sheet shifting)
    const GRID = 40; // px between lines
    let gridOffset = { x: 0, y: 0 };
    const GRID_SPEED = { x: 0.006, y: 0.004 }; // px per frame

    // ── Scroll parallax ────────────────────────────────────────
    let scrollY = 0;
    function onScroll() { scrollY = window.scrollY; }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Reduced motion ─────────────────────────────────────────
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Draw one frame ─────────────────────────────────────────
    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const opacityMul = opacity;

      // --- drifting grid (removed per user request) ---

      // --- nested rounded-rect widget silhouettes ---
      widgets.forEach((w) => {
        // Parallax: widgets drift at slightly different rate to page scroll
        const parallaxShift = scrollY * 0.04 * (w.alpha / 0.04);

        const wx = w.x * W;
        // Move vertically with scroll parallax + self-drift
        const wy = (w.y * H) - (parallaxShift % (H + w.h));

        if (!reducedMotion) {
          w.x += w.speed.x;
          w.y += w.speed.y;
          // wrap
          if (w.x > 1.15) w.x = -0.15;
          if (w.x < -0.15) w.x = 1.15;
          if (w.y > 1.15) w.y = -0.15;
          if (w.y < -0.15) w.y = 1.15;
        }

        // Draw nested rects (outermost first)
        for (let l = 0; l < w.layers; l++) {
          const inset = l * 10;
          const lw = w.w - inset * 2;
          const lh = w.h - inset * 2;
          if (lw < 8 || lh < 8) break;

          const alpha = (w.alpha - l * 0.008) * opacityMul;
          if (alpha <= 0) break;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${CYAN},${alpha})`;
          ctx.lineWidth = l === 0 ? 0.8 : 0.5;
          roundRect(ctx, wx + inset, wy + inset, lw, lh, w.rx - l * 2);
          ctx.stroke();
        }
      });

      t++;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [opacity, panelMode]);

  if (panelMode) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

// ── Polyfill for roundRect (Safari 15, Chrome < 99) ──────────
function roundRect(ctx, x, y, w, h, r) {
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, Math.max(0, r));
    return;
  }
  r = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
