import { useRef, useEffect } from 'react';
import './TechSections.css';

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!(el instanceof Element)) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('ts-visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

/* ─── 1. RAND banner ─── */
export function RANDSection() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="ts-rand">
      <div className="ts-rand-inner ts-reveal" ref={ref}>
        <p className="tag">Research</p>
        <h2 className="ts-heading">What the Research Says</h2>
        <p className="ts-body">
          In a study of 65 experienced AI practitioners, RAND found that one of the leading
          causes of project failure starts with the problem itself: what needs to be solved
          is misunderstood or poorly communicated.
        </p>
        <a
          className="tlink teal hero-cta-link"
          href="https://www.rand.org/pubs/research_reports/RRA2680-1.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the RAND Study
        </a>
      </div>
    </section>
  );
}

/* ─── 2. File overview + Understand / Align / Decide / Act ─── */
export function FileOverviewSection() {
  const ref = useRef(null);
  const hlRef = useRef(null);
  useReveal(ref);

  useEffect(() => {
    const hl = hlRef.current;
    if (!(hl instanceof Element)) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { hl.classList.add('overview-highlight-active'); obs.disconnect(); } },
      { threshold: 0.9 }
    );
    obs.observe(hl);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="ts-overview">
      <div className="ts-overview-inner ts-reveal" ref={ref}>
        <p className="ts-overview-intro">
          When something needs to change, knowing where<br />to begin isn&apos;t always obvious.
        </p>
        <p className="ts-body">
          I work with organisations at the point where change is on the table, but the way
          forward isn&apos;t yet obvious. Together, we look at the decision from different
          angles: what is driving it, what matters to the people involved, what assumptions
          are being made and{' '}
          <span className="overview-highlight" ref={hlRef}>
            what the investment ultimately needs to deliver.
          </span>
        </p>

        <div className="ts-steps">
          {[
            { word: 'Understand', sub: 'The Problem' },
            { word: 'Align',      sub: 'The Perspectives' },
            { word: 'Decide',     sub: 'The Direction' },
            { word: 'Act',        sub: 'The Next Step' },
          ].map(({ word, sub }) => (
            <div className="ts-step" key={word}>
              <span className="ts-step-word">{word}</span>
              <span className="ts-step-sub">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. How We Can Begin / Conversation ─── */
export function ConversationSection() {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section className="ts-convo">
      <div className="ts-convo-inner ts-reveal" ref={ref}>

        <div className="ts-convo-text">
          <p className="tag">How We Can Begin</p>
          <h2 className="ts-heading">
            It Starts With<br /><em>A Conversation</em>
          </h2>
          <p className="ts-body">
            Most work starts with a half-day Decision Session, focused on one technology or
            data decision.
          </p>
          <p className="ts-body">
            We look at the problem from different perspectives, highlight where there is
            agreement, where there isn&apos;t, and what would need to be true for the
            investment to make sense. I follow up with a written Decision Brief that sets
            out where the decision stands, the questions that remain, and what needs to
            happen next.
          </p>
          <a className="tlink hero-cta-link" href="#contact">Contact us</a>
        </div>

        <div className="ts-convo-images">
          <img
            src="/lauren-headshot.png"
            alt="Lauren Haan Gilbert"
            className="ts-img-headshot"
          />
        </div>

      </div>
    </section>
  );
}

/* ─── 4. Not ready — light editorial strip ─── */
export function ChecklistSection() {
  const ref = useRef(null);
  const nodeRef = useRef(null);
  useReveal(ref);

  useEffect(() => {
    const node = nodeRef.current;
    if (!(node instanceof Element)) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { node.classList.add('node-visible'); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="ts-checklist">
      <div className="ts-checklist-inner ts-reveal" ref={ref}>

        <div className="ts-checklist-text">
          <p className="ts-checklist-invite">
            Not ready for a conversation yet?
          </p>
          <p className="ts-checklist-sub">
            Start with the <em>7 Questions Checklist</em> — a short, self-guided
            exercise to clarify where your technology decision really stands, and
            what would need to be true before the next step makes sense.
          </p>
          {/* TODO: replace # with lead-magnet URL */}
          <a className="tlink teal" href="#">Get it now</a>
        </div>

        <div className="ts-checklist-node-wrap">
          <img
            ref={nodeRef}
            src="/aqua_node_1.png"
            alt=""
            className="ts-checklist-node"
          />
        </div>

      </div>
    </section>
  );
}
