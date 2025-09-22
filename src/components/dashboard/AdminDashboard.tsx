'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import UsersTab from './users/UsersTab';

interface AdminDashboardProps {
  activeTab: 'dashboard' | 'users';
}

export default function AdminDashboard({ activeTab }: AdminDashboardProps) {
  const [totalUsers, setTotalUsers] = useState({ maintenance: 0, logistics: 0, field: 0 });
  const [totalAssets, setTotalAssets] = useState({ active: 0, maintenance: 0, broken: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Fetch Users untuk hitung total
      const { data: usersData } = await supabase.from('users').select('id, role');
      if (usersData) {
        const counts = { maintenance: 0, logistics: 0, field: 0 };
        usersData.forEach((user) => {
          if (user.role === 'maintenance') counts.maintenance += 1;
          else if (user.role === 'logistics') counts.logistics += 1;
          else if (user.role === 'field_worker') counts.field += 1;
        });
        setTotalUsers(counts);
      }

      // Fetch Assets grouped by status
      const { data: assetsData } = await supabase.from('assets').select('status, id');
      if (assetsData) {
        const counts = { active: 0, maintenance: 0, broken: 0 };
        assetsData.forEach((asset) => {
          if (asset.status === 'active') counts.active += 1;
          else if (asset.status === 'maintenance') counts.maintenance += 1;
          else if (asset.status === 'broken') counts.broken += 1;
        });
        setTotalAssets(counts);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  if (activeTab === 'users') {
    // Gunakan UsersTab di sini
    return <UsersTab />;
  }

  // Default dashboard view
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-[#1565C0] mb-2">Total Users</h3>
          <p>Maintenance: {totalUsers.maintenance}</p>
          <p>Logistics: {totalUsers.logistics}</p>
          <p>Field: {totalUsers.field}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-[#1565C0] mb-2">Total Assets</h3>
          <p>Active: {totalAssets.active}</p>
          <p>Under Maintenance: {totalAssets.maintenance}</p>
          <p>Broken: {totalAssets.broken}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-[#1565C0] mb-2">Work Orders Summary</h3>
          <p>Open: 4</p>
          <p>In Progress: 6</p>
          <p>Done: 15</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md w-full">
          <h3 className="text-xl font-semibold text-[#1565C0] mb-2">Incident Reports Summary</h3>
          <p>Pending: 3</p>
          <p>Investigating: 2</p>
          <p>Resolved: 5</p>
        </div>
      </div>
    </div>
  );
}
