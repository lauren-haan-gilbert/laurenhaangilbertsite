import { useRef, useEffect } from 'react';
import './FlowField.css';

/*
  Flow Field — Option E
  ──────────────────────────────────────────────────────────────────
  Thousands of short lines following an invisible mathematical field.
  Like wind on a weather map, or iron filings near a magnet.

  The field evolves slowly and continuously — you always see motion.
  Every ~12 seconds a disruption fires: a point of light emerges,
  the field curls toward it, then releases into a new configuration.

  Colour is data: field angle maps to cool cyan-white. Near a
  disruption, lines shift through teal to gold at the source.
  Background: deep blue-black. Everything else follows from the math.
*/

// ── noise field ───────────────────────────────────────────────────
// layered sin/cos — smooth, no library needed
function angle(x, y, t, s) {
  return (
    Math.sin(x * 0.015 + t * 0.00014 + s) *
    Math.cos(y * 0.012 + t * 0.00011 + s * 1.5) * Math.PI +
    Math.sin((x + y) * 0.008 + t * 0.00007 + s * 0.9) * Math.PI * 0.6 +
    Math.cos((x - y) * 0.006 + t * 0.00005 + s * 0.4) * Math.PI * 0.35
  );
}

// ── colour: field angle → cyan-white spectrum ─────────────────────
function fieldColor(a, boost) {
  if (boost > 0.5) {
    // near source: gold
    const t = Math.min((boost - 0.5) * 2, 1);
    return [
      Math.round(60  + t * 195),
      Math.round(200 - t * 45),
      Math.round(215 - t * 160),
    ];
  }
  if (boost > 0) {
    // mid: teal-cyan
    const t = boost * 2;
    return [
      Math.round(0   + t * 60),
      Math.round(185 + t * 15),
      Math.round(220 - t * 5),
    ];
  }
  // resting: cool cyan-white, varies softly with angle
  const v = 0.5 + 0.5 * Math.sin(a * 0.9 + 0.3);
  return [
    Math.round(148 + v * 52),
    Math.round(192 + v * 22),
    Math.round(215 + v * 15),
  ];
}

const GAP  = 11;   // grid spacing — dense enough to read as field
const LEN  = 13;   // line length

