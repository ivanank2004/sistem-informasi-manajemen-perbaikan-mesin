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

// Mapping tab key → label
const tabLabels: Record<'dashboard' | 'users', string> = {
  dashboard: 'Dashboard',
  users: 'Users',
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users'>('dashboard');

  useEffect(() => {
    fetch('/api/me')
      .then((res) => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then((data: User) => setUser(data))
      .catch(() => router.push('/login'));
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#263238]">
      <Sidebar
        role={user.role}
        onNavigate={(path) => {
          if (path === '/dashboard/users') setActiveTab('users');
          else setActiveTab('dashboard');
        }}
      />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1565C0]">
            {tabLabels[activeTab]}
          </h1>
        </header>

        {user.role === 'admin' && <AdminDashboard activeTab={activeTab} />}
        {user.role === 'maintenance' && <MaintenanceDashboard />}
        {user.role === 'logistics' && <LogisticsDashboard />}
      </main>
    </div>
  );
}
