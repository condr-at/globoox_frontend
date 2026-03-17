'use client';

import Image from 'next/image';
import { SectionLabel } from './SectionLabel';

export function SupportedLanguages() {
  const currentLangs = ['English', 'Spanish', 'Russian', 'French'];
  const futureLangs = ['Arabic', 'Chinese', 'and dozens more'];

  return (
    <section style={{ padding: '120px 40px', background: 'var(--ink)' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
        className="supported-split"
      >
        <div style={{ maxWidth: '500px' }}>
          <div style={{ marginBottom: '24px' }}>
            <Image
              src="/images/globe.png"
              alt="Globe icon"
              width={64}
              height={79}
              unoptimized
              style={{ width: '64px', height: 'auto' }}
            />
          </div>
          <SectionLabel>Supported Formats</SectionLabel>
          <h2
            className="supported-heading"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '48px',
              lineHeight: 1.1,
              color: 'var(--parchment)',
              marginBottom: '32px',
              fontWeight: 400,
            }}
          >
            EPUB and growing.
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--ash)',
              lineHeight: 1.7,
            }}
          >
            Right now we support EPUB books and can translate them into English, Spanish, Russian, and French. Arabic, Chinese, and dozens of other languages will be available soon.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}
          className="supported-card"
        >
          <div>
            <h3 style={{ color: 'var(--ash)', fontFamily: "'Inter', sans-serif", fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px', fontWeight: 600 }}>
              Available Now
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {currentLangs.map(lang => (
                <span key={lang} style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 500,
                  boxShadow: '0 4px 14px rgba(192, 90, 58, 0.25)',
                }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)' }} />

          <div>
            <h3 style={{ color: 'var(--ash)', fontFamily: "'Inter', sans-serif", fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px', fontWeight: 600 }}>
              Coming Soon
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {futureLangs.map(lang => (
                <span key={lang} style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--ash)',
                  fontSize: '16px',
                  fontWeight: 500,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1023px) {
          .supported-split {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .supported-card {
            padding: 32px !important;
          }
        }
        @media (max-width: 639px) {
          .supported-heading {
            font-size: 36px !important;
          }
          .supported-card span {
            font-size: 14px !important;
            padding: 10px 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
