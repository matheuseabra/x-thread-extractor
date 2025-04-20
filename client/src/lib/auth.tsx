import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from 'react';

import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load user from sessionStorage first
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      supabase.auth.getSession().then(({ data }) => {
        setUser(data.session?.user ?? null);
        if (data.session?.user) {
          sessionStorage.setItem('user', JSON.stringify(data.session.user));
        }
        setLoading(false);
      });
    }
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        sessionStorage.setItem('user', JSON.stringify(session.user));
      } else {
        sessionStorage.removeItem('user');
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 text-white mb-4 animate-spin" />
      <span className="text-white">Checking authentication...</span>
    </div>
  );
  if (!user) {
    window.location.href = '/'; // or redirect to login
    return null;
  }
  return <>{children}</>;
}