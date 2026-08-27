import { useRef, useEffect } from 'react';
import './ClaritySection.css';

export default function ClaritySection() {
  const innerRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!(inner instanceof Element)) return;

    // Reveal the section (opacity/transform)
    const obs1 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { inner.classList.add('visible'); obs1.disconnect(); } },
      { threshold: 0.1 }
    );
    obs1.observe(inner);

    // Highlighter fires when the closing paragraph scrolls into view
    const closing = inner.querySelector('.clarity-closing');
    let obs2;
    if (closing) {
      obs2 = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { closing.classList.add('highlight-active'); obs2.disconnect(); } },
        { threshold: 0.5 }
      );
      obs2.observe(closing);
    }

    return () => { obs1.disconnect(); if (obs2) obs2.disconnect(); };
  }, []);

  return (
    <section className="clarity">
      <div className="clarity-inner reveal" ref={innerRef}>

        <p className="tag">The problem</p>

        <h2>
          The solution depends on how the problem is defined.
        </h2>

        <p className="clarity-block-title">Perspective shapes the problem</p>
        <p>
          A technology decision can look very different across an organisation. What appears to
          be a systems problem from one perspective may be a process, data or people problem
          from another.
        </p>

        <p className="clarity-block-title">The brief shapes the solution.</p>
        <p>
          Those different perspectives ultimately shape the brief, and the brief shapes what
          suppliers propose, design or build.
        </p>

        <p className="clarity-closing">
          {/* Highlighter sweeps across this entire line on scroll entry */}
          <span className="clarity-highlight">
            <em>Invest in understanding the problem first.</em>{' '}
            The time, budget and expertise that follow will be better spent.
          </span>
        </p>

      </div>
    </section>
  );
}
