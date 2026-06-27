/**
 * Ambient background — a small, fixed number of soft pastel blobs that
 * give the page color and depth without being expensive to render.
 *
 * Deliberately NOT using Framer Motion / useScroll here: animating
 * filter-blurred elements on every scroll tick (especially underneath
 * backdrop-filter glass panels) forces the browser into repeated
 * offscreen compositing and can pin a CPU core / spike fans. A static
 * background (optionally drifting via a slow, GPU-cheap CSS transform
 * animation) gives the same visual depth for a fraction of the cost.
 */
export default function AmbientBackground() {
  const blobs = [
    { top: "-6%", left: "-10%", size: 560, wash: "var(--wash-blue)" },
    { top: "18%", right: "-12%", size: 520, wash: "var(--wash-amber)" },
    { top: "48%", left: "-8%", size: 540, wash: "var(--wash-teal)" },
    { top: "78%", right: "-10%", size: 500, wash: "var(--wash-violet)" },
  ];

  return (
    <div className="ambient-field" aria-hidden>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="ambient-blob"
          style={{
            top: b.top,
            left: "left" in b ? b.left : undefined,
            right: "right" in b ? b.right : undefined,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 50% 50%, ${b.wash}, transparent 72%)`,
            animationDelay: `${i * -3}s`,
          }}
        />
      ))}
    </div>
  );
}
