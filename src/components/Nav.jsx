import MonogramLogo from './MonogramLogo';

/**
 * Nav — fixed top navigation.
 * Uses the SH monogram in place of a text-only logo.
 */
export default function Nav({ scrollProgress }) {
  const links = [
    { label: 'About', href: '#about' },
    { label: 'Craft', href: '#craft' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      <nav className="nav" aria-label="Main navigation">
        <a href="#cover" className="nav-brand" aria-label="Back to top">
          <MonogramLogo size={28} />
          <span className="nav-logo">
            <strong>Sourov</strong> Hasan
          </span>
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
