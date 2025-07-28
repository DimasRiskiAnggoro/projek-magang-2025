// app/login/page.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image'; // Import Image component

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Pastikan file 'komingo.png' ada di dalam folder /public
  const wallpaperUrl = '/DINAS KOMUNIKASI DAN INFORMATIKA KOTA MADIUN.png'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        },
        body: JSON.stringify({ 
          email, 
          password,
          device_name: 'web'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email atau password salah.');
      }
      
      if (data.token) {
        Cookies.set('auth_token', data.token, { expires: 7, path: '/' });
        router.push('/admin');
      } else {
        throw new Error('Token tidak ditemukan pada respons dari server.');
      }

    } catch (err) {
      setError(err.message);
      setIsLoading(false); 
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url('${wallpaperUrl}')` }}
    >
      {/* Lapisan overlay gelap untuk meningkatkan kontras */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Form login dengan efek "frosted glass" */}
      <div className="relative bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md border border-white border-opacity-20">
        
        {/* Logo di atas judul */}
        <div className="flex justify-center mb-4">
            <Image 
                src="/DINAS KOMUNIKASI DAN INFORMATIKA KOTA MADIUN LOGO.png"
                alt="Logo"
                width={100}
                height={100}
                className="h-auto"
            />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-30 text-white placeholder-gray-200"
              required 
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="password">Password</label>
            <input 
              type="password"
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-30 text-white placeholder-gray-200"
              required 
              disabled={isLoading}
            />
          </div>
          
          {error && <p className="text-red-300 text-sm mb-4 text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
