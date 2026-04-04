'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { sha256 } from 'js-sha256';
import { createClient } from '@/lib/supabase/client';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          prompt: () => void;
          cancel: () => void;
        };
      };
    };
  }
}

export default function GoogleOneTap() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const doneRef = useRef(false);

  async function buildNoncePair(): Promise<{ rawNonce?: string; hashedNonce?: string }> {
    const runtimeCrypto = window.crypto;
    // One Tap should fail closed if secure random is unavailable.
    // Do not add an insecure nonce fallback here.
    if (!runtimeCrypto?.getRandomValues) {
      console.warn('Google One Tap: secure random nonce generation is unavailable, skipping One Tap init');
      return {};
    }

    const rawNonce = window.btoa(String.fromCharCode(...runtimeCrypto.getRandomValues(new Uint8Array(32))));
    const hashedNonce = sha256(rawNonce);

    return { rawNonce, hashedNonce };
  }

  async function initOneTap() {
    if (doneRef.current || !clientId || !window.google?.accounts?.id) return;
    doneRef.current = true; // set synchronously before any await to prevent double-calls

    // Don't show to already-authenticated users
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session) return;

    const { rawNonce, hashedNonce } = await buildNoncePair();
    if (!rawNonce || !hashedNonce) {
      doneRef.current = false;
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      nonce: hashedNonce,
      cancel_on_tap_outside: false,
      callback: async ({ credential }: { credential: string }) => {
        await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: credential,
          nonce: rawNonce,
        });
      },
    });

    window.google.accounts.id.prompt();
  }

  useEffect(() => {
    if (!clientId) return;

    // Script may already be loaded (SPA navigation, HMR)
    if (window.google?.accounts?.id) {
      initOneTap();
      return;
    }

    // Poll until the GSI script is ready (covers all timing scenarios)
    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        clearInterval(interval);
        initOneTap();
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(interval), 10_000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!clientId) return null;

  return <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />;
}
