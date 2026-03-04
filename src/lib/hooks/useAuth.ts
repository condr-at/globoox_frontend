'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

let cachedUser: User | null | undefined = undefined; // undefined = unknown/not fetched yet
let cachedIsAdmin: boolean | undefined = undefined;
let cachedAdminUserId: string | undefined = undefined;
let cachedAdminFetchedAt: number | undefined = undefined;
const ADMIN_STALE_MS = 5 * 60 * 1000;

export function useAuth() {
  const [user, setUser] = useState<User | null>(cachedUser ?? null);
  const [isAdmin, setIsAdmin] = useState(cachedIsAdmin ?? false);
  const [loading, setLoading] = useState(cachedUser === undefined);
  const adminFetchInFlightRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const nextUser = session?.user ?? null;
      cachedUser = nextUser;
      setUser(nextUser);
      if (session?.user) {
        fetchAdminStatus(session.user.id);
      } else {
        cachedIsAdmin = false;
        setIsAdmin(false);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      cachedUser = nextUser;
      setUser(nextUser);
      if (session?.user) {
        fetchAdminStatus(session.user.id);
      } else {
        cachedIsAdmin = false;
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAdminStatus = async (userId: string) => {
    const now = Date.now();
    if (
      cachedAdminUserId === userId &&
      cachedIsAdmin !== undefined &&
      cachedAdminFetchedAt !== undefined &&
      now - cachedAdminFetchedAt < ADMIN_STALE_MS
    ) {
      setIsAdmin(cachedIsAdmin);
      setLoading(false);
      return;
    }

    if (adminFetchInFlightRef.current) {
      await adminFetchInFlightRef.current;
      setLoading(false);
      return;
    }

    const supabase = createClient();
    
    try {
      adminFetchInFlightRef.current = Promise.resolve(
        supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', userId)
          .single()
      )
        .then(({ data, error }) => {
          console.log('[useAuth] Fetched admin status:', { data, error, userId });

          if (error?.code === 'PGRST116') {
            // Profile doesn't exist, create it
            console.log('[useAuth] Profile not found, creating...');
            return supabase
              .from('profiles')
              .insert({ id: userId } as any)
              .then(() => {
                cachedAdminUserId = userId;
                cachedIsAdmin = false;
                cachedAdminFetchedAt = Date.now();
                setIsAdmin(false);
              });
          }

          if (!error && data) {
            const nextIsAdmin = data.is_admin || false;
            cachedAdminUserId = userId;
            cachedIsAdmin = nextIsAdmin;
            cachedAdminFetchedAt = Date.now();
            setIsAdmin(nextIsAdmin);
            console.log('[useAuth] isAdmin set to:', data.is_admin);
          }
        })
        .finally(() => {
          adminFetchInFlightRef.current = null;
        });

      await adminFetchInFlightRef.current;
    } catch (e) {
      console.warn('Could not fetch admin status:', e);
      adminFetchInFlightRef.current = null;
    }
    
    setLoading(false);
  };

  return {
    user,
    isAdmin,
    loading,
    isAuthenticated: !!user,
  };
}
