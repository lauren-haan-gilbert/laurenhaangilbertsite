import { useRef, useEffect } from 'react';
import './OfferSection.css';

/* Four ghost nodes echoing the ThoughtProcessBlock constellation — low opacity, edges only */
const GHOST_NODE_NAMES = ['aqua', 'pink', 'violet', 'paleblue'];
const GHOST_SLOW = 0.22; /* slower than ThoughtProcessBlock's 0.28 */
const GHOST_MAX_ALPHA = 0.20;

export default function OffersSection() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);

  /* ── Ghost node drift (reuses ThoughtProcessBlock pattern at low opacity) ── */
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, animId;
    let lastT = 0;

    const imgs = GHOST_NODE_NAMES.map(name => {
      const img = new Image();
      img.src = `/nodes/${name}_node.png`;
      return img;
    });

    /* Fixed starting positions at the four corners/edges of the section */
    const POSITIONS = [
      { cx: 0.07, cy: 0.18 },
      { cx: 0.93, cy: 0.22 },
      { cx: 0.10, cy: 0.78 },
      { cx: 0.90, cy: 0.82 },
    ];

    const nodes = GHOST_NODE_NAMES.map((_, i) => ({
      img:        imgs[i],
      cxR:        POSITIONS[i].cx,
      cyR:        POSITIONS[i].cy,
      cx:         0,
      cy:         0,
      size:       240 + Math.random() * 130,
      orbitR:     45 + Math.random() * 55,
      orbitSpd:   (0.00012 + Math.random() * 0.00016) * GHOST_SLOW * (Math.random() < 0.5 ? 1 : -1),
      orbitAngle: Math.random() * Math.PI * 2,
      orbitTilt:  Math.random() * Math.PI,
      spin:       Math.random() * Math.PI * 2,
      spinSpd:    (0.00008 + Math.random() * 0.00014) * GHOST_SLOW * (Math.random() < 0.5 ? 1 : -1),
      baseOpacity: 0.13 + Math.random() * 0.07,
      pulseSpd:   0.00018 + Math.random() * 0.00028,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    function resize() {
      W = canvas.width  = section.offsetWidth;
      H = canvas.height = section.offsetHeight;
      nodes.forEach(n => { n.cx = n.cxR * W; n.cy = n.cyR * H; });
    }

    function draw(ts) {
      const dt = Math.min(ts - lastT || 16, 50);
      lastT = ts;

      ctx.clearRect(0, 0, W, H);

      nodes.forEach(n => {
        n.orbitAngle += n.orbitSpd * dt;
        n.spin       += n.spinSpd  * dt;

        const ox    = Math.cos(n.orbitAngle) * n.orbitR;
        const oy    = Math.sin(n.orbitAngle + n.orbitTilt) * n.orbitR * 0.55;
        const drawX = n.cx + ox;
        const drawY = n.cy + oy;

        const pulse = 0.5 + 0.5 * Math.sin(ts * n.pulseSpd + n.pulsePhase);
        const alpha = Math.min(n.baseOpacity * (0.78 + 0.22 * pulse), GHOST_MAX_ALPHA);

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

  /* ── Scroll reveal ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const blocks = section.querySelectorAll('.offer-block');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    blocks.forEach(b => observer.observe(b));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="offers-section" ref={sectionRef}>

      {/* Ghost node canvas — positioned absolute, z-index 0, pointer-events none */}
      <canvas ref={canvasRef} className="offers-canvas" />

      <div className="offers-body">

        <p className="tag">What I can Offer You</p>
        <div className="offers-container">

          {/* ── CARD 1 — What the Research Says ── */}
          <div className="offer-block reveal">
            <p className="offer-eyebrow">Research</p>

            <h2 className="offer-title">
              What the Research Says
            </h2>

            <div className="offer-body-text">
              <p>
                In a study of 65 experienced AI practitioners, RAND found that one of the leading
                causes of project failure starts with the problem itself: what needs to be solved
                is misunderstood or poorly communicated.
              </p>
            </div>

            {/* TODO: replace # with the real RAND study URL */}
            <a className="offer-button" href="#">Read the RAND Study</a>
          </div>


          {/* ── CARD 2 — How We Can Begin ── */}
          <div className="offer-block reveal">
            <p className="offer-eyebrow">How We Can Begin</p>

            <h2 className="offer-title">
              It Starts With A Conversation
            </h2>

            <div className="offer-body-text">
              <p>
                Most work starts with a half-day Decision Session, focused on one technology or
                data decision.
              </p>

              <p>
                We look at the problem from different perspectives, highlight where there is
                agreement, where there isn't, and{' '}
                <em>what would need to be true</em>{' '}
                for the investment to make sense. I follow up with a written Decision Brief that
                sets out where the decision stands, the questions that remain, and what needs to
                happen next.
              </p>
            </div>
          </div>


          {/* ── CARD 3 — Not ready ── */}
          <div className="offer-block reveal">
            <p className="offer-eyebrow">Not ready for a chat?</p>

            <h2 className="offer-title">
              Start with the 7 Questions Checklist
            </h2>

            {/* TODO: replace # with the same lead-magnet URL as the hero "Start now" link */}
            <a className="offer-button" href="#">Get it now</a>
          </div>

        </div>
      </div>
    </section>
  );
}
