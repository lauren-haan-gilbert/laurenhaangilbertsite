import { useEffect, useRef } from 'react';
import './ThoughtProcessBlock.css';

const LINES = [
  { id: 't0', text: 'What would change for a real person if this worked?' },
  { id: 't1', text: 'What else is true?' },
  { id: 't2', text: 'Where are we pushing harder instead of stepping back?' },
  { id: 't3', text: "What's the smallest thing that could help?" },
  { id: 't4', text: "Let's find out together.", isFinal: true },
];

const NODE_FILES = [
  'aqua', 'darkblue', 'green', 'indigo', 'magenta',
  'olive', 'paleblue', 'pink', 'yellow', 'violet', 'turquoise'
];

const CHAR_MS    = 51;
const HOLD_MS    = 2800;
const FADE_MS    = 1400;
const GAP_MS     = 400;
const HOLD_FINAL = 3600;
const RESTART_MS = 1800;
const SLOW       = 0.28;

export default function ThoughtProcessBlock() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const stateRef   = useRef({ step: -1, active: false, timers: [] });

  // Canvas node animation
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    let nodes = [], W, H, animId;

    const imgs = NODE_FILES.map(name => {
      const i = new Image();
      i.src = `/nodes/${name}_node.png`;
      return i;
    });

    function makeNode(imgIndex) {
      const size = 160 + Math.random() * 220;
      const isTurquoise = imgIndex === 10;
      return {
        cx: 0.1 * W + Math.random() * 0.8 * W,
        cy: 0.1 * H + Math.random() * 0.8 * H,
        size, img: imgs[imgIndex],
        orbitR:     50 + Math.random() * 90,
        orbitSpd:   (0.00015 + Math.random() * 0.00025) * SLOW * (Math.random() < 0.5 ? 1 : -1),
        orbitAngle: Math.random() * Math.PI * 2,
        orbitTilt:  Math.random() * Math.PI,
        spin:       Math.random() * Math.PI * 2,
        spinSpd:    (0.0002 + Math.random() * 0.0003) * SLOW * (isTurquoise ? 0.8 : 1) * (Math.random() < 0.5 ? 1 : -1),
        baseOpacity: 0.55 + Math.random() * 0.30,
        pulseSpd:   0.00025 + Math.random() * 0.0004,
        pulsePhase: Math.random() * Math.PI * 2,
        vx: 0, vy: 0,
      };
    }

    function resize() {
      W = canvas.width  = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
      if (!nodes.length) {
        const indices = NODE_FILES.map((_, i) => i).sort(() => Math.random() - 0.5);
        indices.forEach(i => nodes.push(makeNode(i)));
      }
    }

    function repulse() {
      const MIN = 200;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].cx - nodes[i].cx, dy = nodes[j].cy - nodes[i].cy;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          if (d < MIN) {
            const f = (MIN - d) / MIN * 0.45;
            const fx = (dx / d) * f, fy = (dy / d) * f;
            nodes[i].vx -= fx; nodes[i].vy -= fy;
            nodes[j].vx += fx; nodes[j].vy += fy;
          }
        }
      }
    }

    let lastT = 0;
    function draw(ts) {
      const dt = Math.min(ts - lastT, 50); lastT = ts;
      ctx.clearRect(0, 0, W, H);
      repulse();
      nodes.forEach(n => {
        n.orbitAngle += n.orbitSpd * dt;
        n.spin       += n.spinSpd  * dt;
        n.cx += n.vx * dt * 0.02; n.cy += n.vy * dt * 0.02;
        n.vx *= 0.94; n.vy *= 0.94;
        const pad = n.size * 0.4;
        n.cx = Math.max(pad, Math.min(W - pad, n.cx));
        n.cy = Math.max(pad, Math.min(H - pad, n.cy));
        const ox    = Math.cos(n.orbitAngle) * n.orbitR;
        const oy    = Math.sin(n.orbitAngle + n.orbitTilt) * n.orbitR * 0.55;
        const pulse = 0.5 + 0.5 * Math.sin(ts * n.pulseSpd + n.pulsePhase);
        const alpha = n.baseOpacity * (0.78 + 0.22 * pulse);
        if (!n.img.complete) return;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(n.cx + ox, n.cy + oy);
        ctx.rotate(n.spin);
        ctx.drawImage(n.img, -n.size / 2, -n.size / 2, n.size, n.size);
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // Text sequence
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const st = stateRef.current;

    const clearT = () => { st.timers.forEach(clearTimeout); st.timers = []; };
    const addT   = (fn, ms) => st.timers.push(setTimeout(fn, ms));
    const getEl  = id => document.getElementById(id);

    function materialize(line, onDone) {
      const el = getEl(line.id), txt = line.text;
      el.style.transition = 'none';
      el.style.opacity    = '0';
      el.style.filter     = 'none';
      el.textContent      = '';
      let i = 0;
      function next() {
        el.textContent   = txt.slice(0, i);
        const p          = Math.min(i / txt.length, 1);
        el.style.filter  = `blur(${i < 3 ? 1.2 : 0}px)`;
        el.style.opacity = String(Math.min(p * 1.4, 1).toFixed(3));
        if (i <= txt.length) { i++; addT(next, CHAR_MS); }
        else { el.style.filter = 'none'; addT(onDone, HOLD_MS); }
      }
      addT(next, 60);
    }

    function fadeOut(line, onDone) {
      const el = getEl(line.id);
      el.style.transition = `opacity ${FADE_MS}ms ease`;
      el.style.opacity    = '0';
      addT(() => { el.textContent = ''; el.style.transition = 'none'; if (onDone) onDone(); }, FADE_MS + 40);
    }

    function showStep(s) {
      st.step = s;
      const line = LINES[s];
      materialize(line, () => {
        if (line.isFinal) {
          addT(() => fadeOut(line, () => { reset(); addT(startSequence, RESTART_MS); }), HOLD_FINAL);
          return;
        }
        fadeOut(line, () => addT(() => showStep(s + 1), GAP_MS));
      });
    }

    function reset() {
      st.active = false; clearT();
      LINES.forEach(l => {
        const el = getEl(l.id); if (!el) return;
        el.textContent = ''; el.style.transition = 'none';
        el.style.opacity = '0'; el.style.filter = 'none';
      });
    }

    function startSequence() {
      if (st.active) return;
      st.active = true; showStep(0);
    }

    function handleClick() {
      if (!st.active || st.step < 0) return;
      clearT();
      const line = LINES[st.step], next = st.step + 1;
      fadeOut(line, () => {
        if (next >= LINES.length) { reset(); addT(startSequence, RESTART_MS); }
        else addT(() => showStep(next), GAP_MS);
      });
    }

    section.addEventListener('click', handleClick);
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) startSequence();
    }, { threshold: 0.3 });
    obs.observe(section);

    return () => { clearT(); obs.disconnect(); section.removeEventListener('click', handleClick); };
  }, []);

  return (
    <div className="tpb-section" ref={sectionRef}>
      <canvas className="tpb-canvas" ref={canvasRef} />
      <div className="tpb-stage">
        {LINES.map(line => (
          <p key={line.id} id={line.id} className={`tpb-thought${line.isFinal ? ' tpb-final' : ''}`} />
        ))}
      </div>
    </div>
  );
}

