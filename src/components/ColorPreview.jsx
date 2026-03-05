import './ColorPreview.css';

const OPTIONS = [
  {
    label: 'A',
    hex: '#4A3680',
    name: 'Royal Deep',
    note: 'Closest to your first suggestion. Serious, grounded, authoritative.',
  },
  {
    label: 'B',
    hex: '#3D2B8C',
    name: 'Indigo Violet',
    note: 'Your second suggestion. Slightly more blue — sharp and contemporary.',
  },
  {
    label: 'C',
    hex: '#2D1F6E',
    name: 'Midnight Indigo',
    note: 'Darkest of the four. Maximum depth and gravitas — almost navy-adjacent.',
  },
  {
    label: 'D',
    hex: '#4F35A1',
    name: 'Electric Depth',
    note: 'A touch more vibrant than B. Rich but not heavy — modern and confident.',
  },
];

function swatch(hex) {
  // Derive a very light tint (~8% opacity on white) for backgrounds
  return `${hex}14`;
}

function darken(hex) {
  // Simple darkened version for button hover (done via opacity in CSS)
  return hex;
}

export default function ColorPreview() {
  return (
    <div className="cp-wrapper">
      <p className="cp-header-label">Color Options</p>
      <h2 className="cp-header-title">Choose your accent colour</h2>
      <p className="cp-header-sub">
        Each card shows how the colour applies to the key design elements — name label, tagline, button, and section tint.
      </p>

      <div className="cp-grid">
        {OPTIONS.map((opt) => (
          <div key={opt.label} className="cp-card">
            <div className="cp-card-top">
              <span className="cp-option-label" style={{ color: opt.hex }}>
                Option {opt.label}
              </span>
              <span className="cp-hex">{opt.hex}</span>
            </div>

            {/* Swatch bar */}
            <div className="cp-swatch-bar" style={{ backgroundColor: opt.hex }} />

            {/* Mini hero preview */}
            <div className="cp-mini-hero" style={{ backgroundColor: swatch(opt.hex) }}>
              <p className="cp-mini-name" style={{ color: opt.hex }}>
                Lauren Haan Gilbert
              </p>
              <p className="cp-mini-opening">
                You're capable. You know it.
              </p>
              <p className="cp-mini-tagline" style={{ color: opt.hex }}>
                I help people who are ready to evolve.
              </p>
              <p className="cp-mini-subline">
                For individuals and organisations who know something needs to change.
              </p>
              <a
                className="cp-mini-cta"
                style={{ backgroundColor: opt.hex }}
                href="#contact"
              >
                Let's talk
              </a>
            </div>

            {/* Name and description */}
            <div className="cp-card-footer">
              <p className="cp-color-name" style={{ color: opt.hex }}>{opt.name}</p>
              <p className="cp-color-note">{opt.note}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="cp-instruction">
        Tell me which one feels right — or describe what you'd adjust — and I'll apply it globally and remove this preview.
      </p>
    </div>
  );
}
