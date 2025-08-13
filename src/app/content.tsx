"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Search, ExternalLink } from "lucide-react";

export function Content() {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = elementsRef.current.indexOf(entry.target);
            setVisibleElements(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Sample categories - this would be populated by admin
  const categories = [
    { id: 1, name: "Pelayanan Administrasi", count: 12, color: "blue" },
    { id: 2, name: "Kesehatan", count: 8, color: "green" },
    { id: 3, name: "Pendidikan", count: 15, color: "purple" },
    { id: 4, name: "Ekonomi & UMKM", count: 6, color: "yellow" },
    { id: 5, name: "Infrastruktur", count: 10, color: "red" },
    { id: 6, name: "Sosial Budaya", count: 7, color: "indigo" }
  ];

  const externalLinks = [
    {
      name: "Kominfo",
      logo: "🌐",
      url: "https://kominfo.go.id",
      bgColor: "from-blue-500 to-blue-600"
    },
    {
      name: "Awak Sigap",
      logo: "🚨",
      url: "#",
      bgColor: "from-red-500 to-red-600"
    },
    {
      name: "PPID Kota Madiun",
      logo: "📋",
      url: "#",
      bgColor: "from-green-500 to-green-600"
    },
    {
      name: "Diskominfo",
      logo: "💻",
      url: "#",
      bgColor: "from-purple-500 to-purple-600"
    },
    {
      name: "Portal Kota Madiun",
      logo: "🏛️",
      url: "#",
      bgColor: "from-yellow-500 to-yellow-600"
    },
    {
      name: "E-Government",
      logo: "⚙️",
      url: "#",
      bgColor: "from-indigo-500 to-indigo-600"
    }
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    setIsDropdownOpen(false);
    console.log("Selected category:", category);
    // Implement category filter functionality here
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      red: "bg-red-100 text-red-800 border-red-200",
      indigo: "bg-indigo-100 text-indigo-800 border-indigo-200"
    };
    return colorMap[color] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <section className="py-12 px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-yellow-200/20 to-red-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="mx-auto max-w-screen-xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 lg:w-2/3">
            {/* Logo Section - Static Logo */}
            <div 
              ref={el => elementsRef.current[0] = el}
              className={`flex justify-center mb-12 transition-all duration-1000 ease-out transform ${
                visibleElements.has(0) ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
            >
              <div className="relative">
                {/* Static Logo Container */}
                <div className="bg-white rounded-full p-6 shadow-2xl">
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-full p-4 shadow-lg flex items-center justify-center">
                    {/* Logo Image */}
                    <div className="w-24 h-24 flex items-center justify-center">
                      <img 
                        src="icons/madiun.png" 
                        alt="Logo Kota Madiun" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback jika gambar tidak ditemukan
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback SVG Logo jika gambar tidak tersedia */}
                      <div className="w-24 h-24 bg-blue-600 rounded-full items-center justify-center hidden">
                        <svg width="60" height="60" viewBox="0 0 100 100" className="text-white">
                          <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2"/>
                          <polygon points="50,10 70,35 85,35 60,55 70,80 50,65 30,80 40,55 15,35 30,35" fill="currentColor"/>
                          <text x="50" y="90" textAnchor="middle" className="text-xs font-bold" fill="currentColor">MADIUN</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Subtle glow effect - static */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur-xl opacity-30"></div>
              </div>
            </div>

            {/* Hashtag - slide dari kanan */}
            <div 
              ref={el => elementsRef.current[1] = el}
              className={`transition-all duration-1000 ease-out delay-200 transform ${
                visibleElements.has(1) ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <Typography color="blue" variant="h6" className="text-center">
                #KecamatanTaman #KotaMadiun #PelayananPublik
              </Typography>
            </div>

            {/* Paragraf pertama - slide dari kiri */}
            <div 
              ref={el => elementsRef.current[2] = el}
              className={`transition-all duration-1000 ease-out delay-400 transform ${
                visibleElements.has(2) ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
            >
              <Typography className="my-12 font-normal !text-gray-500">
                Kecamatan Taman merupakan salah satu kecamatan di Kota Madiun yang berperan penting 
                dalam memberikan pelayanan publik terdepan kepada masyarakat. Dengan komitmen untuk 
                memberikan pelayanan yang prima, transparan, dan inovatif, Kecamatan Taman terus 
                berupaya meningkatkan kualitas hidup warga melalui berbagai program pembangunan 
                dan pemberdayaan masyarakat.
              </Typography>
            </div>

            {/* Heading - fade in dari atas */}
            <div 
              ref={el => elementsRef.current[3] = el}
              className={`transition-all duration-1000 ease-out delay-600 transform ${
                visibleElements.has(3) ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
              }`}
            >
              <Typography variant="h2" color="blue-gray" className="mt-8 mb-6">
                Peran Strategis Kecamatan Taman dalam Pembangunan
              </Typography>
            </div>

            {/* Paragraf kedua - slide dari kanan */}
            <div 
              ref={el => elementsRef.current[4] = el}
              className={`transition-all duration-1000 ease-out delay-800 transform ${
                visibleElements.has(4) ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <Typography className="my-10 font-normal !text-gray-500">
                Kecamatan Taman memiliki berbagai fungsi strategis dalam mendukung pembangunan Kota Madiun. 
                a. Pelayanan Administrasi Kependudukan: Memberikan layanan administrasi yang mudah, cepat, 
                dan akurat untuk seluruh warga. b. Pemberdayaan Masyarakat: Mengelola program-program 
                pemberdayaan ekonomi, sosial, dan budaya untuk meningkatkan kesejahteraan masyarakat. 
                c. Koordinasi Pembangunan: Menjadi penghubung antara pemerintah kota dengan masyarakat dalam 
                pelaksanaan program pembangunan daerah.
              </Typography>
            </div>

            {/* Gambar - slide dari kiri */}
            <div 
              ref={el => elementsRef.current[5] = el}
              className={`transition-all duration-1000 ease-out delay-1000 transform ${
                visibleElements.has(5) ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
            >
              <div className="relative group">
                <div className="w-full h-[28rem] bg-gradient-to-br from-blue-100 to-green-100 rounded-xl mb-4 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <Typography color="blue-gray" variant="h6">Kantor Kecamatan Taman</Typography>
                    <Typography variant="small" color="gray">Kota Madiun</Typography>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <Typography variant="small" className="font-normal !text-gray-500">
                Kantor Kecamatan Taman Kota Madiun
              </Typography>
            </div>

            {/* Paragraf ketiga - slide dari kanan */}
            <div 
              ref={el => elementsRef.current[6] = el}
              className={`transition-all duration-1000 ease-out delay-1200 transform ${
                visibleElements.has(6) ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <Typography className="my-12 font-normal !text-gray-500">
                Melalui inovasi pelayanan dan penerapan teknologi digital, Kecamatan Taman berupaya 
                mendekatkan pelayanan kepada masyarakat dengan lebih efektif dan efisien.
                <br />
                <br />
                Program unggulan seperti pelayanan satu pintu, digitalisasi dokumen kependudukan, 
                dan pengembangan UMKM lokal adalah beberapa contoh nyata komitmen Kecamatan Taman 
                dalam meningkatkan kualitas pelayanan publik. Kolaborasi dengan berbagai stakeholder 
                terus dilakukan untuk menciptakan lingkungan yang kondusif bagi pembangunan berkelanjutan.
              </Typography>
            </div>

            {/* Heading kedua - fade dari atas */}
            <div 
              ref={el => elementsRef.current[7] = el}
              className={`transition-all duration-1000 ease-out delay-1400 transform ${
                visibleElements.has(7) ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
              }`}
            >
              <Typography variant="h2" color="blue-gray" className="mt-8 mb-6">
                Mendukung Visi Madiun sebagai Kota Layak Huni
              </Typography>
            </div>

            {/* Paragraf terakhir - slide dari kiri */}
            <div 
              ref={el => elementsRef.current[8] = el}
              className={`transition-all duration-1000 ease-out delay-1600 transform ${
                visibleElements.has(8) ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
            >
              <Typography className="my-10 font-normal !text-gray-500">
                Sebagai bagian integral dari Kota Madiun, Kecamatan Taman berkomitmen mendukung visi kota 
                sebagai daerah yang layak huni. Ini diwujudkan melalui peningkatan kualitas infrastruktur, 
                pelestarian lingkungan, dan pemberdayaan ekonomi masyarakat.
                <br />
                <br />
                Kecamatan Taman berada di garis depan dalam mengimplementasikan program-program inovatif 
                yang berdampak langsung pada peningkatan kesejahteraan masyarakat dan kemajuan daerah 
                secara berkelanjutan.
              </Typography>
            </div>

            <div 
              ref={el => elementsRef.current[9] = el}
              className={`container mx-auto px-4 py-20 transition-all duration-1000 ease-out delay-1800 transform ${
                visibleElements.has(9) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="w-full mb-10 md:flex items-center justify-between">
                <div className="flex mb-5 md:mb-0 items-center gap-3">
                  <Button size="sm" color="gray" variant="outlined" className="hover:scale-105 transition-transform">
                    Pelayanan
                  </Button>
                  <Button size="sm" color="gray" variant="outlined" className="hover:scale-105 transition-transform">
                    Pembangunan
                  </Button>
                  <Button size="sm" color="gray" variant="outlined" className="hover:scale-105 transition-transform">
                    Masyarakat
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-9 h-9 bg-[#35518D] hover:cursor-pointer rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <i className="text-white fab fa-facebook text-lg" />
                  </button>
                  <button className="w-9 h-9 bg-[#E4405F] hover:cursor-pointer rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <i className="text-white fab fa-instagram text-lg" />
                  </button>
                  <button className="w-9 h-9 bg-[#1DA1F2] hover:cursor-pointer rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <i className="text-white fab fa-twitter text-lg" />
                  </button>
                </div>
              </div>
              <div className="md:flex items-center justify-between">
                <div className="mb-4 md:mb-0 md:flex items-center gap-5 max-w-2xl">
                  <div className="h-full mb-3 md:mb-0 w-full max-h-[4rem] max-w-[4rem] md:max-w-[6rem] md:max-h-[6rem] rounded-lg">
                    {/* Avatar placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <Typography
                      variant="h5"
                      className="mb-4 md:mb-0"
                      color="blue-gray"
                    >
                      Camat Taman
                    </Typography>
                    <Typography className="w-full md:w-10/12 font-normal !text-gray-500">
                      Drs. Bambang Sulistyo, M.Si
                    </Typography>
                  </div>
                </div>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Button
                    color="gray"
                    className="w-1/2 md:w-fit flex-shrink-0 hover:scale-105 transition-transform"
                    size="md"
                  >
                    Hubungi
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Search Box */}
            <div 
              ref={el => elementsRef.current[10] = el}
              className={`transition-all duration-1000 ease-out delay-300 transform ${
                visibleElements.has(10) ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Search size={20} className="text-blue-500" />
                  Pencarian
                </h3>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari informasi..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <Search className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
                  </div>
                  <Button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                    size="md"
                  >
                    Cari
                  </Button>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div 
              ref={el => elementsRef.current[11] = el}
              className={`transition-all duration-1000 ease-out delay-500 transform ${
                visibleElements.has(11) ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ExternalLink size={20} className="text-green-500" />
                  Link Terkait
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {externalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className={`bg-gradient-to-br ${link.bgColor} rounded-lg p-4 text-center hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-lg`}>
                        <div className="text-2xl mb-2">{link.logo}</div>
                        <div className="text-white text-sm font-medium leading-tight">
                          {link.name}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div 
              ref={el => elementsRef.current[12] = el}
              className={`transition-all duration-1000 ease-out delay-700 transform ${
                visibleElements.has(12) ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Cepat</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Pelayanan 24/7</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Layanan Digital</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Konsultasi Gratis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Berita Section */}
            <div 
              ref={el => elementsRef.current[13] = el}
              className={`transition-all duration-1000 ease-out delay-900 transform ${
                visibleElements.has(13) ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red-500">
                    <path d="M4 22H20C20.5523 22 21 21.5523 21 21V3C21 2.44772 20.5523 2 20 2H4C3.44772 2 3 2.44772 3 3V21C3 21.5523 3.44772 4 4 22Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 6H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Berita Terkini
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-red-500 pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
                       onClick={() => window.location.href = '#berita'}>
                    <h4 className="font-medium text-gray-800 text-sm">Peluncuran Program Digitalisasi Pelayanan</h4>
                    <p className="text-xs text-gray-500 mt-1">2 hari yang lalu</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
                       onClick={() => window.location.href = '#berita'}>
                    <h4 className="font-medium text-gray-800 text-sm">Sosialisasi Program Bantuan UMKM</h4>
                    <p className="text-xs text-gray-500 mt-1">5 hari yang lalu</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
                       onClick={() => window.location.href = '#berita'}>
                    <h4 className="font-medium text-gray-800 text-sm">Pembukaan Posko Pengaduan Masyarakat</h4>
                    <p className="text-xs text-gray-500 mt-1">1 minggu yang lalu</p>
                  </div>
                </div>
                <Button
                  onClick={() => window.location.href = '/berita'}
                  variant="outlined"
                  size="sm"
                  className="w-full mt-4 border-red-500 text-red-500 hover:bg-red-50 transition-all duration-300"
                >
                  Lihat Semua Berita
                </Button>
              </div>
            </div>

            {/* Category Dropdown Section */}
            <div 
              ref={el => elementsRef.current[14] = el}
              className={`transition-all duration-1000 ease-out delay-1100 transform ${
                visibleElements.has(14) ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-purple-500">
                    <path d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Kategori Layanan
                </h3>
                
                {/* Dropdown */}
                <div className="relative mb-4">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 text-left bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all flex items-center justify-between"
                  >
                    <span className="text-gray-700">
                      {selectedCategory || "Pilih Kategori Layanan"}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-800 font-medium">{category.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColorClasses(category.color)}`}>
                              {category.count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Grid */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">Kategori Populer:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.slice(0, 4).map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category)}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {category.name}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getColorClasses(category.color)}`}>
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* View All Categories Button */}
                <Button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  variant="outlined"
                  size="sm"
                  className="w-full mt-4 border-purple-500 text-purple-500 hover:bg-purple-50 transition-all duration-300"
                >
                  {isDropdownOpen ? 'Tutup' : 'Lihat Semua Kategori'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </section>
  );
}

export default Content;