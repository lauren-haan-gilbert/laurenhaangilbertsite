import './Contact.css';

export default function Contact() {
  return (
    <div className="section wrap" id="contact">
      <p className="tag reveal">Get in touch</p>
      <h2 className="reveal d1" style={{ marginBottom: '1rem' }}>
        Ready to<br /><em>start?</em>
      </h2>
      <p className="body-p reveal d1" style={{ marginBottom: '2.5rem' }}>
        Reach out. We'll find out together if this is a fit.
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
          <label>What brings you here</label>
          <textarea placeholder="Tell me a little about what you're working through..." />
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button type="submit" className="tlink">Send message</button>
        </div>
      </form>
    </div>
  );
}
