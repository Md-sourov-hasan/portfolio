/**
 * SheetLabel — the architectural title block top-left of every section.
 * Props:
 *  code  — e.g. "A-01"
 *  title — e.g. "COVER"
 *  date  — optional ISO date string shown as revision
 */
export default function SheetLabel({ code, title, date }) {
  const rev = date ?? '2024';
  return (
    <div className="sheet-label" aria-hidden="true">
      <span className="sheet-num">SHEET {code}</span>
      <span>{title}</span>
      <span>REV {rev}</span>
    </div>
  );
}
