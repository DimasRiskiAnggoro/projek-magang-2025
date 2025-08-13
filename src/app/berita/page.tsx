"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Tipe data berita sesuai dengan struktur dari admin
type NewsItem = {
  id: number;
  title: string;
  excerpt?: string;
  slug: string;
  author?: string;
  published_at: string;
  status: string;
  source_url?: string;
  thumbnail_image_id?: number;
  categories: Array<{
    id: number;
    name: string;
  }>;
  images: Array<{
    id: number;
    path: string;
    caption?: string;
    urutan: number;
  }>;
  contents: Array<{
    id: number;
    type: string;
    content: string;
  }>;
  pdfs: Array<{
    id: number;
    path: string;
    title?: string;
    description?: string;
  }>;
  thumbnailImage?: {
    id: number;
    path: string;
    caption?: string;
  };
};

// Format tanggal Indonesia
const formatTanggal = (tanggal: string) => {
  if (!tanggal) return '';
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Komponen kartu berita
const NewsCard = ({ news }: { news: NewsItem }) => {
  const router = useRouter();

  // Fungsi untuk navigasi ke halaman kategori
  const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>, categoryId: number, categoryName: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/berita/kategori/${categoryId}`);
  };

  // Fungsi untuk mengambil gambar thumbnail yang sudah diset dari admin
  const getImageUrl = () => {
    // Prioritas 1: Gunakan thumbnail yang sudah diset dari admin (relasi thumbnailImage)
    if (news.thumbnailImage) {
      return `${process.env.NEXT_PUBLIC_API_URL}/storage/${news.thumbnailImage.path}`;
    }

    // Prioritas 2: Cari gambar berdasarkan thumbnail_image_id
    if (news.thumbnail_image_id && news.images) {
      const thumbnailImage = news.images.find(img => img.id === news.thumbnail_image_id);
      if (thumbnailImage) {
        return `${process.env.NEXT_PUBLIC_API_URL}/storage/${thumbnailImage.path}`;
      }
    }

    // Prioritas 3: Gunakan gambar pertama berdasarkan urutan
    if (news.images && news.images.length > 0) {
      // Sort berdasarkan urutan, kemudian ambil yang pertama
      const sortedImages = [...news.images].sort((a, b) => a.urutan - b.urutan);
      return `${process.env.NEXT_PUBLIC_API_URL}/storage/${sortedImages[0].path}`;
    }

    // Prioritas 4: Fallback ke gambar default
    return "/image/DINAS KOMUNIKASI DAN INFORMATIKA KOTA MADIUN.png";
  };

  // Ambil deskripsi dari excerpt atau content pertama
  const getDescription = () => {
    if (news.excerpt) {
      return news.excerpt;
    }
    
    // Jika tidak ada excerpt, ambil dari content pertama
    const firstContent = news.contents?.find(content => content.type === 'paragraph');
    if (firstContent) {
      // Hapus HTML tags dan batasi panjang
      const plainText = firstContent.content.replace(/<[^>]*>/g, '');
      return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
    }
    
    return "Ini adalah deskripsi singkat dari berita yang ditampilkan pada halaman ini. Berita ini berisi informasi penting.";
  };

  return (
    <article className="bg-white hover:bg-gray-50 transition-colors shadow-md rounded-lg overflow-hidden transform hover:scale-[1.02] hover:shadow-lg duration-300 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={news.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/image/DINAS KOMUNIKASI DAN INFORMATIKA KOTA MADIUN.png";
          }}
        />
      </div>
      
      <div className="p-6">
        {/* Kategori Tags - Clickable */}
        {news.categories && news.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {news.categories.map(cat => (
              <button
                key={cat.id}
                onClick={(e) => handleCategoryClick(e, cat.id, cat.name)}
                className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900 transition-colors cursor-pointer"
                title={`Lihat semua berita kategori ${cat.name}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          <Link 
            href={`/berita/${news.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {news.title}
          </Link>
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {getDescription()}
        </p>

        {/* Meta Information */}
        <div className="flex flex-col gap-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>Diposting oleh {news.author || "Admin Kecamatan"}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>pada {formatTanggal(news.published_at)}</span>
          </div>
        </div>

        <Link
          href={`/berita/${news.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group"
        >
          Baca Selengkapnya
          <svg
            className="w-4 h-4 transition-transform transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

const BeritaPage = () => {
  const perPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data berita dari API
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Gagal mengambil data berita');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        // Filter hanya berita yang sudah dipublish dan urutkan berdasarkan tanggal terbaru
        const publishedNews = data
          .filter(item => item.status === 'published')
          .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        setNews(publishedNews);
      } else {
        console.error("Respons API bukan array yang valid:", data);
        setNews([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
      setError("Gagal memuat berita. Silakan coba lagi nanti.");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(news.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedNews = news.slice(startIndex, startIndex + perPage);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg overflow-hidden animate-pulse shadow-md border border-gray-100">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <div className="h-5 bg-gray-200 rounded-full w-16"></div>
          <div className="h-5 bg-gray-200 rounded-full w-20"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-28 mb-4"></div>
        <div className="h-9 bg-gray-200 rounded-lg w-36"></div>
      </div>
    </div>
  );

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-gray-50 via-white to-white pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header with better spacing */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Berita Terbaru
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          {!loading && !error && news.length > 0 && (
            <p className="text-gray-600 mt-4">
              Menampilkan {Math.min(startIndex + perPage, news.length)} dari {news.length} berita
            </p>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: perPage }).map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </section>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="text-red-500 text-6xl mb-6">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Terjadi Kesalahan</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchNews}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-6">📰</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Belum Ada Berita</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Berita akan ditampilkan di sini setelah admin memublikasikannya.
            </p>
          </div>
        )}

        {/* Grid berita dengan spacing yang lebih baik */}
        {!loading && !error && paginatedNews.length > 0 && (
          <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {paginatedNews.map((newsItem) => (
              <NewsCard key={newsItem.id} news={newsItem} />
            ))}
          </section>
        )}

        {/* Pagination dengan styling yang lebih baik */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-1">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 text-sm rounded-md transition border ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else {
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 text-sm rounded-md transition border ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 text-sm rounded-md transition border ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default BeritaPage;