export default function FlowField() {
  const canvasRef = useRef(null);
  const wrapRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    const ctx    = canvas.getContext('2d');

    let W = 0, H = 0, raf;

    // field seed blends between two values on disruption
    let s0 = Math.random() * 20;
    let s1 = s0;
    let st = 1;                  // 1 = settled, 0 = transitioning

    // disruption point
    let src   = null;            // { x, y, born, life }
    let nextD = Date.now() + 4000;

    const resize = () => {
      W = canvas.width  = wrap.offsetWidth;
      H = canvas.height = wrap.offsetHeight;
    };

    const disrupt = () => {
      s0    = s0 + (s1 - s0) * (1 - Math.pow(1 - Math.min(st, 1), 3));
      s1    = Math.random() * 20;
      st    = 0;
      src   = {
        x:    W * 0.15 + Math.random() * W * 0.7,
        y:    H * 0.15 + Math.random() * H * 0.7,
        born: Date.now(),
        life: 9000,
      };
      nextD = Date.now() + 13000;
    };

    let prev = 0;

    const frame = ts => {
      const dt = Math.min(ts - prev || 16, 50);
      prev = ts;

      // ── background ──────────────────────────────────────────
      ctx.fillStyle = '#080e14';
      ctx.fillRect(0, 0, W, H);

      // ── seed transition ──────────────────────────────────────
      if (st < 1) st = Math.min(st + dt / 15000, 1);
      const se = s0 + (s1 - s0) * (1 - Math.pow(1 - st, 3));

      // ── source state ─────────────────────────────────────────
      let sx = 0, sy = 0, sr = 0, sb = 0;
      if (src) {
        const age  = Date.now() - src.born;
        const prog = Math.min(age / src.life, 1);
        sb  = Math.sin(prog * Math.PI);           // 0→1→0
        sr  = (W + H) * 0.09 * sb;               // radius grows with brightness
        sx  = src.x;
        sy  = src.y;
        if (prog >= 1) src = null;
      }

      // ── draw field ───────────────────────────────────────────
      const cols = Math.ceil(W / GAP) + 1;
      const rows = Math.ceil(H / GAP) + 1;

      // ripple phase — slow wave across heads for continuous shimmer
      const rp = ts * 0.00042;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * GAP;
          const cy = r * GAP;

          // base field angle
          let a = angle(cx, cy, ts, se);

          // source pull — lines curl toward it
          let boost = 0;
          if (sr > 0) {
            const dx   = sx - cx;
            const dy   = sy - cy;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const pull = Math.max(0, 1 - dist / (sr * 3.2));
            if (pull > 0) {
              const toward = Math.atan2(dy, dx);
              const diff   = toward - a;
              a += Math.atan2(Math.sin(diff), Math.cos(diff)) * pull * sb * 0.6;
              boost = pull * sb;
            }
          }

          // edge vignette
          const ev = Math.min(
            cx / (W * 0.06), (W - cx) / (W * 0.06),
            cy / (H * 0.06), (H - cy) / (H * 0.06),
            1
          );

          // head brightness: base ripple + boost
          const rip   = 0.5 + 0.5 * Math.sin((cx + cy) * 0.021 + rp);
          const ha    = (0.20 + rip * 0.40 + boost * 0.40) * ev;
          if (ha < 0.04) continue;

          const [r2, g, b] = fieldColor(a, boost);

          const cos = Math.cos(a);
          const sin = Math.sin(a);
          const x1  = cx - cos * LEN * 0.42;
          const y1  = cy - sin * LEN * 0.42;
          const x2  = cx + cos * LEN * 0.58;
          const y2  = cy + sin * LEN * 0.58;

          // line: invisible tail → bright head
          const grd = ctx.createLinearGradient(x1, y1, x2, y2);
          grd.addColorStop(0,   `rgba(${r2},${g},${b},0)`);
          grd.addColorStop(0.5, `rgba(${r2},${g},${b},${ha * 0.3})`);
          grd.addColorStop(1,   `rgba(${r2},${g},${b},${ha})`);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = grd;
          ctx.lineWidth   = 0.8 + boost * 0.55;
          ctx.stroke();

          // bright head dot
          if (ha > 0.1) {
            ctx.beginPath();
            ctx.arc(x2, y2, 0.75 + boost * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r2},${g},${b},${ha * 0.88})`;
            ctx.fill();
          }
        }
      }

      // ── source glow ──────────────────────────────────────────
      if (sr > 0) {
        const g1 = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 2.8);
        g1.addColorStop(0,    `rgba(255,240,130,${sb * 0.75})`);
        g1.addColorStop(0.10, `rgba(210,170,55,${sb  * 0.52})`);
        g1.addColorStop(0.28, `rgba(30,200,215,${sb  * 0.34})`);
        g1.addColorStop(0.55, `rgba(0,155,195,${sb   * 0.16})`);
        g1.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(sx, sy, sr * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = g1;
        ctx.fill();

        // core
        const g2 = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 0.28);
        g2.addColorStop(0, `rgba(255,252,225,${sb * 0.92})`);
        g2.addColorStop(1, 'rgba(220,170,60,0)');
        ctx.beginPath();
        ctx.arc(sx, sy, sr * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();

        // single ring
        ctx.beginPath();
        ctx.arc(sx, sy, sr * 0.85, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(80,205,218,${sb * 0.20})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }

      if (Date.now() > nextD) disrupt();

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="ff-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} className="ff-canvas" />
      <div className="ff-label">
        <p>Disruption arrives as light.</p>
        <p>The pattern reforms.</p>
      </div>
    </div>
  );
}
