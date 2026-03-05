import { useRef, useEffect } from 'react';
import './Hero.css';

export default function Hero() {

  const imgRef = useRef(null);
  const rafRef = useRef(null);
  const scaleRef = useRef(1);

  const typedRef = useRef(null);
  const cursorRef = useRef(null);

  const cancelRaf = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const handleEnter = () => {

    cancelRaf();

    const startScale = scaleRef.current;
    const growTarget = 1.05;
    const growMs = 700;
    const pulseMs = 3200;

    let t0 = null;

    const tick = (ts) => {

      if (!t0) t0 = ts;
      const elapsed = ts - t0;

      if (elapsed < growMs) {

        const p = 1 - Math.pow(1 - elapsed / growMs, 3);
        scaleRef.current = startScale + (growTarget - startScale) * p;

      } else {

        const p = (elapsed - growMs) / pulseMs;
        scaleRef.current = growTarget + 0.03 * Math.sin(p * Math.PI * 2);

      }

      if (imgRef.current)
        imgRef.current.style.transform = `scale(${scaleRef.current})`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const handleLeave = () => {

    cancelRaf();

    const startScale = scaleRef.current;
    const returnMs = 1800;

    let t0 = null;

    const tick = (ts) => {

      if (!t0) t0 = ts;

      const elapsed = ts - t0;
      const p = Math.min(elapsed / returnMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);

      scaleRef.current = startScale + (1 - startScale) * eased;

      if (imgRef.current)
        imgRef.current.style.transform = `scale(${scaleRef.current})`;

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        scaleRef.current = 1;
        if (imgRef.current) imgRef.current.style.transform = '';
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {

    const lines = ['Clarity begins with', 'the right question.'];
    const text = lines.join('\n');

    const el = typedRef.current;
    const cursor = cursorRef.current;

    if (!el || !cursor) return;

    el.innerHTML = '';
    el.appendChild(cursor);

    cursor.classList.remove('pulse2');
    cursor.style.opacity = '1';

    const CHAR_MS = 110;
    const START_DELAY = 1100;

    let timeouts = [];
    let i = 0;

    const type = () => {

      if (i < text.length) {

        const char = text[i];

        if (char === '\n') {

          const br = document.createElement('br');
          el.insertBefore(br, cursor);

          i++;

          const t = setTimeout(type, 650);
          timeouts.push(t);

          return;

        } else {

          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0.15';

          el.insertBefore(span, cursor);

          requestAnimationFrame(() => {
            span.style.transition = 'opacity 0.42s ease';
            span.style.opacity = '1';
          });

        }

        i++;

        let delay = CHAR_MS + (Math.random() - 0.5) * 30;

        if (char === '.' || char === ',' || char === ':') delay += 120;
        if (char === ' ') delay += 40;

        const t = setTimeout(type, delay);
        timeouts.push(t);

      } else {

        cursor.classList.add('pulse2');

        setTimeout(() => {
          const arrow = document.querySelector('.hero-scroll');
          if (arrow) arrow.classList.add('visible');
        }, 1200);

      }
    };

    const t0 = setTimeout(type, START_DELAY);
    timeouts.push(t0);

    return () => timeouts.forEach(clearTimeout);

  }, []);

  return (

    <section className="hero">

      <div className="hero-inner">

        <div className="hero-grid">

          <h1 className="hero-headline">

            <span ref={typedRef} className="hero-typedWrap">

              <span
                ref={cursorRef}
                className="hero-cursor"
                aria-hidden="true"
              />

            </span>

          </h1>

          <div className="hero-visual">

            <div className="hero-visualWrap">

              <img
                ref={imgRef}
                src="/simple_drawing.png"
                alt="Lauren constellation drawing"
                className="hero-drawing"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              />

            </div>

          </div>

        </div>

      </div>

      <div
        className="hero-scroll"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        ↓
      </div>

    </section>

  );
}