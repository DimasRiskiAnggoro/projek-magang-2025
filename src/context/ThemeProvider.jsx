// src/context/ThemeProvider.jsx
"use client";

import { createContext, useState, useEffect, useContext } from 'react';
// 1. Impor ThemeProvider dari Material-Tailwind (beri nama alias agar tidak bentrok)
import { ThemeProvider as MTThemeProvider } from '@material-tailwind/react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Cek tema yang tersimpan saat pertama kali dimuat
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Hapus kelas tema lama, tambahkan yang baru
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);

    // Simpan tema ke localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // 2. Bungkus provider kustom Anda dengan provider dari Material-Tailwind
    <MTThemeProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </MTThemeProvider>
  );
}