"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, Sun, Moon, LogOut, User as UserIcon } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useAuth } from "@/context/AuthProvider";

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="themed-header flex items-center justify-between px-6 py-4">
      <button
        className="md:hidden block text-gray-600 dark:text-gray-300"
        onClick={onMenuClick}
      >
        <Menu />
      </button>
      <h1 className="font-bold text-xl hidden md:block">Admin Page</h1>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700">
          {theme === 'light' ? <Moon className="text-gray-600" /> : <Sun className="text-yellow-400" />}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full text-blue-600 dark:text-blue-300 font-semibold"
          >
            <UserIcon size={16} />
            <span>{user ? user.name : 'Admin'}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-red-600 rounded-md shadow-lg py-1 z-50 border border-red-500">
              <button
                onClick={logout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                <LogOut size={16} className="mr-2 text-white" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}