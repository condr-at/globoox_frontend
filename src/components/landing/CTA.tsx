'use client';

import { useState } from 'react';

export function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="cta-section"
      style={{
        padding: '240px 0 180px 0',
        textAlign: 'center',
        background: 'var(--ink)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating multilingual scripts */}
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '52px', pointerEvents: 'none', top: '5%', left: '3%', animation: 'float 8s infinite ease-in-out' }}>Lesen</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '64px', pointerEvents: 'none', top: '18%', right: '5%', animation: 'float 8s infinite ease-in-out', animationDelay: '2s' }}>読む</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '44px', pointerEvents: 'none', bottom: '15%', left: '10%', animation: 'float 8s infinite ease-in-out', animationDelay: '4s' }}>Lire</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '58px', pointerEvents: 'none', bottom: '25%', right: '8%', animation: 'float 8s infinite ease-in-out', animationDelay: '1s' }}>Читать</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '48px', pointerEvents: 'none', top: '40%', left: '2%', animation: 'float 8s infinite ease-in-out', animationDelay: '3s' }}>Leggere</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '56px', pointerEvents: 'none', top: '8%', right: '22%', animation: 'float 8s infinite ease-in-out', animationDelay: '5s' }}>قراءة</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '42px', pointerEvents: 'none', bottom: '8%', right: '30%', animation: 'float 8s infinite ease-in-out', animationDelay: '0.5s' }}>Ler</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '60px', pointerEvents: 'none', top: '55%', right: '2%', animation: 'float 8s infinite ease-in-out', animationDelay: '3.5s' }}>읽다</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '46px', pointerEvents: 'none', bottom: '5%', left: '30%', animation: 'float 8s infinite ease-in-out', animationDelay: '6s' }}>Okumak</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '50px', pointerEvents: 'none', top: '3%', left: '35%', animation: 'float 8s infinite ease-in-out', animationDelay: '1.5s' }}>Läsa</div>
      <div className="floating-script" style={{ position: 'absolute', fontFamily: "'Lora', serif", color: 'var(--parchment)', opacity: 0.07, fontSize: '54px', pointerEvents: 'none', top: '65%', left: '18%', animation: 'float 8s infinite ease-in-out', animationDelay: '4.5s' }}>पढ़ना</div>


      <div className="cta-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
      <h2
        className="cta-heading"
        style={{
          fontFamily: "'Lora', serif",
          fontWeight: 400,
          letterSpacing: '-0.01em',
          fontSize: '48px',
          marginBottom: '24px',
          color: '#FFFFFF',
        }}
      >
        Begin your first chapter free.
      </h2>
      <p
        style={{
          fontSize: '20px',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px',
        }}
      >
        No commitment required. We&apos;ll translate your first three books with our compliments.
      </p>
      <button
        style={{
          display: 'inline-block',
          background: isHovered ? 'var(--dusk)' : '#FFFFFF',
          color: isHovered ? '#FFFFFF' : 'var(--ink)',
          padding: '16px 32px',
          borderRadius: '8px',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: '16px',
          transition: 'all 0.2s ease',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {}}
      >
        Get Started — It&apos;s Free
      </button>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .cta-section {
            padding: 80px 0 60px 0 !important;
          }
          .cta-heading {
            font-size: 28px !important;
          }
          .cta-container {
            padding: 0 20px !important;
          }
          .floating-script {
            display: none !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .cta-section {
            padding: 120px 0 100px 0 !important;
          }
          .floating-script {
            font-size: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
