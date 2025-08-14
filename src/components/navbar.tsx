import React, { useState, useEffect } from "react";
import NAV_MENU, { NavItem, NavChild } from "@/types/navMenu";

interface DropdownMenuProps {
  items: NavChild[];
  onClose?: () => void;
}

interface NavItemProps {
  item: NavItem;
  isMobile?: boolean;
}

// Komponen dropdown menu dengan design yang bersih
const DropdownMenu: React.FC<DropdownMenuProps> = ({ items = [], onClose = () => {} }) => (
  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50">
    {items.map((item, index) => (
      <a
        key={`${item.name}-${index}`}
        href={item.href}
        onClick={onClose}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
      >
        {item.name}
      </a>
    ))}
  </div>
);

// Komponen item navbar dengan design minimalis
const NavItem: React.FC<NavItemProps> = ({ item, isMobile = false }) => {
  const [open, setOpen] = useState<boolean>(false);
  const hasDropdown = item.children && item.children.length > 0;

  const itemClasses = `flex items-center justify-between cursor-pointer px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-all duration-150 ${
    isMobile ? "w-full" : ""
  }`;

  const handleClick = () => {
    if (isMobile && hasDropdown) {
      setOpen(!open);
    }
  };

  return (
    <li className={`relative group ${isMobile ? "w-full" : ""}`}>
      {hasDropdown ? (
        <div className={itemClasses} onClick={handleClick}>
          <span>{item.name}</span>
          <svg 
            className={`w-4 h-4 ml-1 transition-transform duration-200 ${
              (isMobile && open) ? 'rotate-180' : 'group-hover:rotate-180'
            }`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      ) : (
        <a href={item.href || "#"} className={itemClasses}>
          <span>{item.name}</span>
        </a>
      )}

      {hasDropdown &&
        (isMobile ? (
          <div className={`overflow-hidden transition-all duration-200 ease-out ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <ul className="pl-4 py-2 space-y-1">
              {item.children!.map((child, index) => (
                <li key={`${child.name}-${index}`}>
                  <a
                    href={child.href}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors duration-150"
                  >
                    {child.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <DropdownMenu items={item.children!} />
        ))}
    </li>
  );
};

// Komponen utama Navbar dengan design minimalis dan profesional
export const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Header dengan Search */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
 <div className="flex items-center">
  <img
    src="/icons/madiun.png"
    alt="Logo Taman"
    className="w-8 h-8 rounded object-cover"
  />
  <span className="ml-2 text-lg font-semibold text-gray-900">Taman</span>
</div>
            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari informasi, layanan, atau berita..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
                Layanan
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Utama */}
      <nav className={`sticky top-0 bg-white border-b border-gray-100 z-40 transition-all duration-200 ${
        isScrolled ? 'shadow-sm' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            
            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center space-x-8">
              {NAV_MENU.map((item, index) => (
                <NavItem key={`nav-${item.name}-${index}`} item={item} />
              ))}
            </ul>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-all duration-200"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`bg-current h-0.5 w-5 rounded transition-all duration-200 ${
                  open ? 'rotate-45 translate-y-0.5' : ''
                }`}></span>
                <span className={`bg-current h-0.5 w-5 rounded transition-all duration-200 ${
                  open ? 'opacity-0' : 'mt-1'
                }`}></span>
                <span className={`bg-current h-0.5 w-5 rounded transition-all duration-200 ${
                  open ? '-rotate-45 -translate-y-0.5' : 'mt-1'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-200 ease-out ${
            open ? 'max-h-screen pb-4' : 'max-h-0'
          }`}>
            <div className="pt-4 border-t border-gray-100">
              <ul className="space-y-2">
                {NAV_MENU.map((item, index) => (
                  <NavItem key={`mobile-nav-${item.name}-${index}`} item={item} isMobile />
                ))}
              </ul>
              
              {/* Mobile Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
                  Layanan
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  Kontak
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;