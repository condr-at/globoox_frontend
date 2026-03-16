export function Footer() {
  return (
    <footer
      style={{
        padding: '32px 0',
        textAlign: 'center',
        background: '#1A2420',
        color: '#F7F5F2',
        fontSize: '14px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
      <p>© 2026 Globoox Inc. Curating the world&apos;s wisdom.</p>
      <div
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
            color: '#F7F5F2',
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
            color: '#F7F5F2',
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
            color: '#F7F5F2',
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
    </footer>
  );
}
