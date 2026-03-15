import { ReactNode } from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';

export const metadata = {
  title: 'Globoox - The world\'s library, in your native language',
  description: 'Instantly translate any e-book and experience stories with the nuance and depth they were meant to be read.',
};

// Read landing.css at build time
const landingCss = readFileSync(join(process.cwd(), 'src/app/landing/landing.css'), 'utf-8');

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: landingCss }} />
      </head>
      <body>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
