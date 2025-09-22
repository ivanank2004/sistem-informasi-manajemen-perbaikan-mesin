'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import MaintenanceDashboard from '@/components/dashboard/MaintenanceDashboard';
import LogisticsDashboard from '@/components/dashboard/LogisticsDashboard';

interface User {
  id: number;
  username: string;
  role: 'admin' | 'maintenance' | 'logistics';
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/me')
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then((data: User) => setUser(data))
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-12 w-12 text-[#1565C0]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-[#263238] text-lg font-medium">Memuat dashboard...</p>
        </div>
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#263238]">
      <Sidebar role={user.role} />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1565C0]">
            Dashboard
          </h1>
        </header>

        {user.role === 'admin' && <AdminDashboard />}
        {user.role === 'maintenance' && <MaintenanceDashboard />}
        {user.role === 'logistics' && <LogisticsDashboard />}
      </main>
    </div>
  );
}
