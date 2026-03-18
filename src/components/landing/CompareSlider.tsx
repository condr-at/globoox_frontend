'use client';

import { useRef, useState, useEffect } from 'react';

export function CompareSlider() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const move = (clientX: number) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(((clientX - rect.left) / rect.width) * 100, 100));
    setPosition(p);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) move(e.clientX);
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current) move(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const readerHeader: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 24px',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    fontSize: '11px',
    fontFamily: "'Inter', sans-serif",
    letterSpacing: '0.02em',
  };

  return (
    <div style={{ marginTop: '40px', width: '100%' }}>
      <div
        ref={wrapRef}
        onMouseDown={(e) => {
          isDragging.current = true;
          move(e.clientX);
        }}
        onTouchStart={(e) => {
          isDragging.current = true;
          move(e.touches[0].clientX);
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.08)',
          cursor: 'col-resize',
        }}
      >
        {/* Layer 1: Original (left) */}
        <div
          lang="en"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Lora', serif",
            background: '#fcfcfc',
            color: 'var(--ink)',
            hyphens: 'auto',
          }}
        >
          <div style={{ ...readerHeader, color: '#999' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            <span>Human Evolution · Alexander Markov</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div className="compare-text-pad" style={{ flex: 1, overflow: 'hidden', padding: '28px 32px' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 400, marginBottom: '14px', fontFamily: "'Lora', serif" }}>
                In Search of the Soul's Edge
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '10px' }}>
                Of course, science today cannot boast of having fully deciphered every secret of the human psyche. Many unsolved problems still remain unresolved. The main one among them is that neurobiologists cannot yet even theoretically imagine how a perceiving subject—the "I"—can be constructed from individual neurons and synapses.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.8, margin: 0 }}>
                But the trend is obvious: one by one, the most important aspects of the human personality, considered until very recently out of reach for the natural sciences (for example, memory, emotions, and even morality), are confidently moving into the material sphere, revealing their physiological, cellular, biochemical nature and evolutionary roots.
              </p>
            </div>
          </div>
        </div>

        {/* Layer 2: Translation (right, revealed by slider) */}
        <div
          lang="ru"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Lora', serif",
            background: '#fffbf9',
            color: 'var(--primary)',
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            hyphens: 'auto',
          }}
        >
          <div style={{ ...readerHeader, color: 'var(--dusk)', borderBottomColor: 'rgba(178,80,50,0.1)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dusk)" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            <span>Эволюция Человека · А. Марков</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--dusk)" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <div className="compare-text-pad" style={{ flex: 1, overflow: 'hidden', padding: '28px 32px' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 400, marginBottom: '14px', fontFamily: "'Lora', serif", color: 'var(--primary)' }}>
                В поисках душевной грани
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '10px' }}>
                Конечно, наука и сегодня не может похвастаться полной расшифровкой всех тайн человеческой психики. Нерешённых проблем ещё много. Главная из них в том, что нейробиологи не могут пока даже теоретически себе представить, как из нейронов и синапсов может быть сделан воспринимающий субъект — «я».
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.8, margin: 0 }}>
                Но тенденция налицо: один за другим важнейшие аспекты человеческой личности, до самого последнего времени считавшиеся недосягаемыми для естественных наук, уверенно переносятся в сферу материального, раскрывают свою физиологическую, клеточную, биохимическую природу и эволюционные корни.
              </p>
            </div>
          </div>
        </div>

        {/* <span
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            padding: '4px 10px',
            borderRadius: '4px',
            background: '#eee',
            color: 'var(--ash)',
            zIndex: 5,
          }}
        >
          ORIGINAL ENGLISH
        </span>

        <span
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            padding: '4px 10px',
            borderRadius: '4px',
            background: '#fdeee9',
            color: 'var(--primary)',
            zIndex: 5,
          }}
        >
          RUSSIAN TRANSLATION
        </span>  */}

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${position}%`,
            width: '1px',
            height: '100%',
            background: 'var(--primary)',
            transform: 'translateX(-50%)',
            zIndex: 3,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: '36px',
            height: '36px',
            background: 'white',
            border: '1px solid var(--primary)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
            userSelect: 'none',
          }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="var(--primary)" strokeWidth="2.5">
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>
      <style>{`
        @media (max-width: 639px) {
          .compare-text-pad { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (min-width: 1024px) {
          .compare-text-pad h3 { font-size: 20px !important; }
          .compare-text-pad p { font-size: 15px !important; }
        }
      `}</style>
    </div>
  );
}
