'use client';

import { useEffect, useState } from 'react';

interface UseCase {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
}

const useCases: UseCase[] = [
  {
    icon: '',
    title: 'Scholars',
    subtitle: 'Study sources in any language',
    description:
      'Access primary sources, monographs, and scholarly texts in their original language. Understand the precise terminology and argumentation without relying on sparse or outdated translations.',
    benefits: ['Read primary sources', 'Precise terminology', 'Cross-language citations', 'Deeper comprehension'],
  },
  {
    icon: '',
    title: 'Researchers',
    subtitle: 'Access global knowledge without limits',
    description:
      'Read research papers, academic texts, and specialized knowledge from around the world in your preferred language. Never let language barriers limit your research.',
    benefits: ['Break language barriers', 'Access global research', 'Maintain academic rigor', 'Faster comprehension'],
  },
  {
    icon: '',
    title: 'Non-fiction Readers',
    subtitle: 'Explore ideas from every language',
    description:
      'Access the best non-fiction from around the world — science, history, philosophy, business — in your native language, without waiting for a traditional translation.',
    benefits: ['Read global non-fiction', 'Stay current with ideas', 'No waiting for publishers', 'Unlimited selection'],
  },
];

export function UseCases() {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    useCases.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleIndices((prev) => new Set(prev).add(index));
      }, index * 150);

      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <section className="usecases-section" style={{ padding: '120px 0', background: '#2C3B2D' }}>
      <div className="usecases-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
      <div style={{ marginBottom: '80px', textAlign: 'center' }}>
        <span
          style={{
            textTransform: 'uppercase',
            fontSize: '12px',
            fontWeight: 600,
            color: '#E8B89A',
            letterSpacing: '0.12em',
            marginBottom: '16px',
            display: 'block',
          }}
        >
          Who Uses Globoox
        </span>
        <h2
          className="usecases-heading"
          style={{
            fontFamily: 'Lora, serif',
            fontSize: '48px',
            lineHeight: 1.1,
            color: '#F4F0E8',
            marginBottom: '24px',
          }}
        >
          Perfect for every kind of reader
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: '#F4F0E8',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Whatever brings you to reading, Globoox adapts to your needs
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
        }}
      >
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="usecases-card"
            style={{
              opacity: visibleIndices.has(index) ? 1 : 0,
              transform: visibleIndices.has(index) ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              padding: '40px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Title */}
            <div>
              <h3
                style={{
                  fontFamily: 'Lora, serif',
                  fontSize: '24px',
                  fontWeight: 400,
                  color: '#F4F0E8',
                  marginBottom: '8px',
                }}
              >
                {useCase.title}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: '#E8B89A',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0,
                }}
              >
                {useCase.subtitle}
              </p>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: '#F4F0E8',
                margin: 0,
              }}
            >
              {useCase.description}
            </p>

            {/* Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
              {useCase.benefits.map((benefit, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: '#E8B89A',
                      borderRadius: '50%',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '14px', color: '#F4F0E8' }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
      <style>{`
        @media (max-width: 639px) {
          .usecases-section { padding: 60px 0 !important; }
          .usecases-container { padding: 0 20px !important; }
          .usecases-heading { font-size: 28px !important; }
          .usecases-card { padding: 20px !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .usecases-heading { font-size: 36px !important; }
        }
      `}</style>
    </section>
  );
}
