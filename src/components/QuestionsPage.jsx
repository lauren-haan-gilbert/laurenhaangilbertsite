import { useEffect, useRef, useState } from 'react';
import Footer from './Footer';
import './QuestionsPage.css';

// ── Token data ────────────────────────────────────────────────────
const SUBJECTS = ['assumption','system','decision','pattern','story','constraint','model','metric','voice','future','problem','tradeoff','belief','habit','silence','relationship','narrative','boundary','question','tension'];
const VERBS    = ['question','reverse','remove','expand','observe','trace','challenge','redefine','simplify','hold','name','follow'];
const LENSES   = ['from the outside','from the future','from the system','from unintended consequences','from first principles','from lived experience','from ten years from now','from the person most affected','from what we are not saying','from the edges','from a place of not knowing'];
const S_RARE   = ['comfortable story','invisible rule','missing voice','the thing we keep postponing'];
const L_RARE   = ['from the body','from the edge','from what we are afraid to find'];
const VP = { reverse:'invert',trace:'trace back',hold:'hold steady',redefine:'redefine',simplify:'simplify',challenge:'challenge',question:'question',remove:'remove',expand:'expand',observe:'observe',name:'name',follow:'follow' };

const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const vp   = v  => VP[v] || v;

function genQ(a, b) {
  const ta = a.type, tb = b.type, la = a.label, lb = b.label;
  if ((ta === 'verb' && tb === 'subject') || (ta === 'subject' && tb === 'verb')) {
    const v = ta === 'verb' ? la : lb, s = ta === 'subject' ? la : lb;
    return pick([
      `What happens if we ${vp(v)} the ${s}?`,
      `What becomes visible when we ${vp(v)} the ${s}?`,
      `Who benefits when we ${vp(v)} the ${s}?`,
      `What gets easier if we ${vp(v)} the ${s}?`,
    ]);
  }
  if (ta === 'subject' && tb === 'subject') return pick([
    `How is the ${la} shaping the ${lb}?`,
    `What would change if the ${la} shifted?`,
    `What connects the ${la} and the ${lb}?`,
    `What would we find if we looked between the ${la} and the ${lb}?`,
  ]);
  if ((ta === 'subject' && tb === 'lens') || (ta === 'lens' && tb === 'subject')) {
    const s = ta === 'subject' ? la : lb, l = ta === 'lens' ? la : lb;
    return pick([
      `What does the ${s} look like ${l}?`,
      `What is easy to miss about the ${s} ${l}?`,
      `What would we change about the ${s} if we looked ${l}?`,
      `What is the ${s} protecting, ${l}?`,
    ]);
  }
  if ((ta === 'verb' && tb === 'lens') || (ta === 'lens' && tb === 'verb')) {
    const v = ta === 'verb' ? la : lb, l = ta === 'lens' ? la : lb;
    return pick([
      `What changes when we ${vp(v)} ${l}?`,
      `What are we protecting by not looking ${l}?`,
      `What would we find if we ${vp(v)} ${l}?`,
    ]);
  }
  return pick([
    'What question are we avoiding?',
    'What belief here will look strange in ten years?',
    'What would change if we told the truth?',
    'What is this protecting?',
    'What are we not saying?',
    'What if the constraint is the answer?',
  ]);
}

const CONN_D = 90, DISC_D = 116;

