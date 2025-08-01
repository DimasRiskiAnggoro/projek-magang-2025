"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";

export function Content() {
  const [visibleElements, setVisibleElements] = useState(new Set());
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

  return (
    <section className="py-12 px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-yellow-200/20 to-red-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="mx-auto max-w-screen-md relative z-10">
        {/* Logo Section with animated background */}
        <div 
          ref={el => elementsRef.current[0] = el}
          className={`flex justify-center mb-12 transition-all duration-1000 ease-out transform ${
            visibleElements.has(0) ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <div className="relative">
            {/* Logo dengan background SVG sebagai fallback */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-full animate-spin-slow p-1">
              <div className="bg-white rounded-full p-6">
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-full p-4 shadow-2xl flex items-center justify-center">
                  {/* SVG Logo Kota Madiun sebagai fallback */}
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center animate-bounce-slow">
                    <svg width="60" height="60" viewBox="0 0 100 100" className="text-white">
                      <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.2"/>
                      <polygon points="50,10 70,35 85,35 60,55 70,80 50,65 30,80 40,55 15,35 30,35" fill="currentColor"/>
                      <text x="50" y="90" textAnchor="middle" className="text-xs font-bold" fill="currentColor">MADIUN</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
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

        {/* Footer section - slide dari bawah */}
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

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
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
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
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