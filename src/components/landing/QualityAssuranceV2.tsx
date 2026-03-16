import { CompareSlider } from './CompareSlider';

export function QualityAssuranceV2() {
  return (
    <section style={{ padding: '120px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
      <div style={{ marginBottom: '80px', textAlign: 'center' }}>
        <span
          style={{
            textTransform: 'uppercase',
            fontSize: '12px',
            fontWeight: 600,
            color: '#B25032',
            letterSpacing: '0.12em',
            marginBottom: '16px',
            display: 'block',
          }}
        >
          Quality Assurance
        </span>
        <h2
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '48px',
            lineHeight: 1.1,
            color: '#1A2420',
            marginBottom: '24px',
            margin: '0 auto 24px',
            maxWidth: '600px',
          }}
        >
          Every Translation is Vetted
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: '#666',
            maxWidth: '600px',
            lineHeight: 1.6,
            margin: '0 auto',
          }}
        >
          Our multi-layer quality system ensures translations preserve literary nuance while maintaining readability in your language.
        </p>
      </div>

      <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center' }}>
        {/* MacBook mockup — visible on lg+ (≥1024px) */}
        <div className="device-macbook" style={{ position: 'relative', width: '100%', maxWidth: '800px' }}>
          {/* MacBook lid */}
          <div
            style={{
              width: '100%',
              aspectRatio: '520 / 340',
              background: '#C8C4BC',
              borderRadius: '16px 16px 4px 4px',
              padding: '1.5%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#1A2420',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div className="device-screen-slider" style={{ width: '100%', height: '100%' }}>
                <CompareSlider />
              </div>
            </div>
          </div>
          {/* MacBook base */}
          <div
            style={{
              width: 'calc(100% + 60px)',
              height: '18px',
              background: '#B8B4AC',
              marginLeft: '-30px',
              borderRadius: '2px 2px 12px 12px',
              position: 'relative',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* Tablet mockup — visible on md (≥640px and <1024px) */}
        <div className="device-tablet" style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '3 / 4',
              background: '#C8C4BC',
              borderRadius: '24px',
              padding: '3%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#1A2420',
                borderRadius: '14px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div className="device-screen-slider" style={{ width: '100%', height: '100%' }}>
                <CompareSlider />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet mockup end */}
        {/* iPhone mockup — visible on <640px */}
        <div className="device-iphone" style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <div
            style={{
              width: '100%',
              aspectRatio: '9 / 19.5',
              background: '#1A1A1A',
              borderRadius: '40px',
              padding: '3%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              position: 'relative',
              border: '3px solid #333',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#1A2420',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Dynamic Island */}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '72px',
                  height: '20px',
                  background: '#000',
                  borderRadius: '20px',
                  zIndex: 10,
                }}
              />
              <div className="device-screen-slider" style={{ width: '100%', height: '100%', paddingTop: '36px', background: '#fcfcfc' }}>
                <CompareSlider />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <style>{`
        .device-screen-slider > div { margin-top: 0 !important; height: 100% !important; }
        .device-screen-slider > div > div { height: 100% !important; border-radius: 0 !important; border: none !important; }

        /* Default: show iPhone, hide others */
        .device-macbook { display: none !important; }
        .device-tablet { display: none !important; }
        .device-iphone { display: block !important; }

        /* ≥640px: show tablet */
        @media (min-width: 640px) {
          .device-iphone { display: none !important; }
          .device-tablet { display: block !important; }
        }

        /* ≥1024px: show macbook */
        @media (min-width: 1024px) {
          .device-tablet { display: none !important; }
          .device-macbook { display: block !important; }
        }
      `}</style>
    </section>
  );
}
