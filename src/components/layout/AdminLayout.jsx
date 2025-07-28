// src/components/layout/AdminLayout.jsx
"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AuthProvider from "@/context/AuthProvider"; // <-- Impor AuthProvider

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    // Bungkus semua dengan AuthProvider
    <AuthProvider>
      <div className="themed-background min-h-screen flex">
        <Sidebar isOpen={sidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />
          <main className="flex-1 p-4 md:p-8">
              {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