export default function QuestionsPage({ showPage, goTo }) {
  const stageRef  = useRef(null);
  const svgRef    = useRef(null);
  const nodesRef  = useRef(null);
  const stateRef  = useRef({ nodes: [], conns: new Map(), bubs: new Map(), raf: null, inited: false });
  const [rare, setRare] = useState(false);

  const build = (rareOn) => {
    const stage     = stageRef.current;
    const container = nodesRef.current;
    const svg       = svgRef.current;
    if (!stage || !container || !svg) return;

    const s = stateRef.current;
    if (s.raf) cancelAnimationFrame(s.raf);
    container.innerHTML = '';
    svg.innerHTML = '';
    s.nodes = []; s.conns.clear();
    s.bubs.forEach(b => b.remove()); s.bubs.clear();

    const W = stage.offsetWidth;
    const H = stage.offsetHeight || Math.round(window.innerHeight * 0.72);

    let tokens = [];
    SUBJECTS.forEach(t => tokens.push({ label: t, type: 'subject' }));
    VERBS.forEach(t    => tokens.push({ label: t, type: 'verb' }));
    LENSES.forEach(t   => tokens.push({ label: t, type: 'lens' }));
    if (rareOn) {
      S_RARE.forEach(t => tokens.push({ label: t, type: 'subject' }));
      L_RARE.forEach(t => tokens.push({ label: t, type: 'lens' }));
    }
    tokens = tokens.sort(() => Math.random() - .5).slice(0, 28);

    s.nodes = tokens.map((t, i) => ({
      id: i, label: t.label, type: t.type,
      x: 90 + Math.random() * (W - 180),
      y: 90 + Math.random() * (H - 180),
      vx: (Math.random() - .5) * 0.2,
      vy: (Math.random() - .5) * 0.2,
      dragging: false, el: null,
    }));

    s.nodes.forEach(n => {
      const el = document.createElement('div');
      el.className = `c-node type-${n.type}`;
      el.textContent = n.label;
      el.setAttribute('tabindex', '0');
      container.appendChild(el);
      n.el = el;

      el.addEventListener('pointerdown', e => {
        n.dragging = true; el.setPointerCapture(e.pointerId); e.preventDefault();
      });
      el.addEventListener('pointermove', e => {
        if (!n.dragging) return;
        const r = stage.getBoundingClientRect();
        n.x = Math.max(50, Math.min(W - 50, e.clientX - r.left));
        n.y = Math.max(50, Math.min(H - 50, e.clientY - r.top));
        e.preventDefault();
      });
      el.addEventListener('pointerup',     () => n.dragging = false);
      el.addEventListener('pointercancel', () => n.dragging = false);
    });

    tick(W, H, stage, container, svg, s);
    s.inited = true;
  };

  const tick = (W, H, stage, container, svg, s) => {
    const rm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (!rm) {
      s.nodes.forEach(n => {
        if (n.dragging) return;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 50 || n.x > W - 50) n.vx *= -1;
        if (n.y < 50 || n.y > H - 50) n.vy *= -1;
        n.x = Math.max(50, Math.min(W - 50, n.x));
        n.y = Math.max(50, Math.min(H - 50, n.y));
      });
    }
    s.nodes.forEach(n => { n.el.style.left = n.x + 'px'; n.el.style.top = n.y + 'px'; });

    svg.innerHTML = '';
    for (let i = 0; i < s.nodes.length; i++) {
      for (let j = i + 1; j < s.nodes.length; j++) {
        const a = s.nodes[i], b = s.nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const key = `${a.id}-${b.id}`;
        if (dist < CONN_D) {
          if (!s.conns.has(key)) s.conns.set(key, { q: genQ(a, b) });
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
          line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
          line.setAttribute('stroke', 'rgba(200,160,76,0.5)');
          line.setAttribute('stroke-width', '1.2');
          line.setAttribute('stroke-dasharray', '4,3');
          svg.appendChild(line);
          const conn = s.conns.get(key);
          if (!s.bubs.has(key)) {
            const bub = document.createElement('div');
            bub.className = 'q-bubble';
            bub.textContent = conn.q;
            container.appendChild(bub);
            s.bubs.set(key, bub);
          }
          const bub = s.bubs.get(key);
          if (bub) {
            bub.style.left = ((a.x + b.x) / 2) + 'px';
            bub.style.top  = ((a.y + b.y) / 2) + 'px';
          }
        } else if (dist > DISC_D && s.conns.has(key)) {
          s.conns.delete(key);
          const bub = s.bubs.get(key);
          if (bub) {
            bub.classList.add('fade-out');
            setTimeout(() => { bub.remove(); s.bubs.delete(key); }, 350);
          }
        }
      }
    }
    s.raf = requestAnimationFrame(() => tick(W, H, stage, container, svg, s));
  };

  const shuffle = () => {
    const stage = stageRef.current;
    const s = stateRef.current;
    if (!stage) return;
    const W = stage.offsetWidth, H = stage.offsetHeight;
    s.nodes.forEach(n => {
      n.x = 80 + Math.random() * (W - 160);
      n.y = 80 + Math.random() * (H - 160);
    });
    s.conns.clear();
    s.bubs.forEach(b => b.remove()); s.bubs.clear();
    if (svgRef.current) svgRef.current.innerHTML = '';
  };

  useEffect(() => {
    build(rare);
    return () => {
      const s = stateRef.current;
      if (s.raf) cancelAnimationFrame(s.raf);
    };
  }, []);

  const handleRare = (e) => {
    setRare(e.target.checked);
    build(e.target.checked);
  };

  return (
    <div className="questions-page">
      <div className="c-intro">
        <p className="tag" style={{ justifyContent: 'center' }}>An exploration</p>
        <h1>The Question<br /><em>Constellation</em></h1>
        <p style={{ marginTop: '1.4rem' }}>
          Drag the nodes toward each other. When they meet, a question appears.
          Some are useful. Some are surprising. All are worth sitting with.
        </p>
      </div>

      <div className="c-stage" ref={stageRef}>
        <svg ref={svgRef} id="cSvg" />
        <div ref={nodesRef} id="cNodes" />
        <div className="c-controls">
          <button className="c-btn" onClick={shuffle}>Shuffle</button>
          <button className="c-btn" onClick={() => build(rare)}>Reset</button>
          <label className="rare-wrap">
            <input type="checkbox" checked={rare} onChange={handleRare} /> Rare
          </label>
        </div>
        <p className="c-hint">drag nodes together · questions emerge</p>
      </div>

      <div className="c-legend">
        <span className="leg"><span className="leg-dot" style={{ background: '#F4A0B8' }} />Subject</span>
        <span className="leg"><span className="leg-dot" style={{ background: '#F0D060' }} />Verb</span>
        <span className="leg"><span className="leg-dot" style={{ background: '#80D8C8' }} />Lens</span>
      </div>

      <div className="c-below">
        <p>These questions are drawn from the same framework I bring to every session and workshop. The question before the question is usually the more interesting one.</p>
        <button className="tlink" onClick={() => { showPage('home'); goTo('contact'); }}>
          Work with me
        </button>
      </div>

      <Footer />
    </div>
  );
}
