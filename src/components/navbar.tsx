import React from "react";
import NAV_MENU from "@/types/navMenu"
import Link from 'next/link';

import {
  Navbar as MTNavbar,
  Collapse,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";


// Komponen dropdown menu
const DropdownMenu = ({ items = [], onClose = () => {} }) => (
  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out transform translate-y-4 group-hover:translate-y-0 z-50 backdrop-blur-sm">
    <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45"></div>
    {items.map((item, index) => (
      <a
        key={item.name}
        href={item.href}
        onClick={onClose}
        className="block px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 transition-all duration-300 transform hover:translate-x-2 animate-fade-in-left"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <span className="flex items-center">
          <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
          {item.name}
        </span>
      </a>
    ))}
  </div>
);

// Komponen item navbar
const NavItem = ({ item, isMobile = false }) => {
  const [open, setOpen] = React.useState(false);
  const hasDropdown = item.children && item.children.length > 0;

  const itemClasses = `flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg transition-all duration-300 ${
    isMobile
      ? "w-full text-gray-700 hover:bg-gray-50 hover:text-purple-600"
      : "text-sm hover:bg-white/10 hover:text-purple-200 transform hover:scale-105"
  }`;

  return (
    <li className={`relative group ${isMobile ? "w-full" : ""}`}>
      {hasDropdown ? (
        <div className={itemClasses} onClick={() => isMobile && setOpen(!open)}>
          <span className="relative">
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-300 transition-all duration-300 group-hover:w-full"></span>
          </span>
          <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-300 ${(isMobile && open) || (!isMobile && "group-hover:rotate-180")}`} />
        </div>
      ) : (
        <Link href={item.href || "#"} className={itemClasses}>
          <span className="relative">
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-300 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </Link>
      )}

      {hasDropdown &&
        (isMobile ? (
          <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className="pl-4 py-2">
              {item.children.map((child, index) => (
                <li key={child.name} className="animate-slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <Link
                    href={child.href}
                    className="block px-2 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded transition-all duration-200"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <DropdownMenu items={item.children} />
        ))}
    </li>
  );
};

// Komponen utama Navbar
export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolling(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <MTNavbar
      fullWidth
      blurred={false}
      shadow={false}
      color={isScrolling ? "white" : "transparent"}
      className={`fixed top-0 z-50 border-0 transition-all duration-500 h-20 ${
        isScrolling ? "shadow-xl backdrop-blur-md" : ""
      }`}
      style={{
        background: isScrolling 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-full">
        {/* Logo - Hidden to save space */}
        <div className="flex-shrink-0">
          {/* Logo removed for cleaner layout */}
        </div>

        {/* Desktop Menu - Centered */}
        <ul className={`hidden lg:flex items-center gap-6 transition-all duration-500 ${
          isScrolling ? "text-gray-900" : "text-white"
        }`}>
          {NAV_MENU.map((item, index) => (
            <div 
              key={item.name} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <NavItem item={item} />
            </div>
          ))}
        </ul>

        {/* Special Buttons - Taman Terdepan & Contact */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
            Taman Terdepan
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 hover:rotate-6">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
          </button>
        </div>

        {/* Toggle Button Mobile */}
        <IconButton
          variant="text"
          onClick={() => setOpen((cur) => !cur)}
          color={isScrolling ? "gray" : "white"}
          className="lg:hidden"
        >
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </IconButton>
      </div>

      {/* Mobile Menu */}
      <Collapse open={open}>
        <div className="bg-white/95 backdrop-blur-md mx-6 my-4 rounded-xl shadow-2xl lg:hidden border border-gray-100">
          <ul className="px-6 py-6">
            {NAV_MENU.map((item, index) => (
              <div 
                key={item.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <NavItem item={item} isMobile />
              </div>
            ))}
            <li className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg text-sm font-medium mb-3 transition-all duration-300 transform hover:scale-105">
                Taman Terdepan
              </button>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Kontak
              </button>
            </li>
          </ul>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;