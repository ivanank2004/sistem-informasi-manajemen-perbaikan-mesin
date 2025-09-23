'use client';

import { useEffect, useState } from 'react';
import Preventive from './maintenance/Preventive';
import Predictive from './maintenance/Predictive';
import Corrective from './maintenance/Corrective';
import Incident from './maintenance/Incident';

interface WorkOrder {
  id: number;
  asset_id: number | null;
  reported_by: number | null;
  assigned_to: number | null;
  description: string;
  status: 'open' | 'in_progress' | 'done';
  priority: 'low' | 'normal' | 'high';
  created_at: string;
}

type MaintenanceTab = 'dashboard' | 'preventive' | 'predictive' | 'corrective' | 'incident';

interface MaintenanceDashboardProps {
  activeTab: MaintenanceTab;
}

export default function MaintenanceDashboard({ activeTab }: MaintenanceDashboardProps) {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ open: 0, in_progress: 0, done: 0 });

  useEffect(() => {
    async function fetchWorkOrders() {
      setLoading(true);
      try {
        const res = await fetch('/api/work_orders');
        const data: WorkOrder[] = await res.json();
        setWorkOrders(data);

        const newCounts = { open: 0, in_progress: 0, done: 0 };
        data.forEach((wo) => {
          if (wo.status === 'open') newCounts.open += 1;
          else if (wo.status === 'in_progress') newCounts.in_progress += 1;
          else if (wo.status === 'done') newCounts.done += 1;
        });
        setCounts(newCounts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkOrders();
  }, []);

  if (loading) return <p>Loading work orders...</p>;

  const cardStyles = {
    open: 'bg-orange-100 border-orange-400 text-orange-800',
    in_progress: 'bg-blue-100 border-blue-400 text-blue-800',
    done: 'bg-green-100 border-green-400 text-green-800',
  };

  // Tab spesifik
  if (activeTab === 'preventive') return <Preventive />;
  if (activeTab === 'predictive') return <Predictive />;
  if (activeTab === 'corrective') return <Corrective />;
  if (activeTab === 'incident') return <Incident />;

  // Default dashboard
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-[#1565C0]">Maintenance Dashboard</h2>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl shadow-md border-l-8 ${cardStyles.open}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Open</h3>
            <span className="text-2xl font-bold">{counts.open}</span>
          </div>
          <p className="mt-2 text-sm text-orange-700">Work orders waiting to be processed</p>
        </div>

        <div className={`p-6 rounded-2xl shadow-md border-l-8 ${cardStyles.in_progress}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">In Progress</h3>
            <span className="text-2xl font-bold">{counts.in_progress}</span>
          </div>
          <p className="mt-2 text-sm text-blue-700">Work orders currently being worked on</p>
        </div>

        <div className={`p-6 rounded-2xl shadow-md border-l-8 ${cardStyles.done}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Done</h3>
            <span className="text-2xl font-bold">{counts.done}</span>
          </div>
          <p className="mt-2 text-sm text-green-700">Work orders completed</p>
        </div>
      </div>
    </div>
  );
}
