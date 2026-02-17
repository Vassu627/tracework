"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/src/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await apiFetch("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-semibold text-white text-center">
          Sign in
        </h1>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div className="space-y-2">
          <label className="text-white text-sm">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded-xl bg-white/20 text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white text-sm">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded-xl bg-white/20 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 transition p-3 rounded-xl text-white font-medium"
        >
          Sign in
        </button>

        <p className="text-sm text-center text-gray-300">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
