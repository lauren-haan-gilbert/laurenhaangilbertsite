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
  'aqua',
  'darkblue',
  'green',
  'indigo',
  'magenta',
  'olive',
  'paleblue',
  'pink',
  'yellow',
  'violet',
  'turquoise',
];

const CHAR_MS = 51;
const HOLD_MS = 2800;
const FADE_MS = 1400;
const GAP_MS = 400;
const HOLD_FINAL = 3600;
const RESTART_MS = 1800;
const SLOW = 0.28;

export default function ThoughtProcessBlock() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const stateRef = useRef({ step: -1, active: false, timers: [] });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!canvas || !section || !stage) return;

    const ctx = canvas.getContext('2d');
    let nodes = [];
    let W = 0;
    let H = 0;
    let animId = null;

    const imgs = NODE_FILES.map((name) => {
      const img = new Image();
      img.src = `/nodes/${name}_node.png`;
      return img;
    });

    function getForbiddenZone() {
      const sectionRect = section.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();

      // Buffer around the text zone
      const bufferX = 100;
      const bufferY = 70;

      return {
        x: stageRect.left - sectionRect.left - bufferX,
        y: stageRect.top - sectionRect.top - bufferY,
        w: stageRect.width + bufferX * 2,
        h: stageRect.height + bufferY * 2,
      };
    }

    function pointInRect(x, y, rect) {
      return (
        x >= rect.x &&
        x <= rect.x + rect.w &&
        y >= rect.y &&
        y <= rect.y + rect.h
      );
    }

    function pushPointOutOfRect(x, y, rect, padding = 0) {
      const rx = rect.x - padding;
      const ry = rect.y - padding;
      const rw = rect.w + padding * 2;
      const rh = rect.h + padding * 2;

      if (x < rx || x > rx + rw || y < ry || y > ry + rh) {
        return { x, y };
      }

      const leftDist = Math.abs(x - rx);
      const rightDist = Math.abs(rx + rw - x);
      const topDist = Math.abs(y - ry);
      const bottomDist = Math.abs(ry + rh - y);

      const minDist = Math.min(leftDist, rightDist, topDist, bottomDist);

      if (minDist === leftDist) return { x: rx, y };
      if (minDist === rightDist) return { x: rx + rw, y };
      if (minDist === topDist) return { x, y: ry };
      return { x, y: ry + rh };
    }

    function makeNode(imgIndex) {
      const size = 160 + Math.random() * 220;
      const isTurquoise = imgIndex === 10;
      const forbidden = getForbiddenZone();

      let cx, cy;
      let tries = 0;

      do {
        cx = 0.1 * W + Math.random() * 0.8 * W;
        cy = 0.1 * H + Math.random() * 0.8 * H;
        tries++;
      } while (pointInRect(cx, cy, forbidden) && tries < 200);

      return {
        cx,
        cy,
        size,
        img: imgs[imgIndex],
        orbitR: 50 + Math.random() * 90,
        orbitSpd:
          (0.00015 + Math.random() * 0.00025) *
          SLOW *
          (Math.random() < 0.5 ? 1 : -1),
        orbitAngle: Math.random() * Math.PI * 2,
        orbitTilt: Math.random() * Math.PI,
        spin: Math.random() * Math.PI * 2,
        spinSpd:
          (0.0002 + Math.random() * 0.0003) *
          SLOW *
          (isTurquoise ? 0.8 : 1) *
          (Math.random() < 0.5 ? 1 : -1),
        baseOpacity: 0.55 + Math.random() * 0.3,
        pulseSpd: 0.00025 + Math.random() * 0.0004,
        pulsePhase: Math.random() * Math.PI * 2,
        vx: 0,
        vy: 0,
      };
    }

    function resize() {
      W = canvas.width = section.offsetWidth;
      H = canvas.height = section.offsetHeight;

      if (!nodes.length) {
        const indices = NODE_FILES.map((_, i) => i).sort(() => Math.random() - 0.5);
        indices.forEach((i) => nodes.push(makeNode(i)));
      }
    }

    function repulseNodes() {
      const MIN = 200;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].cx - nodes[i].cx;
          const dy = nodes[j].cy - nodes[i].cy;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;

          if (d < MIN) {
            const f = ((MIN - d) / MIN) * 0.45;
            const fx = (dx / d) * f;
            const fy = (dy / d) * f;
            nodes[i].vx -= fx;
            nodes[i].vy -= fy;
            nodes[j].vx += fx;
            nodes[j].vy += fy;
          }
        }
      }
    }

    function repelFromForbiddenZone() {
      const rect = getForbiddenZone();
      const margin = 24;

      nodes.forEach((n) => {
        if (
          n.cx > rect.x - margin &&
          n.cx < rect.x + rect.w + margin &&
          n.cy > rect.y - margin &&
          n.cy < rect.y + rect.h + margin
        ) {
          const pushed = pushPointOutOfRect(n.cx, n.cy, rect, margin);
          const dx = pushed.x - n.cx;
          const dy = pushed.y - n.cy;

          n.vx += dx * 0.03;
          n.vy += dy * 0.03;
        }
      });
    }

    let lastT = 0;

    function draw(ts) {
      const dt = Math.min(ts - lastT || 16, 50);
      lastT = ts;

      ctx.clearRect(0, 0, W, H);

      repulseNodes();
      repelFromForbiddenZone();

      const forbidden = getForbiddenZone();

      nodes.forEach((n) => {
        n.orbitAngle += n.orbitSpd * dt;
        n.spin += n.spinSpd * dt;

        n.cx += n.vx * dt * 0.02;
        n.cy += n.vy * dt * 0.02;
        n.vx *= 0.94;
        n.vy *= 0.94;

        const pad = n.size * 0.4;
        n.cx = Math.max(pad, Math.min(W - pad, n.cx));
        n.cy = Math.max(pad, Math.min(H - pad, n.cy));

        const ox = Math.cos(n.orbitAngle) * n.orbitR;
        const oy = Math.sin(n.orbitAngle + n.orbitTilt) * n.orbitR * 0.55;

        let drawX = n.cx + ox;
        let drawY = n.cy + oy;

        if (pointInRect(drawX, drawY, forbidden)) {
          const pushed = pushPointOutOfRect(drawX, drawY, forbidden, 18);
          drawX = pushed.x;
          drawY = pushed.y;
        }

        const pulse = 0.5 + 0.5 * Math.sin(ts * n.pulseSpd + n.pulsePhase);
        const alpha = n.baseOpacity * (0.78 + 0.22 * pulse);

        if (!n.img.complete) return;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(drawX, drawY);
        ctx.rotate(n.spin);
        ctx.drawImage(n.img, -n.size / 2, -n.size / 2, n.size, n.size);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const st = stateRef.current;

    const clearT = () => {
      st.timers.forEach(clearTimeout);
      st.timers = [];
    };

    const addT = (fn, ms) => {
      st.timers.push(setTimeout(fn, ms));
    };

    const getEl = (id) => document.getElementById(id);

    function materialize(line, onDone) {
      const el = getEl(line.id);
      const txt = line.text;
      if (!el) return;

      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.filter = 'none';
      el.textContent = '';

      let i = 0;

      function next() {
        el.textContent = txt.slice(0, i);
        const p = Math.min(i / txt.length, 1);
        el.style.filter = `blur(${i < 3 ? 1.2 : 0}px)`;
        el.style.opacity = String(Math.min(p * 1.4, 1).toFixed(3));

        if (i <= txt.length) {
          i++;
          addT(next, CHAR_MS);
        } else {
          el.style.filter = 'none';
          addT(onDone, HOLD_MS);
        }
      }

      addT(next, 60);
    }

    function fadeOut(line, onDone) {
      const el = getEl(line.id);
      if (!el) return;

      el.style.transition = `opacity ${FADE_MS}ms ease`;
      el.style.opacity = '0';

      addT(() => {
        el.textContent = '';
        el.style.transition = 'none';
        if (onDone) onDone();
      }, FADE_MS + 40);
    }

    function showStep(s) {
      st.step = s;
      const line = LINES[s];

      materialize(line, () => {
        if (line.isFinal) {
          addT(() => {
            fadeOut(line, () => {
              reset();
              addT(startSequence, RESTART_MS);
            });
          }, HOLD_FINAL);
          return;
        }

        fadeOut(line, () => addT(() => showStep(s + 1), GAP_MS));
      });
    }

    function reset() {
      st.active = false;
      clearT();

      LINES.forEach((l) => {
        const el = getEl(l.id);
        if (!el) return;
        el.textContent = '';
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.filter = 'none';
      });
    }

    function startSequence() {
      if (st.active) return;
      st.active = true;
      showStep(0);
    }

    function handleClick() {
      if (!st.active || st.step < 0) return;

      clearT();
      const line = LINES[st.step];
      const next = st.step + 1;

      fadeOut(line, () => {
        if (next >= LINES.length) {
          reset();
          addT(startSequence, RESTART_MS);
        } else {
          addT(() => showStep(next), GAP_MS);
        }
      });
    }

    section.addEventListener('click', handleClick);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startSequence();
      },
      { threshold: 0.3 }
    );

    obs.observe(section);

    return () => {
      clearT();
      obs.disconnect();
      section.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="tpb-section" ref={sectionRef}>
      <canvas className="tpb-canvas" ref={canvasRef} />
      <div className="tpb-stage" ref={stageRef}>
        {LINES.map((line) => (
          <p
            key={line.id}
            id={line.id}
            className={`tpb-thought${line.isFinal ? ' tpb-final' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}