import { useState } from 'react';
import './Nav.css';

export default function Nav({ showPage, goTo, currentPage }) {
  const [open, setOpen] = useState(false);

  const go = (page) => {
    showPage(page);
    setOpen(false);
  };

  return (
    <nav className={`site-nav${open ? ' nav-open' : ''}`}>
      <a
        href="#"
        className="site-nav__name"
        onClick={e => { e.preventDefault(); go('home'); }}
      >
        Lauren Haan Gilbert
      </a>

      <button
        className={`site-nav__burger${open ? ' open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      <ul className="site-nav__links">
        <li><a href="#" onClick={e => { e.preventDefault(); go('home'); }}>Home</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); go('questions'); }}>Questions</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); go('work'); }}>Work</a></li>
        <li><a href="#" onClick={e => { e.preventDefault(); go('about'); }}>About</a></li>
      </ul>
    </nav>
  );
}
