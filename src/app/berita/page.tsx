"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Tipe data berita sesuai dengan struktur dari admin
type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  published_at: string;
  status: string;
  source_url?: string;
  thumbnail_image_id?: number; // ID gambar thumbnail
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
  thumbnailImage?: { // relasi thumbnail image dari backend
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
    return "/img/kesehatan.jpg";
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

  // Ambil kategori untuk ditampilkan
  const getCategoriesText = () => {
    if (news.categories && news.categories.length > 0) {
      if (news.categories.length === 1) {
        return news.categories[0].name;
      } else {
        return news.categories.map(cat => cat.name).join(', ');
      }
    }
    return "Umum";
  };

  return (
    <article className="bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm rounded-lg overflow-hidden transform hover:scale-[1.01] hover:shadow-md duration-300">
      <div className="relative h-40 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={news.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/img/kesehatan.jpg";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-1">
          {getDescription()}
        </p>
        <p className="text-xs text-gray-500 mb-1">
          Diposting oleh {news.author || "Admin Kecamatan"} pada {formatTanggal(news.published_at)}
        </p>
        <p className="text-xs text-blue-600 font-medium mb-3">
          Kategori: {getCategoriesText()}
        </p>
        <Link
          href={`/berita/${news.slug}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow hover:from-blue-500 hover:to-blue-700 transition-all duration-300 group"
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
        // Filter hanya berita yang sudah dipublish
        const publishedNews = data.filter(item => item.status === 'published');
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
    <div className="bg-blue-50 rounded-lg overflow-hidden animate-pulse">
      <div className="h-40 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded-full w-32"></div>
      </div>
    </div>
  );

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Berita Terbaru
      </h1>

      {/* Loading state */}
      {loading && (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: perPage }).map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </section>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Terjadi Kesalahan</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchNews}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && news.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Belum Ada Berita</h3>
          <p className="text-gray-600">Berita akan ditampilkan di sini setelah admin memublikasikannya.</p>
        </div>
      )}

      {/* Grid berita */}
      {!loading && !error && paginatedNews.length > 0 && (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedNews.map((newsItem) => (
            <NewsCard key={newsItem.id} news={newsItem} />
          ))}
        </section>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="mt-12 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm rounded-md transition border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
};

export default BeritaPage;