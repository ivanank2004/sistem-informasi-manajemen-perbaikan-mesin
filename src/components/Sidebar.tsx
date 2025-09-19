'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const [openMaintenance, setOpenMaintenance] = useState(false);

  const handleLogout = () => {
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-[#1565C0] text-white flex flex-col p-6">
      <h2 className="text-xl font-bold mb-10">PT Agro Future Indo</h2>
      <nav className="space-y-2">
        <a href="#" className="flex items-center gap-2 hover:text-[#FFB300]">
          {/* Dashboard */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8.557 2.75H4.682A1.932 1.932 0 0 0 2.75 4.682v3.875a1.942 1.942 0 0 0 1.932 1.942h3.875a1.942 1.942 0 0 0 1.942-1.942V4.682A1.942 1.942 0 0 0 8.557 2.75m10.761 0h-3.875a1.942 1.942 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942V4.682a1.932 1.932 0 0 0-1.932-1.932m0 10.75h-3.875a1.942 1.942 0 0 0-1.942 1.933v3.875a1.942 1.942 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942v-3.875a1.932 1.932 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.932 1.932 0 0 0 1.932 1.932h3.875a1.942 1.942 0 0 0 1.942-1.932v-3.875a1.942 1.942 0 0 0-1.942-1.942" />
          </svg>
          <span>Dashboard</span>
        </a>

        <a href="#" className="flex items-center gap-2 hover:text-[#FFB300]">
          {/* Asset & Equipment */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 6h-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Zm-9-1h4v1h-4Zm10 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5.61L8.68 14A1.19 1.19 0 0 0 9 14h6a1.19 1.19 0 0 0 .32-.05L20 12.39Zm0-7.72L14.84 12H9.16L4 10.28V9a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z" />
          </svg>
          <span>Asset & Equipment</span>
        </a>

        {/* Maintenance dropdown */}
        <button
          onClick={() => setOpenMaintenance(!openMaintenance)}
          className="flex items-center justify-between w-full hover:text-[#FFB300]"
        >
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 26 26" fill="currentColor">
              <path d="M1.313 0L0 1.313l2.313 4l1.5-.22l9.156 9.157l-.781.75c-.4.4-.4 1.006 0 1.406l.406.407c.4.4 1.012.4 1.312 0L15.094 18c-.1.6 0 1.313.5 1.813L21 25.188c1.1 1.1 2.9 1.1 4 0c1.3-1.2 1.288-2.994.188-4.094l-5.375-5.407c-.5-.5-1.213-.7-1.813-.5L16.687 14c.3-.4.3-1.012 0-1.313l-.375-.374a.974.974 0 0 0-1.406 0l-.656.656l-9.156-9.156l.218-1.5l-4-2.313zm19.5.031C18.84-.133 16.224 1.175 15 2.312c-1.506 1.506-1.26 3.475-.063 5.376l-2.124 2.125l1.5 1.687c.8-.7 1.98-.7 2.78 0l.407.406l.094.094l.875-.875c1.808 1.063 3.69 1.216 5.125-.219c1.4-1.3 2.918-4.506 2.218-6.406L23 7.406c-.4.4-1.006.4-1.406 0L18.687 4.5a.974.974 0 0 1 0-1.406L21.595.188c-.25-.088-.5-.133-.782-.157zm-11 12.469l-3.626 3.625A5.26 5.26 0 0 0 5 16c-2.8 0-5 2.2-5 5s2.2 5 5 5s5-2.2 5-5c0-.513-.081-1.006-.219-1.469l2.125-2.125l-.312-.406c-.8-.8-.794-2.012-.094-2.813L9.812 12.5zm7.75 4.563c.125 0 .243.024.343.125l5.907 5.906c.2.2.2.518 0 .718c-.2.2-.52.2-.72 0l-5.905-5.906c-.2-.2-.2-.518 0-.718c.1-.1.25-.125.375-.125zM5.688 18.405l1.906 1.907l-.688 2.593l-2.593.688l-1.907-1.907l.688-2.593l2.594-.688z" />
            </svg>
            <span>Maintenance</span>
          </span>
          {/* Panah */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 transform transition-transform duration-200 ${openMaintenance ? "rotate-180" : "rotate-270"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.79 14.77a.75.75 0 01-1.06-.02L8 11.06l-3.71 3.71a.75.75 0 11-1.08-1.04l4.25-4.25a.75.75 0 011.08 0l4.25 4.25c.29.29.3.77.02 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {openMaintenance && (
          <div className="ml-6 mt-1 space-y-1 text-sm">
            <a href="#" className="block hover:text-[#FFB300]">Preventive</a>
            <a href="#" className="block hover:text-[#FFB300]">Predictive</a>
            <a href="#" className="block hover:text-[#FFB300]">Corrective</a>
          </div>
        )}

        <a href="#" className="flex items-center gap-2 hover:text-[#FFB300]">
          {/* Work Order */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4a2 2 0 0 1 2-2h8a1 1 0 0 1 .707.293l5 5A1 1 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4zm13.586 4L14 4.414V8h3.586zM12 4H6v16h12V10h-5a1 1 0 0 1-1-1V4zm-4 9a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1z" />
          </svg>
          <span>Work Order</span>
        </a>

        <a href="#" className="flex items-center gap-2 hover:text-[#FFB300]">
          {/* Analytics */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 2c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1s1-.4 1-1V3c0-.6-.4-1-1-1zM5 12c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1s1-.4 1-1v-8c0-.6-.4-1-1-1zm10-4c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1s1-.4 1-1V9c0-.6-.4-1-1-1zm5 8c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1s1-.4 1-1v-4c0-.6-.4-1-1-1z" />
          </svg>
          <span>Analytics</span>
        </a>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-[#43A047] hover:bg-green-700 rounded-lg py-2 px-4 font-semibold transition-colors"
      >
        Logout
      </button>
    </aside>
  );
}
