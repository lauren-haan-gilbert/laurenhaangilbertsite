import './Nav.css';

export default function Nav({ showPage, goTo, currentPage }) {
  return (
    <nav className="site-nav">
      <a
        href="#"
        className="site-nav__name"
        onClick={e => { e.preventDefault(); showPage('home'); }}
      >
        Lauren Haan Gilbert
      </a>
      <ul className="site-nav__links">
        <li>
          <a href="#" onClick={e => { e.preventDefault(); showPage('home'); }}>
            Home
          </a>
        </li>
        <li>
          <a href="#" onClick={e => { e.preventDefault(); showPage('questions'); }}>
            Questions
          </a>
        </li>
        <li>
          <a href="#" onClick={e => { e.preventDefault(); goTo('work'); }}>
            Work
          </a>
        </li>
        <li>
          <a href="#" onClick={e => { e.preventDefault(); goTo('contact'); }}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
