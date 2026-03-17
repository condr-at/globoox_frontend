'use client';

import { Hero } from '@/components/landing/Hero';
import { PrivacyManifest } from '@/components/landing/PrivacyManifest';
import { SupportedLanguages } from '@/components/landing/SupportedLanguages';
import { UseCases } from '@/components/landing/UseCases';
import { QualityAssuranceV2 } from '@/components/landing/QualityAssuranceV2';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <style>{`
        .hero-long-title {
          font-size: 42px !important;
        }
        @media (max-width: 1023px) {
          .hero-long-title {
            font-size: 32px !important;
          }
        }
        @media (max-width: 639px) {
          .hero-long-title {
            font-size: 28px !important;
          }
        }
      `}</style>
      <Hero
        variant="split"
        withBooks={true}
        title="A global ebookstore where every book instantly exists in your language"
        subtitle=""
        titleClassName="hero-long-title"
      />

      <UseCases
        label="How It Works"
        heading="Three simple steps."
        description=""
        items={[
          { title: 'Step 1', subtitle: '', description: 'Upload your ebook', imagePlaceholder: true },
          { title: 'Step 2', subtitle: '', description: 'Choose your language', imagePlaceholder: true },
          { title: 'Step 3', subtitle: '', description: 'Enjoy your book!', imagePlaceholder: true },
        ]}
      />

      <QualityAssuranceV2
        label="Translation Quality"
        heading="Translations You Can Trust"
        description="Built on an AI engine fine-tuned by expert linguists, our app delivers clear, accurate, and easy-to-read translations that capture the author's true intent."
      />

      <SupportedLanguages />

      <PrivacyManifest />

      <CTA
        heading="Start with your first book."
        description="Upload your EPUB and enjoy it in your language."
        buttonText="Upload Your First Book"
      />

      <Footer
        tagline="We are building a global book platform where any reader can discover, buy, read, and listen to any book in their native language."
      />
    </>
  );
}
