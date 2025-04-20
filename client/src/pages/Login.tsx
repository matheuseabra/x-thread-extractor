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
      <form onSubmit={handleLogin} className="border border-gray-700 bg-black p-8 rounded-2xl w-full max-w-sm">
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
          className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold border border-gray-700 hover:bg-blue-600 transition flex items-center justify-center gap-2"
          onClick={async () => {
            setLoading(true);
            setError(null);
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'twitter', options: { redirectTo: `${location.origin}/dashboard` } });
            console.log("Twitter login error:", error); 
            if (error) setError(error.message);
            setLoading(false);
          }}
          disabled={loading}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.48 0-4.49 2.014-4.49 4.495 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.6 1.67 4.905a4.48 4.48 0 0 0-.607 2.262c0 1.56.793 2.936 2.003 3.744a4.48 4.48 0 0 1-2.034-.563v.057c0 2.18 1.55 4.002 3.604 4.417a4.48 4.48 0 0 1-2.027.077c.572 1.785 2.23 3.084 4.195 3.12A8.98 8.98 0 0 1 2 19.54a12.68 12.68 0 0 0 6.88 2.017c8.26 0 12.78-6.84 12.78-12.77 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.697z"/></svg>
          Continue with Twitter
        </button>
      </form>
    </AuthLayout>
  );
}