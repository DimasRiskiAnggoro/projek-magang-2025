"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Definisi tipe untuk objek fitur
interface Feature {
  title: string;
  img: string;
  href: string;
}

const FEATURES: Feature[] = [
  { title: "Analisa Berita", img: "/icons/madiun.png", href: "https://analisaberita.madiunkota.go.id/" },
  { title: "Awak Sigap", img: "/icons/awaksigap.jpeg", href: "https://awaksigap.madiunkota.go.id/" },
  { title: "CSIRT Kota Madiun", img: "/icons/CSIRT.jpeg", href: "https://csirt.madiunkota.go.id/" },
  { title: "Edu", img: "/icons/madiun.png", href: "https://edu.madiunkota.go.id/" },
  { title: "Madiun Siaga 112", img: "/icons/madiun.png", href: "https://api.whatsapp.com/send?phone=628113577800" },
  { title: "Madiun Today", img: "/icons/madiun-today.jpeg", href: "https://madiuntoday.id/" },
  { title: "Open Data", img: "/icons/open-data.png", href: "https://opendata.madiunkota.go.id/" },
  { title: "Pecel Tumpang", img: "/icons/madiun.png", href: "https://peceltumpang.madiunkota.go.id/" },
  { title: "PPID Kota Madiun", img: "/icons/PPID.png", href: "https://ppid.madiunkota.go.id/" },
  { title: "Sipdok", img: "/icons/madiun.png", href: "https://sipdok.madiunkota.go.id/" },
  { title: "Smart City Kota Madiun", img: "/icons/madiun.png", href: "https://smartcity.madiunkota.go.id/" },
  { title: "SPBE Kota Madiun", img: "/icons/madiun.png", href: "https://spbe.madiunkota.go.id/" },
  { title: "Suara Radio Madiun", img: "/icons/radio-madiun.png", href: "https://93fm.madiunkota.go.id/" },
];

const SCROLL_INTERVAL = 4000;
const ITEMS_PER_PAGE = 6;

const ProfilOPDPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container utama dengan padding top untuk menghindari navbar */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header dengan judul */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            PROFIL OPD
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* Container untuk konten profil */}
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Card Tupoksi Kecamatan Taman Kota Madiun */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Gambar */}
              <div className="lg:w-1/3 h-48 lg:h-auto">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image Placeholder</span>
                </div>
              </div>
              
              {/* Konten */}
              <div className="lg:w-2/3 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Tupoksi Kecamatan Taman Kota Madiun
                </h2>
                
                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 space-x-4">
                  <div className="flex items-center">
                    <span className="text-blue-600">📅</span>
                    <span className="ml-1">5 August, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600">👤</span>
                    <span className="ml-1">admin</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600">📁</span>
                    <span className="ml-1">Profil OPD</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Download Disini
                </p>
                
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md transition-colors duration-200">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Card Profil Kecamatan Taman Kota Madiun */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Gambar */}
              <div className="lg:w-1/3 h-48 lg:h-auto">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image Placeholder</span>
                </div>
              </div>
              
              {/* Konten */}
              <div className="lg:w-2/3 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Profil Kecamatan Taman Kota Madiun
                </h2>
                
                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 space-x-4">
                  <div className="flex items-center">
                    <span className="text-blue-600">📅</span>
                    <span className="ml-1">5 August, 2024</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600">👤</span>
                    <span className="ml-1">ppidtaman1</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600">📁</span>
                    <span className="ml-1">Profil OPD</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  KECAMATAN TAMAN KOTA MADIUN merupakan salah satu kecamatan... (isi deskripsi selengkapnya)
                </p>
                
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md transition-colors duration-200">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Ayo Dulur-Dulur */}
        <AyoDulurSection />
      </div>
    </div>
  );
};

