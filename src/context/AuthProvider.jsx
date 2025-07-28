"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Cek data user dari localStorage saat aplikasi dimuat
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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
    // Hapus data dari cookie dan localStorage
    Cookies.remove('auth_token', { path: '/' });
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const value = { user, setUser, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
