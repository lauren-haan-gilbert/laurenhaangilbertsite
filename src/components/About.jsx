import { useEffect } from 'react';
import './About.css';

export default function About() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="bg-cream" id="about" style={{ padding: '9vh 0' }}>
      <div className="wrap">
        <div className="about-grid">

          {/* LEFT — photo collage */}
          <div className="photo-stack reveal">

            {/* Water photo — top left */}
            <div className="stack-img stack-img--back">
              <img src="lauren_water.JPG" alt="Lauren by the water" />
            </div>

            {/* Headshot polaroid — center right */}
            <div className="stack-img stack-img--front">
              <img src="lauren-headshot.png" alt="Lauren Haan Gilbert" />
            </div>

            {/* Connections card — bottom left */}
            <div className="stack-img stack-img--mid">
              <img src="Cconnections_card.png" alt="Connections drawing" />
            </div>

          </div>

          {/* RIGHT — text */}
          <div className="about-text">
            <p className="tag reveal">About</p>
            <h2 className="reveal d1">Making the<br />invisible visible.</h2>
            <p className="body-p reveal d1">
              My life has taken me across diverse cultures and countries. Those choices put me in
              the middle of complex problems, difficult transitions, and moments where change was
              needed but nothing was moving.
            </p>
            <p className="body-p reveal d2">
              I know what it feels like to want to solve something but lack the language or
              awareness to put growth in motion. Creating that guided structure is what brought
              me to this work.
            </p>
            <p className="body-p reveal d2">
              Very often what we say is a stepping stone to a deeper awareness of what's possible.
              Making those crossings less confusing and more conscious — that's what we do together.
            </p>
            <p className="body-p reveal d2">
              I'm a dual US-Dutch citizen based in the Netherlands, working internationally.
            </p>
            <p className="pullquote reveal d2">
              "People often say two things: that they don't feel alone with their challenges anymore,
              and that they see their situation differently than when we started."
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
