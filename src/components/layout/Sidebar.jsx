"use client";

import { Home, Newspaper, Users } from "lucide-react";

export default function Sidebar({ isOpen }) {
  // Fungsi handleLogout sudah tidak diperlukan di sini

  return (
    <aside className={`themed-sidebar w-64 min-h-screen p-4 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-64'} fixed md:relative z-20`}>
      <div className="flex items-center mb-8">
        <Home className="mr-2 text-blue-600" />
        <span className="font-bold text-xl text-blue-600 dark:text-blue-400">AdminPanel</span>
      </div>
      <nav>
        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          <li>
            <a href="/admin" className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-black dark:hover:text-white font-medium transition">
              <Home className="mr-2 w-5 h-5" /> Dashboard
            </a>
          </li>
          <li>
            <a href="/admin/berita" className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-black dark:hover:text-white font-medium transition">
              <Newspaper className="mr-2 w-5 h-5" /> Berita
            </a>
          </li>
          <li>
            <a href="/admin/users" className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-black dark:hover:text-white font-medium transition">
              <Users className="mr-2 w-5 h-5" /> Manajemen Akun
            </a>
          </li>
          {/* Tombol Logout dihapus dari sini */}
        </ul>
      </nav>
    </aside>
  );
}
