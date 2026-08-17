import { useRef } from 'react';
import CanvasBg from './CanvasBg';
import SheetLabel from './SheetLabel';
import { useReveal } from '../hooks/useReveal';

const LINKS = [
  {
    id: 'email',
    label: 'Email',
    value: 'mdsourovhasan2552@gmail.com',
    href: 'mailto:mdsourovhasan2552@gmail.com',
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+880 1940-016411',
    href: 'tel:+8801940016411',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/Md-sourov-hasan',
    href: 'https://github.com/Md-sourov-hasan',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/md-sourov-hasan-1692333a2',
    href: 'https://www.linkedin.com/in/md-sourov-hasan-1692333a2/',
  },
];

const REFERENCES = [
  {
    name: 'Shakil Khan',
    role: 'Chief Executive (Mobile Apps)',
    company: 'Softvence, Betopia Group',
    phone: '+880 1647-383443',
    linkedin: 'https://www.linkedin.com/in/shakil-khan-796384200',
  },
  {
    name: 'Asifuzzaman Asif',
    role: 'Machine Learning Engineer',
    company: 'THT-Space Electrical Co.',
    phone: '+880 1624-223544',
    linkedin: 'https://www.linkedin.com/in/asif734',
  },
  {
    name: 'Solaiman (Shanto) Hossain',
    role: 'AI Engineer',
    company: 'Sofof Tech',
    phone: '+880 1914-622617',
    linkedin: 'https://www.linkedin.com/in/imsnto/',
  },
  {
    name: 'Md. Sakib Al Hasan',
    role: 'Senior Backend Developer',
    company: 'Softvence, Betopia Group',
    phone: '+880 1625-457343',
    linkedin: 'https://www.linkedin.com/in/md-sakib-al-hasan-46942126b',
  },
];

export default function ContactSheet() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="contact" className="sheet sheet--panel" ref={ref} aria-label="Contact">
      <CanvasBg panelMode={true} />
      <div className="corner-frame" aria-hidden="true" />
      <SheetLabel code="A-06" title="CONTACT & REFERENCES" date="2026" />
      <div className="sheet-num-corner" aria-hidden="true">END OF SET</div>

      <div className="sheet-inner">
        <div className="contact-inner">
          {/* Left: headline */}
          <div>
            <h2 className="contact-heading reveal">
              Let's build
              <br />
              <em>something</em>
              <br />
              that ships.
            </h2>
            <p className="contact-subline reveal reveal-delay-2">
              Passionate Flutter Developer ready for mobile engineering opportunities. Reach out via email, phone, or LinkedIn.
            </p>
          </div>

          {/* Right: links */}
          <nav aria-label="Contact links" className="reveal reveal-delay-2">
            <ul style={{ listStyle: 'none' }}>
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    id={`contact-${l.id}`}
                    href={l.href}
                    className="contact-link-row"
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={`${l.label}: ${l.value}`}
                  >
                    <div>
                      <div className="contact-link-label">{l.label}</div>
                      <div className="contact-link-value">{l.value}</div>
                    </div>
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
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* References Section */}
        <div className="references-section reveal reveal-delay-3" style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(79, 182, 174, 0.15)' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.14em', color: 'var(--brass)', textTransform: 'uppercase', marginBottom: '20px' }}>
            Professional References
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {REFERENCES.map((refItem, i) => (
              <div key={i} style={{ background: 'rgba(16, 28, 41, 0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(79, 182, 174, 0.15)', padding: '16px 20px', borderRadius: '6px' }}>
                <div style={{ fontWeight: '600', color: 'var(--paper)', fontSize: '0.95rem' }}>{refItem.name}</div>
                <div style={{ color: 'var(--cyan)', fontSize: '0.8rem', marginTop: '2px' }}>{refItem.role}</div>
                <div style={{ color: 'var(--mist)', fontSize: '0.75rem' }}>{refItem.company}</div>
                {refItem.phone && <div style={{ color: 'var(--mist)', fontSize: '0.75rem', marginTop: '4px' }}>📞 {refItem.phone}</div>}
                <a href={refItem.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '0.7rem', color: 'var(--brass)', marginTop: '6px' }}>
                  LinkedIn Profile →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <span>Md. Sourov Hasan · Khilkhet, Dhaka, Bangladesh · {new Date().getFullYear()}</span>
          <span>Flutter Developer · Softvence, Betopia Group</span>
        </footer>
      </div>
    </section>
  );
}
