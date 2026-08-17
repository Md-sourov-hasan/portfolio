/**
 * MonogramLogo — SVG monogram "SH" built from nested rounded rectangles.
 * Matches the blueprint geometric language. Small + quiet by design.
 */
export default function MonogramLogo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Md Sourov Hasan monogram"
      role="img"
      className={className}
    >
      {/* Outer rounded-rect frame — reads as widget container */}
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="5"
        stroke="#4FB6AE"
        strokeWidth="1.2"
        opacity="0.55"
      />

      {/* Inner rounded-rect — nested widget, slightly inset */}
      <rect
        x="5"
        y="5"
        width="22"
        height="22"
        rx="3.5"
        stroke="#4FB6AE"
        strokeWidth="1"
        opacity="0.35"
      />

      {/* "S" stroke — left vertical bar + curved top + curved bottom */}
      <path
        d="M10.5 21 C10.5 22.1 11.4 23 12.5 23 L14.5 23 C15.6 23 16.5 22.1 16.5 21 C16.5 19.9 15.6 19 14.5 19 L12.5 19 C11.4 19 10.5 18.1 10.5 17 C10.5 15.9 11.4 15 12.5 15 L14.5 15 C15.6 15 16.5 14.1 16.5 13 C16.5 11.9 15.6 11 14.5 11 L12.5 11 C11.4 11 10.5 11.9 10.5 13"
        stroke="#4FB6AE"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* "H" stroke — two verticals + crossbar */}
      <path
        d="M19 11 L19 23 M19 17 L23 17 M23 11 L23 23"
        stroke="#4FB6AE"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}
