import { useEffect, useRef } from 'react';
import Footer from './Footer';
import './AboutPage.css';

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!(el instanceof Element)) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function AboutPage({ showPage, goTo }) {
  const spreadRef = useRef(null);
  const colsRef   = useRef(null);
  const ctaRef    = useRef(null);

  useReveal(spreadRef);
  useReveal(colsRef);
  useReveal(ctaRef);

  return (
    <div className="about-page">
      <div className="ap-magazine">

        {/* ── Masthead ── */}
        <div className="ap-mast">
          <div className="ap-mast-name">Lauren Haan-Gilbert</div>
          <div className="ap-mast-sub">Strategic Advisor &nbsp;·&nbsp; Technology. Decisions. Change.</div>
        </div>

        {/* ── Spread: headline left, photo right ── */}
        <div className="ap-spread reveal" ref={spreadRef}>
          <div className="ap-spread-text">
            <h1 className="ap-headline">
              Better decisions<br />
              begin with<br />
              <em>reflection,<br />not reflex.</em>
            </h1>
            <p className="ap-deck">
              Most decisions are approached as a reflex. Something has stopped working,
              pressure increases, and the instinct is to reach for what can fix it.
              A better decision is created when we take the time to reflect instead of react.
            </p>
            <p className="ap-byline">Almere, Netherlands</p>
          </div>
          <div className="ap-spread-photo">
            <img src="/unnamed-3-scaled.jpg" alt="Lauren Haan-Gilbert" />
            <span className="ap-photo-cap">Lauren Haan-Gilbert</span>
          </div>
        </div>

        {/* ── Three columns ── */}
        <div className="ap-cols reveal" ref={colsRef}>
          <div className="ap-col">
            <p className="ap-col-head">What I do</p>
            <p>I help organisations make smarter decisions before they invest in new technology. I talk to people, understand the challenge from different angles, and define the underlying problem before an investment is made.</p>
            <p className="ap-pull">Sometimes the answer is new technology. But not always.</p>
          </div>
          <div className="ap-col">
            <p className="ap-col-head">The moment I'm useful</p>
            <p>Businesses are increasingly asked to make decisions at scale. In 2026 and beyond, there's data everywhere and technology that promises to help monetise, strategise and compete.</p>
            <p>How can you be certain the solution your organisation is reaching for is genuinely the right one? That's the moment I'm useful.</p>
          </div>
          <div className="ap-col">
            <p className="ap-col-head">Who I am</p>
            <p>American-Dutch, based in Almere. Background in coaching, life science and software engineering.</p>
            <p>I work with a team of designers, engineers and advisors to bring clients the best solutions to their unique challenges.</p>
          </div>
        </div>

        {/* ── CTA strip ── */}
        <div className="ap-foot reveal" ref={ctaRef}>
          <span className="ap-foot-q">Not sure where to start?</span>
          <div className="ap-foot-links">
            {/* TODO: replace # with 7 Questions URL */}
            <a className="tlink teal" href="#">Get the 7 Questions</a>
            {/* TODO: replace # with booking URL */}
            <a className="tlink" href="#" onClick={e => { e.preventDefault(); showPage('home'); goTo('contact'); }}>
              Book a conversation
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
