'use client';

export default function AdminDashboard() {
  // Dummy data
  const totalUsers = {
    maintenance: 5,
    logistics: 8,
    field: 12,
  };

  const totalAssets = {
    active: 10,
    maintenance: 3,
    broken: 2,
  };

  const workOrders = {
    open: 4,
    inProgress: 6,
    done: 15,
  };

  const incidentReports = {
    pending: 3,
    resolved: 5,
    investigating: 2,
  };

  return (
    <div className="space-y-6">
      {/* Total Users */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-[#1565C0] mb-2">Total Users</h3>
          <p>Maintenance: {totalUsers.maintenance}</p>
          <p>Logistics: {totalUsers.logistics}</p>
          <p>Field: {totalUsers.field}</p>
        </div>

        {/* Total Assets */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-[#1565C0] mb-2">Total Assets</h3>
          <p>Active: {totalAssets.active}</p>
          <p>Under Maintenance: {totalAssets.maintenance}</p>
          <p>Broken: {totalAssets.broken}</p>
        </div>

        {/* Work Orders Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-[#1565C0] mb-2">Work Orders Summary</h3>
          <p>Open: {workOrders.open}</p>
          <p>In Progress: {workOrders.inProgress}</p>
          <p>Done: {workOrders.done}</p>
        </div>
      </div>

      {/* Incident Reports Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full">
        <h3 className="text-xl font-semibold text-[#1565C0] mb-2">Incident Reports Summary</h3>
        <p>Pending: {incidentReports.pending}</p>
        <p>Investigating: {incidentReports.investigating}</p>
        <p>Resolved: {incidentReports.resolved}</p>
      </div>
    </div>
  );
}
