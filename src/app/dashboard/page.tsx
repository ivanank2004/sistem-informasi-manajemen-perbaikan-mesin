'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import MaintenanceDashboard from '@/components/dashboard/MaintenanceDashboard';
import LogisticsDashboard from '@/components/dashboard/LogisticsDashboard';
import Incident from '@/components/dashboard/maintenance/Incident';

interface User {
  id: number;
  username: string;
  role: 'admin' | 'maintenance' | 'logistics';
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users'>('dashboard');
  const [activeMaintenanceTab, setActiveMaintenanceTab] = useState<
    'dashboard' | 'preventive' | 'predictive' | 'corrective' | 'incident'
  >('dashboard');

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

  // Callback untuk berpindah ke tab corrective dari child component
  const handleNavigateToCorrective = () => setActiveMaintenanceTab('corrective');

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#263238]">
      <Sidebar
        role={user.role}
        onNavigate={(path) => {
          if (user.role === 'admin') {
            if (path === '/dashboard/users') setActiveTab('users');
            else setActiveTab('dashboard');
          }

          if (user.role === 'maintenance') {
            if (path === '/dashboard/maintenance/preventive') setActiveMaintenanceTab('preventive');
            else if (path === '/dashboard/maintenance/predictive') setActiveMaintenanceTab('predictive');
            else if (path === '/dashboard/maintenance/corrective') setActiveMaintenanceTab('corrective');
            else if (path === '/dashboard/maintenance/incident') setActiveMaintenanceTab('incident');
            else setActiveMaintenanceTab('dashboard');
          }
        }}
      />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1565C0]">
            {user.role === 'admin' && activeTab === 'users' ? 'Users' : 'Dashboard'}
          </h1>
        </header>

        {user.role === 'admin' && <AdminDashboard activeTab={activeTab} />}
        {user.role === 'maintenance' && (
          <>
            {activeMaintenanceTab === 'incident' ? (
              <Incident onIssueWorkOrder={handleNavigateToCorrective} />
            ) : (
              <MaintenanceDashboard activeTab={activeMaintenanceTab} />
            )}
          </>
        )}
        {user.role === 'logistics' && <LogisticsDashboard />}
      </main>
    </div>
  );
}
