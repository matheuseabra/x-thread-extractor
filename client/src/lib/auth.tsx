import { supabase } from '@/lib/supabaseClient';
import { ReactNode, useEffect, useState } from 'react';

import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  console.log('ProtectedRoute user:', user);
  if (loading) return <div>Loading...</div>;
  if (!user) {
    window.location.href = '/'; // or redirect to login
    return null;
  }
  return <>{children}</>;
}