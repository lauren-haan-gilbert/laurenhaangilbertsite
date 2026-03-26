import { useState } from 'react';
import './App.css';
import CursorThread from './components/CursorThread';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ClaritySection from './components/ClaritySection';
import ThoughtProcessBlock from './components/ThoughtProcessBlock';
import OffersSection from './components/OfferSection';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuestionsPage from './components/QuestionsPage';

export default function App() {
  const [page, setPage] = useState('home');

  const showPage = (name) => {
    setPage(name);
    window.scrollTo(0, 0);
  };

  const goTo = (id) => {
    if (page !== 'home') {
      setPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="site">
      <CursorThread />
      <Nav showPage={showPage} goTo={goTo} currentPage={page} />

      {page === 'home' && (
        <>
          <Hero showPage={showPage} goTo={goTo} />
          <ClaritySection />
          <ThoughtProcessBlock />
          <OffersSection />
          <About />
          <Contact />
          <Footer />
        </>
      )}

      {page === 'questions' && (
        <QuestionsPage showPage={showPage} goTo={goTo} />
      )}
    </div>
  );
}