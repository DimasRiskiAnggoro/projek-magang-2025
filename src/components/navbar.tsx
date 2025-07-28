import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon
} from "@heroicons/react/24/outline";

const DROPDOWN_ITEMS = {
  "Berita": [
    { name: "Berita Terkini", href: "#" },
    { name: "Pengumuman", href: "#" },
    { name: "Kegiatan", href: "#" },
    { name: "Press Release", href: "#" }
  ],
  "Profile": [
    { name: "Visi & Misi", href: "#" },
    { name: "Struktur Organisasi", href: "#" },
    { name: "Tugas & Fungsi", href: "#" },
    { name: "Sejarah", href: "#" }
  ],
  "Informasi Publik": [
    { name: "Informasi Berkala", href: "#" },
    { name: "Informasi Serta Merta", href: "#" },
    { name: "Informasi Setiap Saat", href: "#" },
    { name: "Daftar Informasi Publik", href: "#" }
  ],
  "Publikasi": [
    { name: "Laporan Kinerja", href: "#" },
    { name: "Laporan Keuangan", href: "#" },
    { name: "E-Book", href: "#" },
    { name: "Infografis", href: "#" }
  ]
};

const NAV_MENU = ["Beranda", "Berita", "Profile", "Layanan Pengaduan", "FaQ", "Informasi Publik", "Publikasi"];

function DropdownMenu({ items, isScrolling, onClose }: { 
  items: typeof DROPDOWN_ITEMS[keyof typeof DROPDOWN_ITEMS], 
  isScrolling: boolean,
  onClose: () => void 
}) {
  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out transform translate-y-3 group-hover:translate-y-0 z-50 backdrop-blur-sm">
      <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45"></div>
      {items.map((item, index) => (
        <a
          key={item.name}
          href={item.href}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#90b4f0]/10 hover:to-[#90b4f0]/20 hover:text-[#90b4f0] transition-all duration-300 group/item relative overflow-hidden transform hover:translate-x-1"
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-[#90b4f0] transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-top"></div>
          <span className="font-medium text-sm relative ml-2">
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#90b4f0] group-hover/item:w-full transition-all duration-300"></span>
          </span>
        </a>
      ))}
    </div>
  );
}

function NavItem({ 
  children, 
  hasDropdown = false, 
  dropdownItems, 
  isScrolling,
  isMobile = false 
}: { 
  children: React.ReactNode,
  hasDropdown?: boolean,
  dropdownItems?: typeof DROPDOWN_ITEMS[keyof typeof DROPDOWN_ITEMS],
  isScrolling: boolean,
  isMobile?: boolean
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (hasDropdown && dropdownItems) {
    return (
      <li className={`relative group ${isMobile ? 'w-full' : ''}`}>
        <div 
          className={`flex items-center gap-1 cursor-pointer ${
            isMobile ? 'w-full justify-between py-2' : ''
          }`}
          onClick={() => isMobile && setIsOpen(!isOpen)}
        >
          <Typography
            as="span"
            variant="paragraph"
            className="flex items-center gap-2 font-medium group-hover:text-[#90b4f0] transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
              {children}
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#90b4f0]/0 to-[#90b4f0]/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></span>
          </Typography>
          <ChevronDownIcon 
            className={`w-4 h-4 transition-all duration-300 group-hover:text-[#90b4f0] ${
              isMobile && isOpen ? 'rotate-180 text-[#90b4f0]' : 'group-hover:rotate-180'
            }`} 
          />
        </div>
        
        {isMobile ? (
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="pl-4 pt-2 space-y-1">
              {dropdownItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 py-2 px-3 text-gray-600 hover:text-[#90b4f0] hover:bg-[#90b4f0]/10 rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105 relative overflow-hidden group/mobile"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#90b4f0] transform scale-y-0 group-hover/mobile:scale-y-100 transition-transform duration-300 origin-center rounded-r-full"></div>
                  <span className="text-sm font-medium ml-2">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <DropdownMenu 
            items={dropdownItems} 
            isScrolling={isScrolling}
            onClose={() => {}}
          />
        )}
      </li>
    );
  }

  return (
    <li>
      <Typography
        as="a"
        href="#"
        variant="paragraph"
        className="flex items-center gap-2 font-medium hover:text-[#90b4f0] transition-all duration-300 relative group/simple overflow-hidden px-2 py-1 rounded-md"
      >
        <span className="relative z-10 transition-transform duration-300 group-hover/simple:scale-105">
          {children}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-[#90b4f0]/0 to-[#90b4f0]/10 transform scale-x-0 group-hover/simple:scale-x-100 transition-transform duration-300 origin-left rounded-md"></span>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#90b4f0] group-hover/simple:w-3/4 transition-all duration-300"></span>
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  
  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasDropdown = (menuName: string) => {
    return menuName in DROPDOWN_ITEMS;
  };

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0 transition-all duration-300"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          className={`text-lg font-bold transition-all duration-300 hover:scale-105 cursor-pointer ${
            isScrolling 
              ? "text-gray-900 hover:text-[#90b4f0]" 
              : "text-white hover:text-[#90b4f0] hover:drop-shadow-lg"
          }`}
        >
          Diskominfo Kota Madiun
        </Typography>
        
        <ul
          className={`ml-10 hidden items-center gap-8 lg:flex ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
        >
          {NAV_MENU.map((name) => (
            <NavItem 
              key={name}
              hasDropdown={hasDropdown(name)}
              dropdownItems={DROPDOWN_ITEMS[name as keyof typeof DROPDOWN_ITEMS]}
              isScrolling={isScrolling}
            >
              {name}
            </NavItem>
          ))}
        </ul>
        
        <div className="hidden items-center gap-2 lg:flex">
        </div>
        
        <IconButton
          variant="text"
          onClick={handleOpen}
          color={isScrolling ? "gray" : "white"}
          className="ml-auto inline-block lg:hidden hover:bg-[#90b4f0]/10 hover:text-[#90b4f0] transition-all duration-300 hover:scale-110 hover:rotate-3"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      
      <Collapse open={open}>
        <div className="container mx-auto bg-white rounded-lg py-4 px-6 mt-3 border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col gap-2">
            {NAV_MENU.map((name) => (
              <NavItem 
                key={name}
                hasDropdown={hasDropdown(name)}
                dropdownItems={DROPDOWN_ITEMS[name as keyof typeof DROPDOWN_ITEMS]}
                isScrolling={isScrolling}
                isMobile={true}
              >
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2">
            <Button 
              variant="text" 
              className="hover:bg-[#90b4f0]/10 hover:text-[#90b4f0] transition-all duration-300 hover:scale-105 relative overflow-hidden group/mobile-btn"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#90b4f0]/10 to-[#90b4f0]/20 transform scale-x-0 group-hover/mobile-btn:scale-x-100 transition-transform duration-300 origin-left rounded-md"></span>
              <span className="relative z-10">Log in</span>
            </Button>
            <a href="https://www.material-tailwind.com/blocks" target="_blank">
              <Button 
                color="gray" 
                className="hover:shadow-lg hover:shadow-[#90b4f0]/20 hover:bg-gradient-to-r hover:from-[#90b4f0] hover:to-[#6fa8dc] hover:text-white transition-all duration-300 hover:scale-105"
              >
                blocks
              </Button>
            </a>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;