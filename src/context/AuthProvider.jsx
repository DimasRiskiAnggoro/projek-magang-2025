"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // 1. Tambahkan state loading
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    // 2. Fungsi untuk verifikasi token & ambil data user dari server
    const verifyUser = async () => {
      const token = Cookies.get('auth_token');
      if (token) {
        try {
          // Ganti dengan endpoint API Anda untuk mendapatkan data user
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData); // Gunakan data terbaru dari server
            localStorage.setItem('user', JSON.stringify(userData)); // Update localStorage
          } else {
            // Jika token tidak valid, hapus semua data sesi
            logout();
          }
        } catch (error) {
          console.error("Gagal verifikasi token:", error);
          logout(); // Logout jika ada error koneksi
        }
      }
      // Tandai loading selesai setelah semua proses pengecekan selesai
      setLoading(false); 
    };

    verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 3. Fungsi login terpusat
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    const token = Cookies.get('auth_token');
    if (token) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      } catch (error) {
        console.error("Gagal menghubungi server untuk logout:", error);
      }
    }
    Cookies.remove('auth_token', { path: '/' });
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  // Sembunyikan 'setUser', ekspos 'login', 'user', 'logout', dan 'loading'
  const value = { user, login, logout, loading }; 

  return (
    <AuthContext.Provider value={value}>
      {/* Jangan render children jika masih loading untuk menghindari kedipan */}
      {!loading && children} 
    </AuthContext.Provider>
  );
}