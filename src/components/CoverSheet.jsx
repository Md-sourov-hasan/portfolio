import { useRef } from 'react';
import CanvasBg from './CanvasBg';
import SheetLabel from './SheetLabel';
import { useReveal } from '../hooks/useReveal';

export default function CoverSheet() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="cover" className="sheet" ref={ref} aria-label="Cover">
      <CanvasBg opacity={1} />
      <div className="corner-frame" aria-hidden="true" />
      <SheetLabel code="A-01" title="COVER" date="2024" />
      <div className="sheet-num-corner" aria-hidden="true">23.998°N / 90.278°E</div>

      <div className="sheet-inner">
        <div className="cover-inner">
          {/* Left: headline */}
          <div>
            <h1 className="cover-headline reveal">
              Md&nbsp;Sourov
              <br />
              <em>Hasan</em>
            </h1>
            <p className="cover-tagline reveal reveal-delay-2">
              Flutter Developer. Building production-ready cross-platform apps across Healthcare, AI, Delivery & Fitness.
              <br />
              <span style={{ color: 'var(--brass)', fontStyle: 'italic', fontSize: '0.9em', display: 'inline-block', marginTop: '8px' }}>
                ⚡ "No money, No cash — I am the Fan of Yellow Flash"
              </span>
            </p>
          </div>

          {/* Right: meta + CTA */}
          <div className="cover-meta reveal reveal-delay-3">
            <div className="cover-coords">
              <span>Flutter / Dart / GetX</span>
              <span>Softvence, Betopia Group</span>
              <span>Khilkhet, Dhaka, BD</span>
              <span>12+ Projects Shipped</span>
            </div>

            <a
              href="#contact"
              id="cover-cta"
              className="cover-cta"
              aria-label="Go to contact section"
            >
              <span>Start a project</span>
              <svg
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M6 2v8M3 7l3 3 3-3" />
        </svg>
      </div>
    </section>
  );
}
