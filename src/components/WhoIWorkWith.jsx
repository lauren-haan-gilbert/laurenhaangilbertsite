import { useEffect } from 'react';
import './WhoIWorkWith.css';

export default function WhoIWorkWith() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-cream" id="who" style={{ padding: '11vh 0' }}>
      <div className="wrap">
        <p className="tag reveal">Who I work with</p>
        <h2 className="who-headline reveal d1">
          Pioneering minds.<br />
          <em>Ready to see differently.</em>
        </h2>
        <div className="who-body">
          <p className="body-p reveal d1">
            I work with individuals and organisations who have pioneering minds and understand
            that great outcomes start with great questions.
          </p>
          <p className="body-p reveal d2">
            Even the most capable people hit walls they can't reason their way out of alone.
            Teams with the best intentions sometimes find their solutions aren't coming together
            — and can't quite put a finger on why.
          </p>
          <p className="pullquote reveal d2">
            "If you already have all the answers,<br />I'm not the one for you."
          </p>
        </div>
      </div>
    </div>
  );
}