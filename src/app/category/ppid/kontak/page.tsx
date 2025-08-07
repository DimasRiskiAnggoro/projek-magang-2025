"use client";

import React, { useState, useEffect } from "react";

export default function DynamicPPIDPage() {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  useEffect(() => {
    fetchPPIDData();
  }, []);

  const fetchPPIDData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Coba ambil semua data untuk debugging
      console.log('Mencoba mengambil semua data news...');
      const allNewsResponse = await fetch('/api/news');
      
      if (allNewsResponse.ok) {
        const allNews = await allNewsResponse.json();
        console.log('Total data news:', allNews.length);
        console.log('Sample data news:', allNews.slice(0, 3));
        
        setDebugInfo({
          totalNews: allNews.length,
          availableTitles: allNews.map(item => item.title),
          availableSlugs: allNews.map(item => item.slug)
        });

        // 2. Cari berdasarkan judul exact
        const ppidNews = allNews.find(item =>
          item.title === 'Kontak, Struktur Organisasi, Visi Misi PPID Kecamatan Taman'
        );
        
        if (ppidNews) {
          console.log('Data ditemukan berdasarkan judul:', ppidNews);
          setNewsData(ppidNews);
          return;
        }
        
        // 3. Cari berdasarkan kata kunci dalam judul
        const ppidNewsByKeyword = allNews.find(item =>
          item.title.toLowerCase().includes('ppid') && 
          item.title.toLowerCase().includes('kecamatan taman')
        );
        
        if (ppidNewsByKeyword) {
          console.log('Data ditemukan berdasarkan keyword:', ppidNewsByKeyword);
          setNewsData(ppidNewsByKeyword);
          return;
        }

        // 4. Cari berdasarkan kategori PPID atau Kontak PPID
        const ppidNewsByCategory = allNews.find(item =>
          item.categories && item.categories.some(cat => 
            cat.name && (
              cat.name.toLowerCase().includes('ppid') ||
              cat.name.toLowerCase().includes('kontak')
            )
          )
        );
        
        if (ppidNewsByCategory) {
          console.log('Data ditemukan berdasarkan kategori:', ppidNewsByCategory);
          setNewsData(ppidNewsByCategory);
          return;
        }
      }

      // 5. Coba berbagai variasi slug
      const slugVariations = [
        'kontak-struktur-organisasi-visi-misi-ppid-kecamatan-taman',
        'kontak-struktur-organisasi-visi-misi-ppid-1',
        'ppid-kecamatan-taman',
        'kontak-ppid',
        'visi-misi-ppid'
      ];

      for (const slug of slugVariations) {
        console.log(`Mencoba slug: ${slug}`);
        try {
          const slugResponse = await fetch(`/api/news/slug/${slug}`);
          if (slugResponse.ok) {
            const data = await slugResponse.json();
            console.log(`Data ditemukan dengan slug ${slug}:`, data);
            setNewsData(data);
            return;
          }
        } catch (slugError) {
          console.log(`Slug ${slug} tidak ditemukan`);
        }
      }

      throw new Error('Data PPID tidak ditemukan dengan berbagai metode pencarian');
     
    } catch (err) {
      console.error('Error fetching PPID data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseContent = (contents) => {
    if (!contents || !Array.isArray(contents)) return null;
   
    const parsed = {
      contact: { address: '', phone: '', email: '', hours: '' },
      vision: "",
      missions: [],
      goal: ""
    };

    contents.forEach(content => {
      const text = content.content.trim();
      const type = content.type?.toLowerCase();
      const metadata = content.metadata;

      if (type === 'contact' || type === 'kontak') {
        if (metadata?.field === 'address' || text.includes('Jl.')) {
          parsed.contact.address = text;
        } else if (metadata?.field === 'phone' || text.includes('(')) {
          parsed.contact.phone = text;
        } else if (metadata?.field === 'email' || text.includes('@')) {
          parsed.contact.email = text;
        } else if (metadata?.field === 'hours' || text.includes('Senin')) {
          parsed.contact.hours = text;
        }
      } else if (type === 'vision' || type === 'visi') {
        parsed.vision = text.replace(/^(visi[:\s]*)/i, '').replace(/^["']|["']$/g, '').trim();
      } else if (type === 'mission' || type === 'misi') {
        const missionText = text.replace(/^(misi[:\s]*)/i, '').trim();
        const missions = missionText
          .split(/\n|•|\d+\.|-/)
          .filter(m => m.trim().length > 10)
          .map(m => m.trim().replace(/^[-•\d.)\s]+/, ''));
        parsed.missions = missions;
      } else if (type === 'goal' || type === 'tujuan') {
        parsed.goal = text.replace(/^(tujuan[:\s]*)/i, '').trim();
      }
    });

    return parsed;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Memuat data PPID dari database...</p>
        </div>
      </div>
    );
  }

  // Error state with debug info
  if (error || !newsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center p-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl p-8 shadow-xl text-center max-w-4xl">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">
            Data PPID dengan judul "Kontak, Struktur Organisasi, Visi Misi PPID Kecamatan Taman" tidak ditemukan di database.
          </p>
          <p className="text-sm text-gray-500 mb-6">Error: {error}</p>
          
          {/* Debug Information */}
          {debugInfo && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-bold text-gray-800 mb-2">Debug Information:</h3>
              <p className="text-sm text-gray-600 mb-2">Total data news: {debugInfo.totalNews}</p>
              
              <div className="mb-3">
                <h4 className="font-semibold text-gray-700">Available Titles:</h4>
                <div className="text-xs text-gray-600 max-h-32 overflow-y-auto">
                  {debugInfo.availableTitles.map((title, index) => (
                    <div key={index}>• {title}</div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700">Available Slugs:</h4>
                <div className="text-xs text-gray-600 max-h-32 overflow-y-auto">
                  {debugInfo.availableSlugs.map((slug, index) => (
                    <div key={index}>• {slug}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
            >
              Muat Ulang
            </button>
            <button
              onClick={() => console.log('Debug info:', debugInfo)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
            >
              Debug Console
            </button>
          </div>
        </div>
      </div>
    );
  }

  const parsedData = parseContent(newsData.contents) || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 pt-20 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
       
        {/* Header */}
        <div className="relative text-center rounded-2xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMzMzO3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2NjY7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8IS0tIEJ1aWxkaW5nIHNpbGhvdWV0dGVzIC0tPgo8cmVjdCB4PSIxMDAiIHk9IjQwMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzIyMiIvPgo8cmVjdCB4PSIyMDAiIHk9IjM1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyNTAiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iMzIwIiB5PSIzMDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMjIyIi8+CjxyZWN0IHg9IjQ2MCIgeT0iMjgwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyMCIgZmlsbD0iIzMzMyIvPgo8cmVjdCB4PSI1ODAiIHk9IjMyMCIgd2lkdGg9IjkwIiBoZWlnaHQ9IjI4MCIgZmlsbD0iIzIyMiIvPgo8cmVjdCB4PSI3MDAiIHk9IjM2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzMyIvPgo8cmVjdCB4PSI4MDAiIHk9IjM4MCIgd2lkdGg9IjEwNSIgaGVpZ2h0PSIyMjAiIGZpbGw9IiMyMjIiLz4KPHJlY3QgeD0iOTMwIiB5PSI0MjAiIHdpZHRoPSI4NSIgaGVpZ2h0PSIxODAiIGZpbGw9IiMzMzMiLz4KPHJlY3QgeD0iMTA0MCIgeT0iNDUwIiB3aWR0aD0iNzAiIGhlaWdodD0iMTUwIiBmaWxsPSIjMjIyIi8+Cjwvc3ZnPgo=')`
            }}
          ></div>
         
          <div className="relative z-20">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {newsData.title}
            </h1>
            <p className="text-white text-opacity-90 text-lg">
              {newsData.excerpt || 'Pejabat Pengelola Informasi dan Dokumentasi Kecamatan Taman, Kota Madiun'}
            </p>
            <div className="mt-4 text-sm text-white text-opacity-75">
              <p>Terakhir diperbarui: {new Date(newsData.updated_at).toLocaleDateString('id-ID')}</p>
              <p>Dilihat: {newsData.views} kali</p>
              <p className="text-xs">ID: {newsData.id} | Slug: {newsData.slug}</p>
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
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
              <p className="whitespace-pre-line">
                {parsedData.contact?.address || 'Data alamat tidak tersedia'}
              </p>
            </div>

            {/* Telepon */}
            <div className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <h3 className="text-xl font-semibold">Telepon</h3>
              </div>
              <p className="whitespace-pre-line">
                {parsedData.contact?.phone || 'Data telepon tidak tersedia'}
              </p>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <h3 className="text-xl font-semibold">Email</h3>
              </div>
              <p className="whitespace-pre-line">
                {parsedData.contact?.email || 'Data email tidak tersedia'}
              </p>
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
              <p className="whitespace-pre-line">
                {parsedData.contact?.hours || 'Data jam pelayanan tidak tersedia'}
              </p>
            </div>
          </div>

          {/* Info Layanan */}
          <div className="bg-gradient-to-br from-pink-400 to-yellow-400 text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Informasi Layanan PPID</h3>
            <p className="text-lg">
              PPID Kecamatan Taman, Kota Madiun siap melayani permintaan informasi publik sesuai dengan Undang-Undang No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik. Kami berkomitmen memberikan pelayanan informasi yang transparan, akuntabel, dan berkualitas kepada masyarakat.
            </p>
          </div>
        </section>

        {/* Struktur Organisasi */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Struktur Organisasi PPID</h2>
         
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Bagan Struktur Organisasi</h3>
             
              {/* Gambar dari database */}
              {newsData?.images && newsData.images.length > 0 ? (
                <div className="mb-6">
                  <img
                    src={`/storage/${newsData.images[0].path}`}
                    alt="Struktur Organisasi PPID"
                    className="w-full max-w-4xl mx-auto rounded-xl shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}  
                  />
                  <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-xl p-12" style={{display: 'none'}}>
                    <div className="flex flex-col items-center justify-center text-gray-600">
                      <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                      <p className="text-lg font-medium">Gambar tidak dapat dimuat</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-xl p-12 mb-6">
                  <div className="flex flex-col items-center justify-center text-gray-600">
                    <svg className="w-16 h-16 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    <p className="text-lg font-medium">Gambar Struktur Organisasi Tidak Tersedia</p>
                    <p className="text-sm text-gray-500">Silakan upload gambar melalui admin panel</p>
                  </div>
                </div>
              )}
             
              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
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
                    <span>Upload: {new Date(newsData.published_at || newsData.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <span>Author: {newsData.author || 'Admin PPID'} | Update: {new Date(newsData.updated_at).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
             
              {/* PDF Download */}
              {newsData?.pdfs && newsData.pdfs.length > 0 && (
                <div className="mt-4">
                  <a
                    href={`/storage/${newsData.pdfs[0].path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300 inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    Unduh Struktur Organisasi (PDF)
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Visi Misi */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Visi & Misi PPID</h2>
         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Visi */}
            <div className="bg-gradient-to-br from-teal-400 to-green-500 text-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-6 text-center">VISI</h3>
              <p className="text-lg leading-relaxed text-center">
                "{parsedData.vision || 'Data visi tidak tersedia. Silakan lengkapi melalui admin panel.'}"
              </p>
            </div>

            {/* Misi */}
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 text-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-6 text-center">MISI</h3>
              {parsedData.missions && parsedData.missions.length > 0 ? (
                <ul className="space-y-3">
                  {parsedData.missions.map((mission, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-300 font-bold mr-3">✓</span>
                      <span>{mission}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-yellow-200">
                  <p>Data misi tidak tersedia.</p>
                  <p className="text-sm mt-2">Silakan lengkapi melalui admin panel.</p>
                </div>
              )}
            </div>
          </div>

          {/* Tujuan */}
          <div className="bg-gradient-to-br from-pink-400 to-orange-400 text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Tujuan PPID</h3>
            <p className="text-lg leading-relaxed">
              {parsedData.goal || 'Data tujuan PPID tidak tersedia. Silakan lengkapi melalui admin panel untuk menampilkan informasi tujuan PPID Kecamatan Taman.'}
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-white text-opacity-80 py-8">
          <p className="text-lg">© 2025 PPID Kecamatan Taman - Kota Madiun</p>
          <p className="text-sm mt-2">Komitmen kami untuk transparansi dan akuntabilitas</p>
          <p className="text-xs mt-2 text-white text-opacity-60">
            Data ID: {newsData.id} • Slug: {newsData.slug}
          </p>
        </footer>
      </div>
    </div>
  );
}
