import { useEffect, useRef } from 'react';
import Footer from './Footer';
import './QuestionsPage.css';

// ── Vocabulary drawn from Lauren's actual practice ─────────────────
const SUBJECTS = [
  'decision', 'problem', 'assumption', 'constraint',
  'readiness', 'investment', 'outcome', 'workaround',
  'data', 'commitment',
];

const VERBS = ['name', 'surface', 'test', 'question'];

const LENSES = [
  'who feels it most',
  'ten years on',
  "what's unsaid",
];

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

// ── Curated questions drawn from the 7 Questions & Decision Canvas ──
function genQ(a, b) {
  const ta = a.type, tb = b.type;
  const la = a.label, lb = b.label;

  if ((ta === 'verb' && tb === 'subject') || (ta === 'subject' && tb === 'verb')) {
    const v = ta === 'verb' ? la : lb;
    const s = ta === 'subject' ? la : lb;
    const specific = {
      'name+decision':    "What decision are we actually making — not the one in the room, the real one underneath it?",
      'name+problem':     "Is this the real problem, or the one we're comfortable talking about?",
      'name+assumption':  "Which assumptions are we treating as facts?",
      'name+constraint':  "Which of these constraints are real — and which are inherited?",
      'name+readiness':   "Are we ready — and have we asked that question honestly?",
      'name+investment':  "What are we actually committing to when we say yes to this?",
      'name+outcome':     "If this works, what will people do differently — specifically?",
      'name+workaround':  "What is the workaround costing — in time, trust, and momentum?",
      'name+data':        "Where does the data actually live — and does your team trust it?",
      'name+commitment':  "What are we committing to before we've understood what it is?",
      'surface+decision': "What's the decision underneath the stated decision?",
      'surface+problem':  "What's the problem underneath the problem?",
      'surface+assumption': "What are we assuming that we've never actually tested?",
      'surface+readiness':  "What has to be true before this could work?",
      'surface+investment': "What's driving this investment — evidence, or discomfort with staying still?",
      'surface+outcome':    "What would people stop doing if this worked?",
      'surface+workaround': "How long has the workaround been in place — and what does that tell us?",
      'surface+constraint': "Which constraint is worth challenging first?",
      'surface+data':       "What does the data beneath this decision actually show?",
      'surface+commitment': "What are we not ready to commit to — and is that the real answer?",
      'test+decision':   "How would we know, six months from now, if this was the right decision?",
      'test+assumption': "What's the smallest thing we could do to test this assumption?",
      'test+readiness':  "What's the one thing that would prove we're ready to move?",
      'test+investment': "What's the smallest first step that would tell us we're pointed the right way?",
      'test+outcome':    "What would need to be measurably different for this to count as success?",
      'test+data':       "Is the data reliable enough to build on — honestly?",
      'test+workaround': "Is the workaround a temporary fix or the real answer?",
      'test+commitment': "Are we close enough to the answer to commit?",
      'question+decision':   "What's the real question underneath this decision?",
      'question+assumption': "How does this look if the assumption turns out to be wrong?",
      'question+commitment': "Are we committing to move forward — or committing to avoid the question?",
      'question+problem':    "Are we solving the right problem?",
      'question+outcome':    "Is the outcome we're aiming for actually the one that matters?",
      'question+investment': "Is this the right investment, at the right time, for the right reason?",
      'question+readiness':  "Are we ready — or do we need to be ready before we need to be ready?",
      'question+data':       "What is the data actually telling us that we haven't asked yet?",
      'question+constraint': "Is this constraint the problem — or the answer?",
    };
    const key = `${v}+${s}`;
    if (specific[key]) return specific[key];
    return pick([
      `What changes if we really ${v} the ${s}?`,
      `What does it mean to ${v} the ${s} honestly?`,
    ]);
  }

  if (ta === 'subject' && tb === 'subject') {
    const key = [la, lb].sort().join('+');
    const specific = {
      'assumption+problem':    "How much of this problem is real, and how much is an untested assumption?",
      'investment+outcome':    "Is the investment pointed at the real outcome, or at a solution we've already chosen?",
      'data+readiness':        "Is the data reliable enough to build on — and who's actually checked?",
      'commitment+readiness':  "Are we ready to commit — or committing to avoid the question?",
      'constraint+decision':   "Which constraints are real, and which are inherited from an earlier decision?",
      'outcome+workaround':    "Has the workaround become the outcome we're actually optimising for?",
      'commitment+investment': "What are we really agreeing to when we approve this investment?",
      'data+outcome':          "What does the data say the outcome actually is — versus what we're hoping for?",
      'decision+problem':      "Is the decision we're trying to make the right one — or a symptom of a different problem?",
      'assumption+investment': "What assumption, if wrong, would make this investment a mistake?",
      'commitment+outcome':    "What are we committing to deliver — and for whom?",
      'readiness+workaround':  "Is the workaround a sign we're not ready — or a sign the system isn't?",
      'constraint+outcome':    "Does the constraint change the outcome we should be aiming for?",
      'data+problem':          "Is the data describing the problem — or hiding it?",
      'commitment+problem':    "Are we committed to solving this problem — or to having solved it?",
    };
    if (specific[key]) return specific[key];
    return pick([
      `How is the ${la} shaping the ${lb}?`,
      `What's the connection between the ${la} and the ${lb} that we're not discussing?`,
      `What would shift if the ${la} changed?`,
    ]);
  }

  if ((ta === 'subject' && tb === 'lens') || (ta === 'lens' && tb === 'subject')) {
    const s = ta === 'subject' ? la : lb;
    const l = ta === 'lens' ? la : lb;
    const key = `${s}+${l}`;
    const specific = {
      "problem+who feels it most":   "Who lives with this problem day to day — and is it the person asking for the solution?",
      "decision+ten years on":       "Which part of this decision will look obvious — or regrettable — in ten years?",
      "assumption+what's unsaid":    "What assumption is nobody saying out loud?",
      "investment+who feels it most":"Who will live with the consequences of this investment — and have they been asked?",
      "commitment+what's unsaid":    "What concern about this commitment is nobody raising?",
      "outcome+ten years on":        "Will this outcome still matter in ten years — and to whom?",
      "readiness+what's unsaid":     "What's the readiness question we're all avoiding?",
      "data+who feels it most":      "Whose data is this — and do they trust it?",
      "workaround+what's unsaid":    "What does the workaround reveal that nobody wants to name?",
      "constraint+ten years on":     "Is this a real constraint — or one that won't exist in ten years?",
      "problem+ten years on":        "Is this problem worth solving from where we'll be in ten years?",
      "decision+who feels it most":  "Who isn't in this room whose perspective would change the decision?",
      "decision+what's unsaid":      "What's the concern about this decision that nobody's raising?",
      "investment+ten years on":     "Will this investment look like the right call in ten years?",
      "assumption+who feels it most":"Whose assumption is this — and does the most affected person share it?",
      "commitment+ten years on":     "Will we stand behind this commitment in ten years?",
      "outcome+who feels it most":   "Who benefits from this outcome — and who doesn't?",
      "outcome+what's unsaid":       "What outcome are we all hoping for but haven't said out loud?",
    };
    if (specific[key]) return specific[key];
    return pick([
      `What does the ${s} look like from ${l}?`,
      `What are we missing about the ${s} when we look from ${l}?`,
    ]);
  }

  if ((ta === 'verb' && tb === 'lens') || (ta === 'lens' && tb === 'verb')) {
    const v = ta === 'verb' ? la : lb;
    const l = ta === 'lens' ? la : lb;
    const key = `${v}+${l}`;
    const specific = {
      "name+who feels it most":    "Who is most affected by this — and have we asked them directly?",
      "name+ten years on":         "What will we wish we had named sooner?",
      "name+what's unsaid":        "What's in the room that nobody is naming?",
      "surface+who feels it most": "Whose experience is this decision actually about?",
      "surface+ten years on":      "What will be obvious in ten years that we can't see clearly yet?",
      "surface+what's unsaid":     "What concern is everyone carrying but nobody has raised?",
      "test+who feels it most":    "What would the most affected person say if we asked them directly?",
      "test+ten years on":         "What would we do differently if we already knew how this turns out?",
      "test+what's unsaid":        "What's the question we're all avoiding — and what does that tell us?",
      "question+who feels it most":"Who isn't in this conversation whose view would change it?",
      "question+ten years on":     "What belief here will look strange in ten years?",
      "question+what's unsaid":    "What are we all thinking but not saying?",
    };
    if (specific[key]) return specific[key];
    return pick([
      "Who isn't being heard in this conversation?",
      "What will we wish we'd asked earlier?",
    ]);
  }

  return pick([
    'What question are we avoiding?',
    'What would need to be true for this to be worth it?',
    'What are we not saying?',
    'Who would see this completely differently — and why?',
    'What concern is nobody raising out loud?',
    'What would change if we told the truth about this?',
  ]);
}

