import { useRef } from 'react';
import CanvasBg from './CanvasBg';
import SheetLabel from './SheetLabel';
import { useReveal } from '../hooks/useReveal';

export default function AboutSheet() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="about" className="sheet sheet--panel" ref={ref} aria-label="About">
      <CanvasBg panelMode={true} />
      <div className="corner-frame" aria-hidden="true" />
      <SheetLabel code="A-02" title="ABOUT" date="2024" />
      <div className="sheet-num-corner" aria-hidden="true">DHK · BD</div>

      <div className="sheet-inner">
        <div className="about-grid">
          {/* Left: heading + stats */}
          <div>
            <h2 className="about-heading reveal">
              Building
              <span>for every</span>
              screen.
            </h2>

            <div className="about-stats reveal reveal-delay-2">
              <div className="stat-row">
                <span className="stat-num">6+</span>
                <span className="stat-label">Months Pro Experience at Softvence</span>
              </div>
              <div className="stat-row">
                <span className="stat-num">12+</span>
                <span className="stat-label">Mobile App Projects Contributed</span>
              </div>
              <div className="stat-row">
                <span className="stat-num">5</span>
                <span className="stat-label">Domain Verticals (Healthcare, AI, Delivery, Fitness)</span>
              </div>
            </div>
          </div>

          {/* Right: bio text */}
          <div className="about-body reveal reveal-delay-2">
            <p>
              Based in <strong>Khilkhet, Dhaka</strong>, I am a Flutter Developer at <strong>Softvence, Betopia Group</strong> —
              developing high-quality cross-platform mobile applications using <strong>Flutter and Dart</strong>.
            </p>
            <p>
              My expertise spans <strong>GetX state management, Feature-First architecture, RESTful APIs, Google Maps, Flutter Map, Deep Linking, Push Notifications</strong>, and payment integrations (<strong>Stripe & PhonePe</strong>).
            </p>
            <p>
              Having contributed to over 12 projects across Healthcare, AI, Food Delivery, Restaurant Management, and Fitness, I collaborate seamlessly with Agile teams of 10–45 engineers to build maintainable, user-centric products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
