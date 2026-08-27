import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-col">
          <p className="footer-col-heading">About Us</p>
          <ul>
            <li>KVK: 63660713</li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Our Values</a></li>
            <li><a href="#">Experience</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-col-heading">Services</p>
          <ul>
            <li><a href="#">Decision Session</a></li>
            <li><a href="#">Decision Roadmap</a></li>
            <li><a href="#">Project Advisory</a></li>
            <li><a href="#">Speaking</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-col-heading">Contact</p>
          <ul>
            <li>Almere, The Netherlands</li>
            <li><a href="mailto:hello@laurenhaangilbert.com">hello@laurenhaangilbert.com</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-copy">
        Lauren Haan-Gilbert &copy; Copyright, 2026. All Rights Reserved.
      </div>
    </footer>
  );
}
