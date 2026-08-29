import { useState } from 'react';
import './App.css';
import CursorThread from './components/CursorThread';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ClaritySection from './components/ClaritySection';
import ThoughtProcessBlock from './components/ThoughtProcessBlock';
import { RANDSection, FileOverviewSection, ConversationSection, ChecklistSection } from './components/TechSections';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuestionsPage from './components/QuestionsPage';
import AboutPage from './components/AboutPage';
import WorkPage from './components/WorkPage';
import PrivacyPage from './components/PrivacyPage';
import CookiePage from './components/CookiePage';

/* OffersSection and About kept on disk — not rendered in current layout. */

export default function App() {
  const [page, setPage] = useState(() => window.location.hash.slice(1) || 'home');

  const showPage = (name) => {
    setPage(name);
    window.location.hash = name === 'home' ? '' : name;
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
          <RANDSection />
          <FileOverviewSection />
          <ConversationSection />
          <ChecklistSection />
          <Footer showPage={showPage} />
        </>
      )}

      {page === 'questions' && (
        <QuestionsPage showPage={showPage} goTo={goTo} />
      )}

      {page === 'work' && (
        <WorkPage showPage={showPage} goTo={goTo} />
      )}

      {page === 'about' && (
        <AboutPage showPage={showPage} goTo={goTo} />
      )}

      {page === 'privacy' && (
        <PrivacyPage showPage={showPage} />
      )}

      {page === 'cookies' && (
        <CookiePage showPage={showPage} />
      )}
    </div>
  );
}