// Component AyoDulurSection
function AyoDulurSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [autoScrollDirection, setAutoScrollDirection] = useState<'right' | 'left'>('right');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const totalPages = Math.ceil(FEATURES.length / ITEMS_PER_PAGE);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft < 1);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      checkScrollPosition();
      const handleResize = () => checkScrollPosition();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const intervalId = setInterval(() => {
      const isCurrentlyAtEnd = (scrollRef.current?.scrollLeft ?? 0) + (scrollRef.current?.clientWidth ?? 0) >= (scrollRef.current?.scrollWidth ?? 0) - 1;
      const isCurrentlyAtStart = (scrollRef.current?.scrollLeft ?? 0) < 1;

      if (autoScrollDirection === 'right') {
        if (isCurrentlyAtEnd) {
          setAutoScrollDirection('left');
        } else {
          scroll('right');
        }
      } else {
        if (isCurrentlyAtStart) {
          setAutoScrollDirection('right');
        } else {
          scroll('left');
        }
      }
    }, SCROLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [isPaused, autoScrollDirection]);

  const pages: Feature[][] = [];
  for (let i = 0; i < FEATURES.length; i += ITEMS_PER_PAGE) {
    pages.push(FEATURES.slice(i, i + ITEMS_PER_PAGE));
  }

  return (
    <section 
      className="px-6 py-12 max-w-7xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h4 className="text-teal-800 font-bold text-2xl">
              <span className="border-l-4 border-teal-800 pl-4">Ayo Dulur-Dulur</span>
            </h4>
            <p className="text-gray-600 mt-2 ml-4">
              Sing podo rukun nata kutho medhioen
            </p>
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={isAtStart}
              aria-label="Scroll left"
              className="p-2 border border-teal-800 text-teal-800 rounded-lg transition-all duration-300 hover:bg-teal-800 hover:text-white hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={isAtEnd}
              aria-label="Scroll right"
              className="p-2 border border-teal-800 text-teal-800 rounded-lg transition-all duration-300 hover:bg-teal-800 hover:text-white hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScrollPosition}
          className="overflow-x-auto scroll-smooth custom-scroll-hidden p-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-8" style={{ width: `${totalPages * 100}%` }}>
            {pages.map((pageItems, pageIndex) => (
              <div 
                key={pageIndex}
                className="flex-shrink-0 grid grid-cols-3 grid-rows-2 gap-6 h-[450px] p-2"
                style={{ 
                  width: `${100 / totalPages}%`,
                  scrollSnapAlign: 'start'
                }}
              >
                {pageItems.map((item, index) => {
                  const globalIndex = pageIndex * ITEMS_PER_PAGE + index;
                  return (
                    <a 
                      href={item.href} 
                      key={item.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                      onMouseEnter={() => setHoveredItem(globalIndex)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className={`h-full border rounded-xl p-6 flex items-center gap-4 transition-all duration-500 ease-out transform cursor-pointer relative overflow-hidden group
                        ${hoveredItem === globalIndex 
                          ? 'bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white shadow-2xl scale-105 border-teal-600' 
                          : 'bg-white shadow hover:shadow-lg border-gray-200 hover:border-teal-300'}
                      `}>
                        <div className={`absolute inset-0 opacity-10 transition-all duration-700 ${hoveredItem === globalIndex ? 'scale-100' : 'scale-0'}`}>
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-teal-100 to-transparent transform rotate-12"></div>
                        </div>

                        {hoveredItem === globalIndex && (
                          <div className="absolute inset-0 pointer-events-none">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-bounce"
                                style={{
                                  left: `${20 + i * 20}%`,
                                  top: `${20 + (i % 2) * 40}%`,
                                  animationDelay: `${i * 200}ms`,
                                  animationDuration: '2s'
                                }}
                              />
                            ))}
                          </div>
                        )}

                        <div className={`relative z-10 transition-all duration-500 ${hoveredItem === globalIndex ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}>
                          <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-500 overflow-hidden
                            ${hoveredItem === globalIndex ? 'bg-white bg-opacity-20 shadow-lg' : 'bg-gray-50'}
                          `}>
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-12 h-12 object-contain rounded transition-all duration-500"
                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const nextSibling = target.nextSibling as HTMLElement;
                                if (nextSibling) {
                                  nextSibling.style.display = 'flex';
                                }
                              }}
                            />
                            <div className="w-12 h-12 bg-teal-100 rounded-lg hidden items-center justify-center">
                              <span className="text-2xl">📱</span>
                            </div>
                          </div>

                          <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-500 ${hoveredItem === globalIndex ? 'border-white border-opacity-50 animate-pulse' : 'border-transparent'}`}></div>
                        </div>

                        <div className="relative z-10 flex-1 min-w-0">
                          <h6 className={`font-bold text-lg mb-1 transition-all duration-500 transform truncate ${hoveredItem === globalIndex ? 'text-white translate-x-1' : 'text-gray-900'}`}>
                            {item.title}
                          </h6>
                          <div className={`text-sm font-medium transition-all duration-500 transform ${hoveredItem === globalIndex ? 'text-teal-100 translate-x-1' : 'text-teal-600'}`}>
                            {hoveredItem === globalIndex ? 'Klik untuk membuka' : 'Jelajahi layanan'}
                          </div>
                        </div>

                        <div className={`relative z-10 transition-all duration-500 transform ${hoveredItem === globalIndex ? 'translate-x-2 scale-125 text-white' : 'translate-x-0 scale-100 text-teal-600'}`}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>

                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 transition-all duration-1000 ${hoveredItem === globalIndex ? 'translate-x-full opacity-20' : '-translate-x-full opacity-0'}`}></div>
                        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500 ${hoveredItem === globalIndex ? 'w-full' : 'w-0'}`}></div>
                      </div>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {/* Pagination dots bisa ditambahkan di sini jika diperlukan */}
        </div>
      </div>

      <style jsx>{`
        .custom-scroll-hidden {
          scrollbar-width: none;
        }
        .custom-scroll-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default ProfilOPDPage;