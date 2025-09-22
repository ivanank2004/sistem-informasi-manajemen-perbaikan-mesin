'use client';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
  role: string;
}

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'username' | 'role'>('username');

  // Hitung jumlah per role
  const [counts, setCounts] = useState({
    maintenance: 0,
    logistics: 0,
    field_worker: 0,
  });

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const res = await fetch('/api/users');
      const data: User[] = await res.json();
      setUsers(data);

      // Hitung jumlah per role
      const counts = { maintenance: 0, logistics: 0, field_worker: 0 };
      data.forEach(u => {
        if (u.role === 'maintenance') counts.maintenance += 1;
        else if (u.role === 'logistics') counts.logistics += 1;
        else if (u.role === 'field_worker') counts.field_worker += 1;
      });
      setCounts(counts);
      setLoading(false);
    }

    fetchUsers();
  }, []);

  // Filter users berdasarkan role dan search
  const filteredUsers = users
    .filter(u => (selectedRole ? u.role === selectedRole : true))
    .filter(u => {
      if (!searchTerm) return true;
      if (searchBy === 'username') return u.username.toLowerCase().includes(searchTerm.toLowerCase());
      if (searchBy === 'role') return u.role.toLowerCase().includes(searchTerm.toLowerCase());
      return true;
    });

  if (loading) return <p className="text-center py-6 text-gray-500">Loading users...</p>;

  const cardClasses = "p-6 rounded-2xl shadow-md cursor-pointer transform transition hover:scale-105 hover:bg-blue-50";

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className={`bg-white ${cardClasses}`} onClick={() => setSelectedRole(null)}>
          <h3 className="text-xl font-semibold text-[#1565C0] mb-2">Total Users</h3>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>

        <div className={`bg-white ${cardClasses}`} onClick={() => setSelectedRole('maintenance')}>
          <h3 className="text-xl font-semibold text-green-600 mb-2">Maintenance</h3>
          <p className="text-2xl font-bold">{counts.maintenance}</p>
        </div>

        <div className={`bg-white ${cardClasses}`} onClick={() => setSelectedRole('logistics')}>
          <h3 className="text-xl font-semibold text-yellow-600 mb-2">Logistics</h3>
          <p className="text-2xl font-bold">{counts.logistics}</p>
        </div>

        <div className={`bg-white ${cardClasses}`} onClick={() => setSelectedRole('field_worker')}>
          <h3 className="text-xl font-semibold text-red-600 mb-2">Field Worker</h3>
          <p className="text-2xl font-bold">{counts.field_worker}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          type="text"
          placeholder={`Search by ${searchBy}`}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-1/3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <select
          value={searchBy}
          onChange={e => setSearchBy(e.target.value as 'username' | 'role')}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="username">Username</option>
          <option value="role">Role</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">
          {selectedRole ? selectedRole.replace('_', ' ') : 'All Users'}
        </h2>
        <table className="w-full table-auto border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={u.id} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} >
                <td className="border px-4 py-2">{u.id}</td>
                <td className="border px-4 py-2">{u.username}</td>
                <td className="border px-4 py-2 capitalize">{u.role.replace('_', ' ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && <p className="text-center py-4 text-gray-500">No users found.</p>}
      </div>
    </div>
  );
}
