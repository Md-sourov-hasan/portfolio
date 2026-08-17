import { useRef } from 'react';
import CanvasBg from './CanvasBg';
import SheetLabel from './SheetLabel';
import { useReveal } from '../hooks/useReveal';

const TIMELINE = [
  {
    id: 'softvence',
    year: 'February 2026 — August 2026',
    role: 'Flutter Developer',
    company: 'Softvence, Betopia Group — Dhaka, Bangladesh',
    desc: 'Developed cross-platform mobile applications using Flutter & Dart across Healthcare, AI, Food Delivery, Restaurant Management, and Fitness domains. Built pixel-perfect responsive UIs from Figma, integrated REST APIs with GetX, implemented Deep Linking, Push Notifications, Google Maps, Flutter Map, and Stripe/PhonePe payment gateways.',
  },
  {
    id: 'hsc',
    year: 'Ongoing',
    role: 'Higher Secondary Certificate (HSC)',
    company: 'Ashulia College',
    desc: 'Currently pursuing HSC education while building production Flutter applications.',
  },
  {
    id: 'ssc',
    year: '2025',
    role: 'Secondary School Certificate (SSC)',
    company: 'Dhalakundo High School — Dhaka Board',
    desc: 'Science Group — GPA: 3.50 / 5.00',
  },
];

export default function ExperienceSheet() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="experience" className="sheet" ref={ref} aria-label="Experience">
      <CanvasBg opacity={1} />
      <div className="corner-frame" aria-hidden="true" />
      <SheetLabel code="A-05" title="EXPERIENCE" date="2024" />
      <div className="sheet-num-corner" aria-hidden="true">05 / 06</div>

      <div className="sheet-inner">
        <div className="experience-layout">
          {/* Left: heading */}
          <div>
            <h2 className="experience-heading reveal">
              Where the
              <br />
              work came
              <br />
              from.
            </h2>
          </div>

          {/* Right: timeline */}
          <div className="reveal reveal-delay-1">
            <ol className="timeline" aria-label="Work history timeline">
              {TIMELINE.map((item) => (
                <li
                  key={item.id}
                  id={`timeline-${item.id}`}
                  className="timeline-item"
                >
                  <div className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-role">{item.role}</div>
                  <div className="timeline-company">{item.company}</div>
                  <p className="timeline-desc">{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
