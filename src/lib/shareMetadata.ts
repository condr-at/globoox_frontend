import type { Metadata } from 'next';

export const sharedPreviewTitle = 'Globoox — Read Any Book in Your Language';

export const sharedPreviewDescription =
  'Reading app that instantly translates ebooks into your native language with Al. Upload EPUBs and read in English, French, Spanish or Russian';

export function createSharedPreviewMetadata(url: string): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      title: sharedPreviewTitle,
      description: sharedPreviewDescription,
      type: 'website',
      url,
      siteName: 'Globoox',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: sharedPreviewTitle,
      description: sharedPreviewDescription,
    },
  };
}