const CONN_D = 100, DISC_D = 128;

export default function QuestionsPage({ showPage, goTo }) {
  const stageRef  = useRef(null);
  const svgRef    = useRef(null);
  const nodesRef  = useRef(null);
  const stateRef  = useRef({ nodes: [], conns: new Map(), bubs: new Map(), raf: null });

  const build = () => {
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

    const tokens = [
      ...SUBJECTS.map(t => ({ label: t, type: 'subject' })),
      ...VERBS.map(t    => ({ label: t, type: 'verb' })),
      ...LENSES.map(t   => ({ label: t, type: 'lens' })),
    ];

    s.nodes = tokens.map((t, i) => ({
      id: i, label: t.label, type: t.type,
      x: 100 + Math.random() * (W - 200),
      y: 100 + Math.random() * (H - 200),
      vx: (Math.random() - .5) * 0.18,
      vy: (Math.random() - .5) * 0.18,
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
          line.setAttribute('stroke', 'rgba(200,160,76,0.4)');
          line.setAttribute('stroke-width', '1');
          line.setAttribute('stroke-dasharray', '3,4');
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
    build();
    return () => {
      const s = stateRef.current;
      if (s.raf) cancelAnimationFrame(s.raf);
    };
  }, []);

  return (
    <div className="questions-page">
      <div className="c-intro">
        <p className="tag" style={{ justifyContent: 'center' }}>The decision framework</p>
        <h1>Questions That<br /><em>Change the Frame</em></h1>
        <p style={{ marginTop: '1.4rem' }}>
          Drag the words toward each other. When two meet, the question between them appears.
          These are drawn from the same framework I bring to every Decision Session.
        </p>
      </div>

      <div className="c-stage" ref={stageRef}>
        <svg ref={svgRef} id="cSvg" />
        <div ref={nodesRef} id="cNodes" />
        <div className="c-controls">
          <button className="c-btn" onClick={shuffle}>Shuffle</button>
          <button className="c-btn" onClick={build}>Reset</button>
        </div>
        <p className="c-hint">drag words together · questions emerge</p>
      </div>

      <div className="c-legend">
        <span className="leg"><span className="leg-dot" style={{ background: '#F4A0B8' }} />What we examine</span>
        <span className="leg"><span className="leg-dot" style={{ background: '#F0D060' }} />What we do</span>
        <span className="leg"><span className="leg-dot" style={{ background: '#80D8C8' }} />How we look</span>
      </div>

      <div className="c-below">
        <p>These questions come from the framework I use in every Decision Session.
          If you're curious about how a half-day session could help with a decision you're facing, let's talk.</p>
        <button className="tlink" onClick={() => { showPage('home'); goTo('contact'); }}>
          Work with me
        </button>
      </div>

      <Footer />
    </div>
  );
}
