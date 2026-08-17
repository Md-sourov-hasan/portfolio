import { useRef } from 'react';
import CanvasBg from './CanvasBg';
import SheetLabel from './SheetLabel';
import DeviceMorph from './DeviceMorph';
import { useReveal } from '../hooks/useReveal';

const SKILL_GROUPS = [
  {
    id: 'languages_framework',
    label: 'Languages & Framework',
    tags: ['Flutter', 'Dart', 'C'],
  },
  {
    id: 'state_arch',
    label: 'State & Architecture',
    tags: ['GetX', 'Feature-First Folder Structure'],
  },
  {
    id: 'api_storage',
    label: 'API & Local Storage',
    tags: ['REST API', 'HTTP Package', 'WebSocket', 'GraphQL', 'SharedPreferences', 'sqflite'],
  },
  {
    id: 'maps_payment',
    label: 'Maps & Payments',
    tags: ['Google Maps', 'Flutter Map', 'Stripe', 'PhonePe'],
  },
  {
    id: 'features_tools',
    label: 'Mobile Features & Tools',
    tags: ['Deep Linking', 'Push Notifications', 'Responsive UI', 'Git', 'GitHub', 'Postman', 'Swagger', 'Figma', 'Android Studio', 'VS Code'],
  },
];

export default function CraftSheet() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="craft" className="sheet" ref={ref} aria-label="Craft and skills">
      {/* Canvas background brightens in Craft section to sync with device-morph */}
      <CanvasBg opacity={1.8} />
      <div className="corner-frame" aria-hidden="true" />
      <SheetLabel code="A-03" title="CRAFT" date="2024" />
      <div className="sheet-num-corner" aria-hidden="true">SPEC · FLUTTER</div>

      <div className="sheet-inner">
        <div className="craft-layout">
          {/* Left: heading + skill groups */}
          <div>
            <h2 className="craft-heading reveal">
              Tools that
              <br />
              ship product.
            </h2>

            <div className="skill-groups">
              {SKILL_GROUPS.map((group, i) => (
                <div
                  key={group.id}
                  className={`skill-group reveal reveal-delay-${Math.min(i + 1, 4)}`}
                >
                  <div className="skill-group-title">{group.label}</div>
                  <div className="skill-tags">
                    {group.tags.map((tag) => (
                      <span key={tag} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Device morph demo */}
          <aside aria-label="Flutter adaptive layout demo">
            <DeviceMorph sectionRef={ref} />
          </aside>
        </div>
      </div>
    </section>
  );
}
