import './Footer.css';

const CHECKLIST_URL = 'https://laurenhg.myflodesk.com/7questions';
const BOOKING_URL   = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3A5nsTcS-Wy2VYIoEASrTnKavGe4kk5iAwJ23ZjT4Q7dhR0hAVijdlmnBx4Qrk3Ly2TPaqL5ac';

export default function Footer({ showPage, goToPageElement }) {
  const nav = (page) => (e) => {
    e.preventDefault();
    if (showPage) { showPage(page); }
  };

  const goToService = (serviceId) => (e) => {
    e.preventDefault();
    if (goToPageElement) {
      goToPageElement('work', serviceId);
    } else if (showPage) {
      showPage('work');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-col">
          <p className="footer-col-heading">About Us</p>
          <ul>
            <li>KVK: 62660713</li>
            <li>BTW: NL002493026B06</li>
            <li><a href="/privacy" onClick={nav('privacy')}>Privacy Policy</a></li>
            <li><a href="/cookies" onClick={nav('cookies')}>Cookie Policy</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-col-heading">Services</p>
          <ul>
            <li><a href="#" onClick={goToService('service-decision-canvas')}>Decision Canvas</a></li>
            <li><a href="#" onClick={goToService('service-decision-roadmap')}>Decision Roadmap</a></li>
            <li><a href={CHECKLIST_URL} target="_blank" rel="noopener noreferrer">7 Questions Checklist</a></li>
            <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Project Advisory</a></li>
            <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Speaking</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-col-heading">Contact</p>
          <ul>
            <li>Almere, The Netherlands</li>
            <li><a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a></li>
            <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Call</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-copy">
        Lauren Haan-Gilbert &copy; Copyright, 2026. All Rights Reserved.
      </div>
    </footer>
  );
}
