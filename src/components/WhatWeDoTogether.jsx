

import { useEffect } from 'react';
import './WhatWeDoTogether.css';

export default function WhatWeDoTogether({ goTo }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('#work .reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section wrap" id="work">
      <p className="tag reveal">What we do together</p>
      <h2 className="reveal d1">Two ways<br />to work together.</h2>
      <div className="cards-outer">
        <div className="card card-a reveal">
          <p className="card-num">01 — One to One</p>
          <h3>A one-degree error at takeoff becomes miles off course by landing.</h3>
          <p className="body-p">
            In one to one work, we look at what's present in your story, explore what else might
            be true, and where that information could guide you.
          </p>
          <p className="body-p">
            Sometimes it's the micro-adjustments that most profoundly change our trajectory.
            This isn't therapy — it's a focused, contained process for people ready to see things differently.
          </p>
          <p className="body-p" style={{ fontStyle: 'italic', color: 'var(--ink)' }}>
            We begin with a single conversation.
          </p>
          <br />
          <button className="tlink teal" onClick={() => goTo('contact')}>
            Start with a conversation
          </button>
        </div>
        <div className="card card-b reveal d1">
          <p className="card-num">02 — Workshops &amp; Facilitation</p>
          <h3>Most projects fail not because of bad execution — but because the wrong question was asked at the start.</h3>
          <p className="body-p">
            I facilitate workshops that change that. In a contained, structured session, teams and
            individuals identify what they're actually trying to decide, who owns it, and what the
            simplest path forward looks like.
          </p>
          <p className="body-p">
            Less wasted effort. Higher alignment. People who feel heard rather than steamrolled.
          </p>
          <p className="body-p" style={{ fontStyle: 'italic', color: 'var(--ink)' }}>
            Available for teams, organisations, and leadership groups.
          </p>
          <br />
          <button className="tlink teal" onClick={() => goTo('contact')}>
            Bring this to your team
          </button>
        </div>
      </div>
    </div>
  );
}
