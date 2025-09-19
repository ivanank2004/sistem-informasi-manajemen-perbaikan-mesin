'use client';

import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-[#263238]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#1565C0]">
            Selamat Datang, Admin!
          </h1>
        </header>

        {/* Kartu ringkasan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#1565C0] mb-2">
              Status Lahan
            </h3>
            <p>20 Lahan terdaftar</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#1565C0] mb-2">
              Sensor Aktif
            </h3>
            <p>15 IoT Device</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-[#1565C0] mb-2">
              Jadwal Maintenance
            </h3>
            <p className="text-[#FFB300] font-medium">3 jadwal minggu ini</p>
          </div>
        </div>

        {/* Tabel dummy */}
        <section className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#1565C0] mb-4">
            Daftar Lahan
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">Nama Lahan</th>
                <th className="py-2 px-4">Lokasi</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4">Lahan A</td>
                <td className="py-2 px-4">Garut</td>
                <td className="py-2 px-4 text-green-600">Aktif</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">Lahan B</td>
                <td className="py-2 px-4">Bandung</td>
                <td className="py-2 px-4 text-yellow-600">Maintenance</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
