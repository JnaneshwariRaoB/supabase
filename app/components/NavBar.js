"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import supabase from "@/app/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu state
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) console.error("Login error:", error);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md py-4 px-6 flex justify-between items-center z-50">
      {/* Logo */}
      <span className="text-2xl font-extrabold cursor-pointer text-blue-400" onClick={() => router.push("/add-student")}>
        DevConnect
      </span>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-lg">
        <span className="cursor-pointer hover:text-blue-400 transition" onClick={() => router.push("/add-student")}>
          Add Student
        </span>
        <span className="cursor-pointer hover:text-blue-400 transition" onClick={() => router.push("/display-student")}>
          Display Students
        </span>
      </div>

      {/* User Section */}
      <div className="hidden md:flex">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Welcome, {user.user_metadata.full_name}</span>
            <span className="cursor-pointer bg-red-600 px-4 py-1 rounded-lg hover:bg-red-700 transition" onClick={handleSignOut}>
              Logout
            </span>
          </div>
        ) : (
          <span className="cursor-pointer bg-green-600 px-4 py-1 rounded-lg hover:bg-green-700 transition" onClick={handleSignIn}>
            Sign in with Google
          </span>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 flex flex-col items-center py-4 gap-4 md:hidden">
          <span className="cursor-pointer text-lg hover:text-blue-400 transition" onClick={() => router.push("/add-student")}>
            Add Student
          </span>
          <span className="cursor-pointer text-lg hover:text-blue-400 transition" onClick={() => router.push("/display-student")}>
            Display Students
          </span>
          {user ? (
            <span className="cursor-pointer bg-red-600 px-4 py-1 rounded-lg hover:bg-red-700 transition" onClick={handleSignOut}>
              Logout
            </span>
          ) : (
            <span className="cursor-pointer bg-green-600 px-4 py-1 rounded-lg hover:bg-green-700 transition" onClick={handleSignIn}>
              Sign in with Google
            </span>
          )}
        </div>
      )}
    </nav>
  );
}
