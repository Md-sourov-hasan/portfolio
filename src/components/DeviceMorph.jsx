import { useRef, useEffect, useState } from 'react';

const STATES = ['phone', 'tablet', 'desktop'];
const STATE_LABELS = ['Mobile — 360dp', 'Tablet — 768dp', 'Desktop — 1280dp'];

/**
 * DeviceMorph — the signature element.
 * Listens to scroll position within the Craft section and
 * transitions through phone → tablet → desktop.
 * Falls back to a click-cycle on reduced-motion.
 */
export default function DeviceMorph({ sectionRef }) {
  const [stateIndex, setStateIndex] = useState(0);
  const reducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (reducedMotion.current) return; // use click cycle only

    const section = sectionRef?.current;
    if (!section) return;

    function handleScroll() {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const scrolled = -rect.top; // px scrolled past section top
      const progress = Math.max(0, Math.min(1, scrolled / (sectionH * 0.8)));

      // Split progress into 3 zones
      if (progress < 0.33) setStateIndex(0);
      else if (progress < 0.66) setStateIndex(1);
      else setStateIndex(2);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  // Reduced-motion: cycle on click
  function handleClick() {
    setStateIndex((i) => (i + 1) % 3);
  }

  const current = STATES[stateIndex];

  return (
    <div className="device-morph-container">
      <div className="device-morph-label" aria-hidden="true">
        {reducedMotion.current ? 'Click to cycle' : 'Scroll to adapt'}
      </div>

      <div className="device-stage">
        <div
          id="device-morph-frame"
          className={`device-frame ${current}`}
          onClick={reducedMotion.current ? handleClick : undefined}
          role={reducedMotion.current ? 'button' : undefined}
          tabIndex={reducedMotion.current ? 0 : undefined}
          aria-label={reducedMotion.current ? `Current layout: ${STATE_LABELS[stateIndex]}. Click to cycle.` : undefined}
          onKeyDown={reducedMotion.current ? (e) => e.key === 'Enter' && handleClick() : undefined}
        >
          <DeviceUI state={current} />
        </div>
      </div>

      <div className="device-state-label" aria-live="polite">
        {STATE_LABELS[stateIndex]}
      </div>

      <div className="morph-progress" aria-hidden="true">
        {STATES.map((_, i) => (
          <div
            key={i}
            className={`morph-dot${stateIndex === i ? ' active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

/* Internal: simulated widget layout that changes per device state */
function DeviceUI({ state }) {
  if (state === 'phone') {
    return (
      <div className="device-layout">
        <div className="ui-block ui-block--header" />
        <div className="ui-block" style={{ height: 32 }} />
        <div className="ui-block" style={{ height: 24 }} />
        <div className="ui-block ui-block--tall" />
      </div>
    );
  }

  if (state === 'tablet') {
    return (
      <div className="device-layout">
        <div className="ui-block ui-block--header" style={{ gridColumn: '1 / -1' }} />
        <div className="ui-block ui-block--tall" />
        <div className="ui-block" />
      </div>
    );
  }

  // desktop
  return (
    <div className="device-layout">
      <div className="ui-block ui-block--header" />
      <div className="ui-block ui-block--header" />
      <div className="ui-block ui-block--header" />
      <div className="ui-block ui-block--tall" />
      <div className="ui-block" />
      <div className="ui-block" />
    </div>
  );
}
