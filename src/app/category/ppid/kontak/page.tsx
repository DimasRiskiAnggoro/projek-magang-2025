"use client";

import React, { useState } from "react";

// =====================
// Kontak Page
// =====================
export const KontakPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Kontak, Struktur Organisasi, Visi Misi PPID Kecamatan Taman
          </h1>
          <p className="text-white text-opacity-90 text-lg">
            Pejabat Pengelola Informasi dan Dokumentasi Kecamatan Taman, Kota Madiun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Alamat */}
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <h3 className="text-xl font-semibold">Alamat</h3>
            </div>
            <p>Jl. Mayjen Sungkono No. 36<br/>Kecamatan Taman<br/>Kota Madiun<br/>Jawa Timur 63117</p>
          </div>

          {/* Telepon */}
          <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <h3 className="text-xl font-semibold">Telepon</h3>
            </div>
            <p>(0351) 465123<br/>Fax: (0351) 465456</p>
          </div>

          {/* Email */}
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <h3 className="text-xl font-semibold">Email</h3>
            </div>
            <p>ppid.kectaman@madiunkota.go.id<br/>diskominfo@madiunkota.go.id</p>
          </div>

          {/* Jam Pelayanan */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              <h3 className="text-xl font-semibold">Jam Pelayanan</h3>
            </div>
            <p>Senin - Jumat: 08.00 - 16.00 WIB<br/>Sabtu & Minggu: Libur</p>
          </div>
        </div>

        {/* Informasi Layanan */}
        <div className="bg-gradient-to-br from-pink-400 to-yellow-400 text-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Informasi Layanan PPID</h3>
          <p className="text-lg">PPID Kecamatan Taman, Kota Madiun siap melayani permintaan informasi publik sesuai dengan Undang-Undang No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik. Kami berkomitmen memberikan pelayanan informasi yang transparan, akuntabel, dan berkualitas kepada masyarakat.</p>
        </div>
      </div>
    </div>
  );
};

// =====================
// Struktur Page
// =====================
export const StrukturPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Struktur Organisasi PPID</h1>
          <p className="text-white text-opacity-90 text-lg">Kecamatan Taman, Kota Madiun</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* Ketua */}
          <div className="bg-gradient-to-br from-red-400 to-yellow-400 text-white p-6 rounded-2xl shadow-lg text-center min-w-64 transform hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2">Ketua PPID</h4>
            <p className="text-lg">Camat Taman</p>
          </div>

          {/* Wakil Ketua */}
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-2xl shadow-lg text-center min-w-56 transform hover:scale-105 transition-transform duration-300">
            <h4 className="text-lg font-bold mb-2">Wakil Ketua PPID</h4>
            <p>Sekretaris Camat</p>
          </div>

          {/* Sekretaris & Bendahara */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-2xl shadow-lg text-center min-w-52 transform hover:scale-105 transition-transform duration-300">
              <h4 className="text-lg font-bold mb-2">Sekretaris PPID</h4>
              <p>Kepala Sub Bagian Umum</p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-lg text-center min-w-52 transform hover:scale-105 transition-transform duration-300">
              <h4 className="text-lg font-bold mb-2">Bendahara PPID</h4>
              <p>Staff Sub Bagian Keuangan</p>
            </div>
          </div>

          {/* Anggota */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 text-white p-6 rounded-2xl shadow-lg text-center min-w-48 transform hover:scale-105 transition-transform duration-300">
              <h4 className="text-lg font-bold mb-2">Anggota PPID</h4>
              <p>Kepala Seksi Pemerintahan</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 text-white p-6 rounded-2xl shadow-lg text-center min-w-48 transform hover:scale-105 transition-transform duration-300">
              <h4 className="text-lg font-bold mb-2">Anggota PPID</h4>
              <p>Kepala Seksi Pemberdayaan</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 text-white p-6 rounded-2xl shadow-lg text-center min-w-48 transform hover:scale-105 transition-transform duration-300">
              <h4 className="text-lg font-bold mb-2">Anggota PPID</h4>
              <p>Kepala Seksi Kesejahteraan</p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-gradient-to-br from-pink-400 to-yellow-400 text-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Tugas dan Fungsi</h3>
          <p className="text-lg">Struktur organisasi PPID Kecamatan Taman Kota Madiun dibentuk untuk menjalankan tugas pengelolaan informasi dan dokumentasi secara profesional. Setiap anggota memiliki peran dan tanggung jawab yang jelas dalam memberikan pelayanan informasi publik kepada masyarakat.</p>
        </div>
      </div>
    </div>
  );
};

// =====================
// Visi Misi Page
// =====================
export const VisiMisiPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Visi & Misi PPID</h1>
          <p className="text-white text-opacity-90 text-lg">Kecamatan Taman, Kota Madiun</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-teal-400 to-green-500 text-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-6 text-center">VISI</h3>
            <p className="text-lg leading-relaxed text-center">
              "Terwujudnya pelayanan informasi publik yang transparan, akuntabel, dan berkualitas untuk mendukung good governance di Kecamatan Taman Kota Madiun"
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-6 text-center">MISI</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-3">✓</span>
                <span>Menyediakan informasi publik yang akurat dan terkini</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-3">✓</span>
                <span>Meningkatkan aksesibilitas informasi bagi masyarakat</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-3">✓</span>
                <span>Membangun sistem dokumentasi yang baik dan terstruktur</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-3">✓</span>
                <span>Memberikan pelayanan prima dalam pengelolaan informasi</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 font-bold mr-3">✓</span>
                <span>Mendukung keterbukaan informasi publik</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-400 to-orange-400 text-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Tujuan PPID</h3>
          <p className="text-lg leading-relaxed">
            PPID Kecamatan Taman Kota Madiun bertujuan untuk menciptakan pemerintahan yang transparan dan akuntabel melalui pengelolaan informasi publik yang profesional. Kami berkomitmen untuk memberikan akses informasi yang mudah dan cepat kepada seluruh masyarakat sesuai dengan peraturan perundang-undangan yang berlaku.
          </p>
        </div>
      </div>
    </div>
  );
};

// =====================
// Komponen Utama
// =====================
export default function PPIDPages() {
  const [activePage, setActivePage] = useState("kontak");

  const renderActivePage = () => {
    switch (activePage) {
      case "kontak":
        return <KontakPage />;
      case "struktur":
        return <StrukturPage />;
      case "visi-misi":
        return <VisiMisiPage />;
      default:
        return <KontakPage />;
    }
  };

  return (
    <div>
      {/* Navigasi */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border-b border-white border-opacity-20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center space-x-1 py-4">
            {["kontak", "struktur", "visi-misi"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePage(tab)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activePage === tab
                    ? "bg-white bg-opacity-20 text-white shadow-lg"
                    : "text-white text-opacity-70 hover:text-white hover:bg-white hover:bg-opacity-10"
                }`}
              >
                {tab === "kontak"
                  ? "Kontak"
                  : tab === "struktur"
                  ? "Struktur Organisasi"
                  : "Visi & Misi"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Konten Aktif */}
      <div className="transition-all duration-500 ease-in-out">{renderActivePage()}</div>
    </div>
  );
}
