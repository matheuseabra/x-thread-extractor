import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  if (user) {
    window.location.href = "/dashboard";
    return null;
  }

  return (
    <AuthLayout
      belowForm={
        <>Already have an account?{' '}
          <a href="/login" className="text-white underline hover:text-gray-200">Login</a>
        </>
      }
    >
      <form onSubmit={handleSignUp} className="border border-gray-700 bg-black p-8 rounded-2xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-white">Sign Up</h2>
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </AuthLayout>
  );
}