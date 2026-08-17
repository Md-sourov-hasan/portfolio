import { useRef } from 'react';
import CanvasBg from './CanvasBg';
import SheetLabel from './SheetLabel';
import ProjectMockup from './ProjectMockup';
import { useReveal } from '../hooks/useReveal';

const PROJECTS = [
  {
    id: 'biovue',
    num: 'P-001',
    name: 'BioVue — AI Healthcare & Wellness',
    outcome: 'Intelligent AI healthcare platform visualizing health projections (6m, 1y, 5y). Features User & Trainer modules, nutrition tracking, workout plans, and real-time health insights.',
    tech: ['Flutter', 'Dart', 'GetX', 'REST API', 'SharedPreferences', 'Firebase', 'Deep Linking'],
    link: 'https://github.com/Md-sourov-hasan',
  },
  {
    id: 'alurei',
    num: 'P-002',
    name: 'Alurei — AI Children Care Platform',
    outcome: 'Multi-role platform for Parents & Nannies. Features AI activity analysis, scheduled task execution with photo proof verification, and AI-generated bedtime stories.',
    tech: ['Flutter', 'Dart', 'GetX', 'REST API', 'SharedPreferences', 'Firebase', 'Deep Linking'],
    link: 'https://github.com/Md-sourov-hasan',
  },
  {
    id: 'quickle',
    num: 'P-003',
    name: 'Quickle — Multi-Role Delivery System',
    outcome: 'On-demand delivery ecosystem across 3 apps (User, Rider, Vendor). Built User app with Google Maps real-time driver tracking, Stripe/PhonePe payments, and push notifications.',
    tech: ['Flutter', 'Dart', 'GetX', 'Google Maps', 'REST API', 'Stripe', 'PhonePe', 'Deep Linking'],
    link: 'https://github.com/Md-sourov-hasan',
  },
  {
    id: 'alipacino',
    num: 'P-004',
    name: 'Alipacino — Restaurant & Food Delivery',
    outcome: 'Multi-branch restaurant management system. Built Rider app with Flutter Map live route optimization, offline data persistence via SharedPreferences, and Stripe payment gateway.',
    tech: ['Flutter', 'Dart', 'GetX', 'Flutter Map', 'Stripe', 'REST API', 'SharedPreferences'],
    link: 'https://github.com/Md-sourov-hasan',
  },
  {
    id: 'hyxp',
    num: 'P-005',
    name: 'HYXP — Smart Gym Assistant',
    outcome: 'Smart fitness app scanning QR/NFC on gym equipment to display exercise guides, video tutorials, and AI-recommended workout sets and rest intervals.',
    tech: ['Flutter', 'Dart', 'GetX', 'REST API', 'SharedPreferences', 'Deep Linking'],
    link: 'https://github.com/Md-sourov-hasan',
  },
];

export default function WorkSheet() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="work" className="sheet sheet--panel" ref={ref} aria-label="Selected work">
      <CanvasBg panelMode={true} />
      <div className="corner-frame" aria-hidden="true" />
      <SheetLabel code="A-04" title="SELECTED WORK" date="2024" />
      <div className="sheet-num-corner" aria-hidden="true">04 / 06</div>

      <div className="sheet-inner">
        <h2 className="work-sheet-heading reveal">Selected work.</h2>

        <div className="projects-grid reveal reveal-delay-1">
          {PROJECTS.map((p) => (
            <article key={p.id} className="project-card" id={`project-${p.id}`}>
              {/* Top metadata */}
              <div className="project-card-header">
                <div className="project-num">{p.num}</div>
                <h3 className="project-name">{p.name}</h3>
              </div>

              {/* Consistent custom device mockup */}
              <ProjectMockup projectId={p.id} />

              <p className="project-outcome">{p.outcome}</p>

              <div className="project-tech" aria-label="Technologies used">
                {p.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <a
                href={p.link}
                className="project-link"
                id={`project-${p.id}-link`}
                aria-label={`View project ${p.name}`}
              >
                <span>View project</span>
                <svg
                  viewBox="0 0 14 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="14"
                  height="8"
                  aria-hidden="true"
                >
                  <path d="M1 4h12M9 1l3 3-3 3" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
