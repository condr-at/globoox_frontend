export function QualityAssuranceV2() {
  return (
    <section style={{ padding: '120px 0' }}>
      <div style={{ marginBottom: '80px' }}>
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
            color: '#1A1F2B',
            marginBottom: '24px',
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
            margin: 0,
          }}
        >
          Our multi-layer quality system ensures translations preserve literary nuance while maintaining readability in your language.
        </p>
      </div>

      <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* MacBook mockup */}
        <div
          style={{
            position: 'relative',
            width: '800px',
            maxWidth: '100%',
          }}
        >
          {/* MacBook frame */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px 12px 0 0',
              padding: '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              border: '1px solid #E0D9D0',
              aspectRatio: '16 / 10',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F5F3F0',
            }}
          >
            {/* Screen content placeholder */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #F7F5F2 0%, #F0E8E0 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '16px',
              }}
            >
              Mockup content coming soon
            </div>
          </div>

          {/* MacBook base */}
          <div
            style={{
              background: '#E8E0D8',
              height: '12px',
              borderRadius: '0 0 20px 20px',
              marginTop: '-1px',
            }}
          />

          {/* MacBook stand */}
          <div
            style={{
              width: '60%',
              height: '8px',
              background: '#D0C8C0',
              margin: '0 auto',
              borderRadius: '0 0 12px 12px',
            }}
          />
        </div>
      </div>
    </section>
  );
}
