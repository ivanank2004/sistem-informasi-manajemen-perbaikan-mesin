'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(async () => {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setTimeout(() => setError(false), 3000);
        } else {
          router.push('/dashboard');
        }
      } catch (err) {
        setError(true);
        setTimeout(() => setError(false), 3000);
      } finally {
        setLoading(false);
      }
    }, 800); // delay loading 800ms seperti versi lama
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] relative">
      {/* ===== Popup Notification dengan animasi fade/slide ===== */}
      {error && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2
                     bg-red-600/90 text-white px-6 py-3 rounded-xl shadow-xl
                     font-medium z-50 animate-bounce"
        >
          Login Gagal. Periksa username dan password.
        </div>
      )}

      {/* ===== Card Login ===== */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#1565C0] mb-6 text-center">
          PT AGRO MAJU INDO
        </h1>
        <p className="text-[#263238] text-center mb-6">Selamat datang</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-[#263238] font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-[#1565C0] text-[#263238]"
              placeholder="Masukkan username"
              autoComplete="off"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-[#263238] font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-[#1565C0] text-[#263238] pr-10"
              placeholder="Masukkan password"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-[#1565C0] rounded-full"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.161-3.568M6.18 6.18A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.177 4.601M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white 
                       bg-[#1565C0] transition-all duration-200
                       flex items-center justify-center focus:outline-none
                       focus:ring-2 focus:ring-offset-2 focus:ring-[#1565C0]
                       hover:shadow-md active:scale-95
                       ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>

          <p className="text-sm text-gray-500 text-center mt-2">
            Tekan <span className="font-semibold">Enter</span> untuk login
          </p>
        </form>
      </div>
    </div>
  );
}
