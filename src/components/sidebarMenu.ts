// sidebarMenu.ts
export type MenuItem =
  | { label: string; icon: string; path: string } // item biasa
  | { label: string; icon: string; children: { label: string; path: string }[] }; // item dengan dropdown

export const sidebarMenu: Record<'admin' | 'maintenance' | 'logistics', MenuItem[]> = {
  admin: [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { label: 'Users', icon: 'users', path: '/dashboard/users' },
    { label: 'Analytics', icon: 'analytics', path: '/dashboard/analytics' },
    { label: 'Settings', icon: 'settings', path: '/dashboard/settings'},
  ],
  maintenance: [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { label: 'Incident Report', icon: 'incident', path: '/dashboard/maintenance/incident' },
    {
      label: 'Maintenance',
      icon: 'maintenance',
      children: [
        { label: 'Preventive', path: '/dashboard/maintenance/preventive' },
        { label: 'Predictive', path: '/dashboard/maintenance/predictive' },
        { label: 'Corrective', path: '/dashboard/maintenance/corrective' },
      ],
    },
    { label: 'Work Order', icon: 'work_order', path: '/dashboard/work-orders' },
    { label: 'Analytics', icon: 'analytics', path: '/dashboard/analytics' },
    { label: 'Settings', icon: 'settings', path: '/dashboard/settings'},
  ],
  logistics: [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { label: 'Inventory', icon: 'inventory', path: '/dashboard/inventory' },
    { label: 'Delivery', icon: 'delivery', path: '/dashboard/delivery' },
    { label: 'Reports', icon: 'analytics', path: '/dashboard/reports' },
  ],
};
