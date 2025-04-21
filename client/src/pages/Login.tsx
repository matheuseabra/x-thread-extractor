import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);

    console.log("Login error:", error);
  };

  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <AuthLayout
      belowForm={
        <>Don't have an account?{' '}
          <a href="/signup" className="text-white underline hover:text-gray-200">Sign up</a>
        </>
      }
    >
      <form onSubmit={handleLogin} className="bg-zinc-900 border border-border p-8 rounded-2xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-white">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-black text-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-black text-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <div className="mb-4 text-right">
          <a href="/forgot-password" className="text-xs text-white underline hover:text-gray-200">Forgot password?</a>
        </div>
        {error && <div className="text-red-400 mb-4 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-white text-black font-semibold border border-gray-700 hover:bg-gray-100 hover:text-black transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="my-6 flex items-center justify-center">
          <span className="text-gray-500 text-xs">or</span>
        </div>
        <button
          type="button"
          className="w-full py-2 rounded-lg bg-black text-white font-semibold border border-gray-700 hover:bg-neutral-900 transition flex items-center justify-center gap-2"
          onClick={async () => {
            setLoading(true);
            setError(null);
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'twitter', options: { redirectTo: `${location.origin}/dashboard` } });
            console.log("X login error:", error); 
            if (error) setError(error.message);
            setLoading(false);
          }}
          disabled={loading}
        >
          Continue with X
        </button>
      </form>
    </AuthLayout>
  );
}