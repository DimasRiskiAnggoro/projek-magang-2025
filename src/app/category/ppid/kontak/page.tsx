"use client";

import React from "react";

export default function PPIDCompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 pt-20 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header with background image */}
        <div className="relative text-center rounded-2xl p-8 overflow-hidden">
          {/* Background image overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMzMzO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2NjY7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8IS0tIEJ1aWxkaW5nIHNpbGhvdWV0dGVzIC0tPgo8cmVjdCB4PSIxMDAiIHk9IjQwMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzIyMiIvPgo8cmVjdCB4PSIyMDAiIHk9IjM1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyNTAiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iMzIwIiB5PSIzMDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMjIyIi8+CjxyZWN0IHg9IjQ2MCIgeT0iMjgwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyMCIgZmlsbD0iIzMzMyIvPgo8cmVjdCB4PSI1ODAiIHk9IjMyMCIgd2lkdGg9IjkwIiBoZWlnaHQ9IjI4MCIgZmlsbD0iIzIyMiIvPgo8cmVjdCB4PSI3MDAiIHk9IjM2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzMyIvPgo8cmVjdCB4PSI4MDAiIHk9IjM4MCIgd2lkdGg9IjEwNSIgaGVpZ2h0PSIyMjAiIGZpbGw9IiMyMjIiLz4KPHJlY3QgeD0iOTMwIiB5PSI0MjAiIHdpZHRoPSI4NSIgaGVpZ2h0PSIxODAiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iMTA0MCIgeT0iNDUwIiB3aWR0aD0iNzAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMjIyIi8+Cjwvc3ZnPgo=')`
            }}
          ></div>
          
          {/* Content */}
          <div className="relative z-20">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Kontak, Struktur Organisasi, Visi Misi PPID Kecamatan Taman
            </h1>
            <p className="text-white text-opacity-90 text-lg">
              Pejabat Pengelola Informasi dan Dokumentasi Kecamatan Taman, Kota Madiun
            </p>
          </div>
        </div>

        {/* Kontak Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Informasi Kontak</h2>
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
        </section>

        {/* Struktur Organisasi Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Struktur Organisasi PPID</h2>
          
          {/* Container untuk gambar struktur organisasi */}
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Bagan Struktur Organisasi</h3>
              
              {/* Placeholder untuk gambar - bisa diganti dengan gambar sebenarnya */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-400 rounded-xl p-12 mb-6">
                <div className="flex flex-col items-center justify-center text-gray-600">
                  <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                  <p className="text-lg font-medium">Gambar Struktur Organisasi PPID</p>
                  <p className="text-sm text-gray-500">Kecamatan Taman, Kota Madiun</p>
                </div>
              </div>
              
              {/* Info upload - changed to category info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-medium">Kategori: Informasi Publik</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                    <span>Tanggal Upload: 15 Januari 2025</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <span>Diupload oleh: Admin PPID | Terakhir diperbarui: 15 Januari 2025 | Status: Aktif</span>
                </div>
              </div>
              
              {/* View button instead of download */}
              <div className="mt-4">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center mx-auto">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  Lihat Struktur Organisasi
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Visi Misi Section */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Visi & Misi PPID</h2>
          
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
        </section>

        <footer className="text-center text-white text-opacity-80 py-8">
          <p className="text-lg">© 2025 PPID Kecamatan Taman - Kota Madiun</p>
          <p className="text-sm mt-2">Komitmen kami untuk transparansi dan akuntabilitas</p>
        </footer>
      </div>
    </div>
  );
}