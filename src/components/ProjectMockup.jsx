/**
 * ProjectMockup — Clean, direct 3D Smartphone Mockup display.
 * Uses async decoding and explicit dimensions to prevent layout recalculations & scroll stutter.
 */

const MOCKUPS = {
  biovue: '/images/mockups/biovue.png',
  alurei: '/images/mockups/alurei.png',
  quickle: '/images/mockups/quickle.png',
  alipacino: '/images/mockups/alipacino.png',
  hyxp: '/images/mockups/hyxp.png',
};

export default function ProjectMockup({ projectId }) {
  const imgSrc = MOCKUPS[projectId] || MOCKUPS.biovue;

  return (
    <div className="project-mockup-wrapper" aria-hidden="true">
      <img
        src={imgSrc}
        alt="3D Device Mockup"
        className="project-phone-img"
        width="600"
        height="800"
        decoding="async"
      />
    </div>
  );
}
