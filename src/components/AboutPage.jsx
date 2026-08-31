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
            <p>I help organisations make better-informed decisions before committing to new technology. Through focused conversations, I examine the challenge from different perspectives, test assumptions and clarify the problem that needs to be solved.</p>
            <p className="ap-pull">Sometimes the answer is new technology. But not always.</p>
          </div>
          <div className="ap-col">
            <p className="ap-col-head">Before you commit</p>
            <p>Organisations are being asked to make increasingly consequential decisions about technology and data. The options are multiplying, the pressure to act is growing and every new solution promises an advantage.</p>
            <p>But how do you know whether the solution your organisation is considering is the right one, or whether the problem needs to be understood differently first?</p>
            <p>That is where I can help.</p>
          </div>
          <div className="ap-col">
            <p className="ap-col-head">Who I am</p>
            <p>I'm an American-Dutch strategic advisor based in Almere. My background spans coaching, life sciences and software engineering, giving me a perspective that connects people, organisations and technology.</p>
            <p>When a project calls for additional expertise, I work with a trusted network of designers, engineers and advisors selected for the challenge at hand.</p>
          </div>
        </div>

        {/* ── CTA strip ── */}
        <div className="ap-foot reveal" ref={ctaRef}>
          <span className="ap-foot-q">Not sure where to start?</span>
          <div className="ap-foot-links">
            <a className="tlink teal" href="https://laurenhg.myflodesk.com/7questions" target="_blank" rel="noopener noreferrer">Get the 7 Questions</a>
            <a className="tlink" href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3A5nsTcS-Wy2VYIoEASrTnKavGe4kk5iAwJ23ZjT4Q7dhR0hAVijdlmnBx4Qrk3Ly2TPaqL5ac" target="_blank" rel="noopener noreferrer">
              Book a conversation
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
