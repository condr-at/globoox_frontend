interface FooterProps {
  tagline: string;
}

export function Footer({ tagline }: FooterProps) {
  return (
    <footer
      style={{
        padding: '32px 0',
        textAlign: 'center',
        background: 'var(--ink)',
        color: 'var(--parchment)',
        fontSize: '14px',
      }}
    >
      <div className="footer-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
      <p>{tagline}</p>
      <div
        className="footer-links"
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
        }}
      >
        <a
          href="#"
          style={{
            color: 'var(--parchment)',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'color 0.2s ease',
          }}
          onClick={(e) => e.preventDefault()}
        >
          Terms of Service
        </a>
        <a
          href="#"
          style={{
            color: 'var(--parchment)',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'color 0.2s ease',
          }}
          onClick={(e) => e.preventDefault()}
        >
          Privacy Policy
        </a>
        <a
          href="#"
          style={{
            color: 'var(--parchment)',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'color 0.2s ease',
          }}
          onClick={(e) => e.preventDefault()}
        >
          Contact Support
        </a>
      </div>
      </div>

      <style>{`
        @media (max-width: 639px) {
          .footer-container {
            padding: 0 20px !important;
          }
          .footer-links {
            flex-wrap: wrap !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </footer>
  );
}
