import type { Metadata } from 'next';
import { createSharedPreviewMetadata } from '@/lib/shareMetadata';

export const metadata: Metadata = {
  title: 'My Books | Globoox',
  description:
    'Your Globoox library. Keep your translated EPUBs, sync reading progress, and continue reading across devices.',
  alternates: {
    canonical: '/my-books',
  },
  ...createSharedPreviewMetadata('/my-books'),
};

export default function MyBooksLayout({ children }: { children: React.ReactNode }) {
  return children;
}