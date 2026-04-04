'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LandingHeaderProps {
  navItems?: Array<{ label: string; href: string }>;
}

export function LandingHeader({ navItems = [] }: LandingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: '12px',
          left: 0,
          right: 0,
          zIndex: 40,
          padding: '0px 16px 0',
          overflow: 'visible',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 8px 8px 20px',
            borderRadius: '28px',
            backdropFilter: 'blur(14px)',
              background: 'var(--marketing-surface-bg)',
              border: '1px solid var(--marketing-border)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
          }}
        >
          <Link
            href="/"
            className="landing-header-logo"
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '22px',
              color: 'var(--marketing-text)',
              textDecoration: 'none',
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="landing-header-logo-full">Globoox</span>
            <span className="landing-header-logo-compact" style={{ display: 'none' }}>G</span>
          </Link>

          <nav className="landing-header-links" style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            {navItems.map((item) => (
              <div key={item.href} style={{ display: 'flex', alignItems: 'center' }}>
                <a
                  href={item.href}
                  style={{
                    color: 'var(--marketing-text-muted)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 500,
                    padding: '0 18px',
                  }}
                >
                  {item.label}
                </a>
              </div>
            ))}
            <a
              href="/my-books"
              className="landing-header-open-app"
              style={{
                color: 'var(--marketing-text)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                marginLeft: '28px',
                padding: '10px 16px',
                borderRadius: '999px',
                background: 'var(--marketing-accent-soft)',
                textAlign: 'center',
              }}
            >
              Open App
            </a>
          </nav>

          <button
            type="button"
            className="landing-header-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '0',
              border: 'none',
              background: 'transparent',
              color: 'var(--marketing-text)',
              cursor: 'pointer',
              padding: 0,
              position: 'relative',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'relative',
                width: '18px',
                height: '18px',
                display: 'block',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: menuOpen ? '8px' : '3px',
                  height: '2px',
                  borderRadius: '999px',
                  background: 'var(--marketing-text)',
                  transform: menuOpen ? 'rotate(45deg)' : 'none',
                  transition: 'transform 180ms ease, top 180ms ease, opacity 180ms ease',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: '8px',
                  height: '2px',
                  borderRadius: '999px',
                  background: 'var(--marketing-text)',
                  opacity: menuOpen ? 0 : 1,
                  transition: 'opacity 180ms ease',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: menuOpen ? '8px' : '13px',
                  height: '2px',
                  borderRadius: '999px',
                  background: 'var(--marketing-text)',
                  transform: menuOpen ? 'rotate(-45deg)' : 'none',
                  transition: 'transform 180ms ease, top 180ms ease',
                }}
              />
            </span>
          </button>
        </div>

        {menuOpen && navItems.length > 0 && (
          <div
            className="landing-header-mobile-menu"
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              left: '8px',
              right: '8px',
              display: 'none',
              flexDirection: 'column',
              gap: '0',
              padding: '22px 20px 24px',
              borderRadius: '20px',
              background: 'var(--marketing-overlay-bg)',
              border: '1px solid var(--marketing-border)',
              boxShadow: '0 18px 40px rgba(0,0,0,0.12)',
            }}
          >
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'var(--marketing-text-muted)',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  padding: '14px 0',
                  borderBottom: index < navItems.length - 1 ? '1px solid var(--marketing-border)' : 'none',
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/my-books"
              onClick={() => setMenuOpen(false)}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
                padding: '12px 16px',
                marginTop: '22px',
                borderRadius: '12px',
                background: 'var(--marketing-accent)',
                textAlign: 'center',
              }}
            >
              Open App
            </a>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 769px) {
          .landing-header-links {
            display: none !important;
          }
          .landing-header-menu-btn {
            display: inline-flex !important;
          }
          .landing-header-mobile-menu {
            display: flex !important;
          }
          .landing-header-logo-full {
            display: inline !important;
          }
          .landing-header-logo-compact {
            display: none !important;
          }
        }
        @media (min-width: 770px) and (max-width: 839px) {
          .landing-header-logo-full {
            display: none !important;
          }
          .landing-header-logo-compact {
            display: inline !important;
          }
        }
        @media (min-width: 840px) {
          .landing-header-logo-full {
            display: inline !important;
          }
          .landing-header-logo-compact {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
