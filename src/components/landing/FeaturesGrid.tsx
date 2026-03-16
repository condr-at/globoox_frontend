import { SectionLabel } from './SectionLabel';

export function FeaturesGrid() {
  return (
    <section className="fg-section" style={{ padding: '120px 0' }}>
      <div className="fg-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
      <div style={{ marginBottom: '80px' }}>
        <span
          style={{
            textTransform: 'uppercase',
            fontSize: '12px',
            fontWeight: 600,
            color: '#C05A3A',
            letterSpacing: '0.12em',
            marginBottom: '16px',
            display: 'block',
          }}
        >
          How it Works
        </span>
        <h2
          className="fg-heading"
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '48px',
            lineHeight: 1.1,
            color: '#2C3B2D',
            marginBottom: '24px',
          }}
        >
          Powerful features for every reader
        </h2>
      </div>

      <div
        className="fg-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '24px',
        }}
      >
        {/* The Method - small card (5 columns) */}
        <div
          className="fg-card fg-card-sm"
          style={{
            gridColumn: 'span 5',
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '48px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <SectionLabel>The Method</SectionLabel>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 400,
                letterSpacing: '-0.01em',
                fontSize: '32px',
                marginBottom: '16px',
                color: '#2C3B2D',
              }}
            >
              Seamless by design.
            </h2>
            <ol style={{ margin: '24px 0 0 0', color: '#7A8C7B' }}>
              <li style={{ marginBottom: '12px', paddingLeft: '0' }}>Upload your manuscript</li>
              <li style={{ marginBottom: '12px', paddingLeft: '0' }}>Select your destination language</li>
              <li style={{ marginBottom: '12px', paddingLeft: '0' }}>Begin your literary journey</li>
            </ol>
          </div>
        </div>

        {/* Advanced Engine - large dark card (7 columns) */}
        <div
          className="fg-card fg-card-lg"
          style={{
            gridColumn: 'span 7',
            background: '#2C3B2D',
            borderRadius: '12px',
            padding: '48px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <SectionLabel style={{ color: '#C4826E' }}>Advanced Engine</SectionLabel>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 400,
                letterSpacing: '-0.01em',
                fontSize: '32px',
                marginBottom: '16px',
                color: 'white',
              }}
            >
              Thought-for-thought translation.
            </h2>
            <p style={{ color: 'rgba(244, 240, 232, 0.7)', fontSize: '17px' }}>
              We move beyond literal substitution. Our engine preserves the author&apos;s voice, cultural idioms, and the
              emotional resonance of every passage.
            </p>
          </div>
        </div>

        {/* Privacy First - large card (7 columns) */}
        <div
          className="fg-card fg-card-lg"
          style={{
            gridColumn: 'span 7',
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '48px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <SectionLabel>Privacy First</SectionLabel>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 400,
                letterSpacing: '-0.01em',
                fontSize: '32px',
                marginBottom: '16px',
                color: '#2C3B2D',
              }}
            >
              Your library, kept private.
            </h2>
            <p style={{ color: '#7A8C7B', fontSize: '17px' }}>
              We respect the sanctity of your personal collection. Files are processed securely, encrypted at rest, and
              never stored beyond the translation window.
            </p>
          </div>
        </div>

        {/* Premium Access - small card (5 columns) */}
        <div
          className="fg-card fg-card-sm"
          style={{
            gridColumn: 'span 5',
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '48px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            borderColor: '#C05A3A',
          }}
        >
          <div>
            <SectionLabel>Premium Access</SectionLabel>
            <h2
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 400,
                letterSpacing: '-0.01em',
                fontSize: '32px',
                marginBottom: '16px',
                color: '#2C3B2D',
              }}
            >
              Simple pricing.
            </h2>
            <div
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '56px',
                fontWeight: '700',
                margin: '16px 0',
                color: '#2C3B2D',
              }}
            >
              $4.99
              <span style={{ fontSize: '18px', color: '#7A8C7B', fontWeight: '400' }}> / month</span>
            </div>
            <p style={{ fontSize: '15px', color: '#7A8C7B' }}>
              Includes unlimited translations and cloud sync across all your reading devices.
            </p>
          </div>
        </div>
      </div>
      </div>

      <style>{`
        /* Mobile: < 640px */
        @media (max-width: 639px) {
          .fg-section {
            padding: 60px 0 !important;
          }
          .fg-container {
            padding: 0 20px !important;
          }
          .fg-heading {
            font-size: 28px !important;
          }
          .fg-grid {
            grid-template-columns: 1fr !important;
          }
          .fg-card {
            grid-column: span 1 !important;
            padding: 24px !important;
          }
        }

        /* Tablet: 640px – 1023px */
        @media (min-width: 640px) and (max-width: 1023px) {
          .fg-section {
            padding: 80px 0 !important;
          }
          .fg-container {
            padding: 0 32px !important;
          }
          .fg-heading {
            font-size: 36px !important;
          }
          .fg-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .fg-card {
            grid-column: span 1 !important;
            padding: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
