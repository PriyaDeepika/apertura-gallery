/**
 * Generates the 8 blade polygons of a camera-aperture iris for a given
 * "openness" value (0 = fully closed / twisted shutter, 1 = fully open /
 * wide circular aperture). Used to animate the iris opening and closing
 * as the user scrolls through the hero section — both the inner AND
 * outer edge of each blade move, so the motion stays visible even where
 * only the outer ring of the iris is shown (e.g. behind a radial mask).
 */

const N = 8;
const CX = 100;
const CY = 100;
const RIM_R = 95; // fixed pivot anchor — true outer rim, never moves

const OUTER_R_MIN = 60;
const OUTER_R_MAX = 95;
const INNER_R_MIN = 8;
const INNER_R_MAX = 35;
const TWIST_MAX = 0.55;
const TWIST_MIN = 0.25;

export function getApertureBlades(openness: number): string[] {
  const t = Math.max(0, Math.min(1, openness));
  const outerR = OUTER_R_MIN + t * (OUTER_R_MAX - OUTER_R_MIN);
  const innerR = INNER_R_MIN + t * (INNER_R_MAX - INNER_R_MIN);
  const twist = TWIST_MAX - t * (TWIST_MAX - TWIST_MIN);

  const blades: string[] = [];
  for (let i = 0; i < N; i++) {
    const angle = (2 * Math.PI * i) / N;
    const nextAngle = (2 * Math.PI * (i + 1)) / N;
    const midAngle = (angle + nextAngle) / 2;

    const p1x = CX + RIM_R * Math.cos(angle);
    const p1y = CY + RIM_R * Math.sin(angle);
    const p2x = CX + outerR * Math.cos(nextAngle - twist * 0.5);
    const p2y = CY + outerR * Math.sin(nextAngle - twist * 0.5);
    const p3x = CX + innerR * Math.cos(midAngle + twist);
    const p3y = CY + innerR * Math.sin(midAngle + twist);
    const p4x = CX + innerR * Math.cos(angle + twist * 0.43);
    const p4y = CY + innerR * Math.sin(angle + twist * 0.43);

    blades.push(
      `${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)} ${p3x.toFixed(1)},${p3y.toFixed(1)} ${p4x.toFixed(1)},${p4y.toFixed(1)}`
    );
  }
  return blades;
}
