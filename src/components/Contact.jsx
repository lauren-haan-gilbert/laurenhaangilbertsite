import './Contact.css';

export default function Contact() {
  return (
    <div className="wrap contact-section" id="contact">
      <p className="tag reveal">Get in touch</p>
      <h2 className="reveal d1" style={{ marginBottom: '0.5rem' }}>
        We&apos;d Love to Hear About<br /><em>Your Projects!</em>
      </h2>
      <p className="body-p reveal d1" style={{ marginBottom: '0.5rem' }}>
        hello@laurenhaangilbert.com
      </p>
      <form className="reveal d2" onSubmit={e => e.preventDefault()}>
        <div className="ff">
          <label>Your name</label>
          <input type="text" placeholder="How should I address you?" />
        </div>
        <div className="ff">
          <label>Email</label>
          <input type="email" placeholder="your@email.com" />
        </div>
        <div className="ff">
          <label>Your message</label>
          <textarea placeholder="Tell me a little about what you&apos;re working through..." />
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button type="submit" className="tlink">Submit Message</button>
        </div>
      </form>
    </div>
  );
}
