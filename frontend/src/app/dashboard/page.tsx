"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/src/lib/api";

export default function Dashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const res = await apiFetch("/auth/me");
      const data = await res.json();

      if (!data.userId) {
        router.push("/login");
      } else {
        setUserId(data.userId);
      }
    }

    checkAuth();
  }, [router]);

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-2xl font-semibold">Welcome, user {userId}</h1>

        <button
          onClick={async () => {
            await apiFetch("/auth/logout", { method: "POST" });
            router.push("/login");
          }}
          className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
