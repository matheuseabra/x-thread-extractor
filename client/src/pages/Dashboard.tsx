import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your protected dashboard! You are authenticated.</p>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 rounded text-white font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </DashboardLayout>
  );
}
