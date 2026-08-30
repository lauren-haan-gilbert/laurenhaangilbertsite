import { useEffect, useRef } from 'react';
import Footer from './Footer';
import './WorkPage.css';

const CHECKLIST_URL = 'https://laurenhg.myflodesk.com/7questions';
const BOOKING_URL   = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3A5nsTcS-Wy2VYIoEASrTnKavGe4kk5iAwJ23ZjT4Q7dhR0hAVijdlmnBx4Qrk3Ly2TPaqL5ac';

const OFFERS = [
  {
    num: '01',
    id: 'service-decision-canvas',
    title: 'The Decision Canvas',
    body: 'A focused half-day on a single decision. A structured examination of the intended outcome, who it serves, the current cost of inaction, and the change the initiative is expected to deliver. You receive a written decision brief — a clear recommendation to proceed, defer, or reconsider, with the conditions attached.',
  },
  {
    num: '02',
    id: 'service-decision-roadmap',
    title: 'The Decision Roadmap',
    body: 'For decisions that reach across functions. A deeper engagement that brings each affected perspective into the picture, surfaces where understanding differs, and establishes the distance between the current and intended state. You come away with a sequenced roadmap: the recommended actions, their order, and the conditions for each.',
    featured: true,
  },
  {
    num: '03',
    id: 'service-project-advisory',
    title: 'Project Advisory',
    body: 'Where a decision leads to a build, I can provide continuity between the objective and the delivery work — an ongoing bridging role that helps ensure what\'s built stays directed toward the intended outcome. The organisation retains ownership of its decision; the practice supports faithful execution of it.',
  },
];

const WORDS = ['The', 'work', 'that', 'happens', 'BREAK', 'before', 'the', 'build', 'begins.'];

export default function WorkPage({ showPage, goTo, goToPageElement }) {
  const servicesRef = useRef(null);
  const ctaRef      = useRef(null);
  const hlCtaRef    = useRef(null);
  const hlLeadRef   = useRef(null);

  // Consume pending scroll from footer service links
  useEffect(() => {
    const id = window._pendingScroll;
    if (id) {
      window._pendingScroll = null;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  // Word-by-word headline
  useEffect(() => {
    const wordEls = document.querySelectorAll('.wp-word');
    wordEls.forEach((w, i) => {
      setTimeout(() => w.classList.add('visible'), 250 + i * 85);
    });
    // Lead highlight after words land
    setTimeout(() => {
      if (hlLeadRef.current) hlLeadRef.current.classList.add('sweep');
    }, 1400);
    // Floating image
    setTimeout(() => {
      const img = document.getElementById('wp-float-img');
      if (img) img.classList.add('visible');
    }, 500);
  }, []);

  // Services stagger
  useEffect(() => {
    const el = servicesRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.wp-service').forEach(s => s.classList.add('visible'));
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // CTA highlight
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          if (hlCtaRef.current) hlCtaRef.current.classList.add('sweep');
        }, 200);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="work-page">

      {/* ── Hero ── */}
      <section className="wp-hero">
        <div className="wp-hero-left">
          <span className="wp-kicker">Ways to Work Together</span>
          <h1 className="wp-h1">
            {WORDS.map((w, i) =>
              w === 'BREAK' ? <br key="br" /> :
              w === 'before' ? <span key={i} className="wp-word wp-word--em"><em>{w}</em></span> :
              <span key={i} className="wp-word">{w}</span>
            )}
          </h1>
          <p className="wp-lead">
            The success of big technology and data decisions is often determined long before
            implementation begins. It starts with a{' '}
            <span className="wp-hl wp-hl--teal" ref={hlLeadRef}>
              clear objective, aligned stakeholders,
            </span>{' '}
            and a strong case for investment.
          </p>
        </div>
        <div className="wp-hero-right">
          <img
            id="wp-float-img"
            src="/Cconnections_card.png"
            alt="Decision connections diagram"
            className="wp-float-img"
          />
        </div>
      </section>

      <div className="wp-sep" />

      {/* ── Services ── */}
      <div className="wp-services" ref={servicesRef}>
        {OFFERS.map((offer, i) => (
          <div
            key={offer.num}
            id={offer.id}
            className={`wp-service${offer.featured ? ' wp-service--featured' : ''}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="wp-service-num">{offer.num}</span>
            <div className="wp-service-title">{offer.title}</div>
            <p className="wp-service-body">{offer.body}</p>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="wp-cta" ref={ctaRef}>
        <p className="wp-cta-q">
          <span className="wp-hl" ref={hlCtaRef}>
            Most engagements begin with a conversation,
          </span>{' '}
          or with the checklist.
        </p>
        <div className="wp-cta-links">
          <a className="tlink teal" href={CHECKLIST_URL} target="_blank" rel="noopener noreferrer">Get the 7 Questions</a>
          <a className="tlink" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a conversation
          </a>
        </div>
      </div>

      <Footer showPage={showPage} goToPageElement={goToPageElement} />
    </div>
  );
}
