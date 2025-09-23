'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sidebarMenu, MenuItem } from './sidebarMenu';
import { icons } from './SidebarIcons';

type Role = 'admin' | 'maintenance' | 'logistics';

interface SidebarProps {
  role: Role;
  onNavigate?: (path: string) => void;
}

export default function Sidebar({ role, onNavigate }: SidebarProps) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/logout', { method: 'POST' });
      setTimeout(() => router.push('/login'), 500);
    } catch (err) {
      console.error(err);
      setLoggingOut(false);
    }
  };

  return (
    <aside className="w-64 bg-[#1565C0] text-white flex flex-col p-6 sticky top-0 h-screen">
      <h2 className="text-xl font-bold mb-10">SIMM</h2>

      <nav className="space-y-2 overflow-y-auto flex-1">
        {sidebarMenu[role].map((item: MenuItem, i: number) => (
          <div key={i}>
            {'children' in item ? (
              <div>
                <button
                  className="flex items-center justify-between w-full hover:text-[#FFB300]"
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.label ? null : item.label)
                  }
                >
                  <span className="flex items-center gap-2">
                    {icons[item.icon as keyof typeof icons]}
                    {item.label}
                  </span>
                  <span
                    className={`transform transition-transform duration-200 ${openDropdown === item.label ? 'rotate-90' : 'rotate-180'
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
                {openDropdown === item.label && (
                  <div className="ml-6 mt-1 space-y-1 text-sm">
                    {item.children.map((child, j) => (
                      <a
                        key={j}
                        href={child.path}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate?.(child.path);
                        }}
                        className="block hover:text-[#FFB300]"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.(item.path);
                }}
                className="flex items-center gap-2 hover:text-[#FFB300]"
              >
                {icons[item.icon as keyof typeof icons]}
                {item.label}
              </a>
            )}
          </div>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-[#43A047] hover:bg-green-700 rounded-lg py-2 px-4 font-semibold transition-colors flex items-center justify-center gap-2"
        disabled={loggingOut}
      >
        {loggingOut ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
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
            Logging out...
          </>
        ) : (
          'Logout'
        )}
      </button>
    </aside>
  );
}
