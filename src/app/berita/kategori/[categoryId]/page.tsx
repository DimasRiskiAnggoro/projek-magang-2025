"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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
    urutan?: number;
  }>;
};

type Category = {
  id: number;
  name: string;
  description?: string;
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

// Fungsi untuk mendapatkan gambar thumbnail
const getThumbnailImage = (newsItem: NewsItem) => {
  if (!newsItem.images || newsItem.images.length === 0) {
    return '/image/DINAS KOMUNIKASI DAN INFORMATIKA KOTA MADIUN.png';
  }

  // Cari gambar berdasarkan thumbnail_image_id
  if (newsItem.thumbnail_image_id) {
    const thumbnailImage = newsItem.images.find(img => img.id === newsItem.thumbnail_image_id);
    if (thumbnailImage) {
      return `${process.env.NEXT_PUBLIC_API_URL}/storage/${thumbnailImage.path}`;
    }
  }

  // Jika tidak ada thumbnail_image_id atau tidak ditemukan, gunakan gambar pertama
  const firstImage = newsItem.images.find(img => img.urutan === 1) || newsItem.images[0];
  return firstImage ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${firstImage.path}` : '/image/DINAS KOMUNIKASI DAN INFORMATIKA KOTA MADIUN.png';
};

const CategoryPage = () => {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 12;

  // Fetch kategori dan berita berdasarkan kategori
  const fetchCategoryAndNews = async (pageNum: number = 1, append: boolean = false) => {
    if (!categoryId) return;
    
    if (!append) {
      setLoading(true);
      setError(null);
    }
    
    try {
      // Fetch semua berita terlebih dahulu
      const newsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!newsResponse.ok) {
        throw new Error('Gagal mengambil data berita');
      }

      const allNews = await newsResponse.json();
      
      // Filter berita berdasarkan kategori dan status published
      const filteredNews = allNews.filter((newsItem: NewsItem) => 
        newsItem.status === 'published' && 
        newsItem.categories.some(cat => cat.id === parseInt(categoryId))
      );

      // Urutkan berdasarkan tanggal terbaru
      const sortedNews = filteredNews.sort((a: NewsItem, b: NewsItem) => 
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );

      // Implementasi pagination
      const startIndex = (pageNum - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedNews = sortedNews.slice(0, endIndex);

      // Set data kategori dari berita pertama yang ditemukan
      if (sortedNews.length > 0) {
        const categoryData = sortedNews[0].categories.find((cat: { id: number; }) => cat.id === parseInt(categoryId));
        if (categoryData) {
          setCategory(categoryData);
        }
      }

      if (append) {
        setNews(prev => [...prev, ...paginatedNews.slice(startIndex)]);
      } else {
        setNews(paginatedNews);
      }

      // Check apakah masih ada data untuk page selanjutnya
      setHasMore(endIndex < sortedNews.length);
      
    } catch (error) {
      console.error("Error fetching category and news:", error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryAndNews(1, false);
  }, [categoryId]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCategoryAndNews(nextPage, true);
  };

  const handleBack = () => {
    router.push('/berita');
  };

  // Loading state
  if (loading && news.length === 0) {
    return (
      <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Kategori Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke Daftar Berita
            </button>
          </div>
        </div>
      </main>
    );
  }

  // No news found state
  if (!loading && news.length === 0) {
    return (
      <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <button 
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Daftar Berita
            </button>
          </nav>

          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Belum Ada Berita untuk Kategori {category?.name || 'Ini'}
            </h2>
            <p className="text-gray-600 mb-6">Silakan periksa kategori lain atau kembali nanti.</p>
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke Daftar Berita
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Berita
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Kategori</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{category?.name || 'Loading...'}</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Kategori: {category?.name || 'Loading...'}
              </h1>
              <p className="text-gray-600 mt-1">
                {news.length} berita ditemukan
              </p>
            </div>
          </div>
          
          {category?.description && (
            <p className="text-gray-700 max-w-3xl">{category.description}</p>
          )}
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {news.map((newsItem) => (
            <article key={newsItem.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={getThumbnailImage(newsItem)}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/image/DINAS KOMUNIKASI DAN INFORMATIKA KOTA MADIUN.png';
                  }}
                />
              </div>
              
              <div className="p-6">
                {/* Kategori Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {newsItem.categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => router.push(`/berita/kategori/${cat.id}`)}
                      className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Judul */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                  <Link 
                    href={`/berita/${newsItem.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {newsItem.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                {newsItem.excerpt && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {newsItem.excerpt}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                  <div className="flex items-center gap-3">
                    {newsItem.author && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {newsItem.author}
                      </span>
                    )}
                    
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {formatTanggal(newsItem.published_at)}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/berita/${newsItem.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    Baca
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memuat...
                </div>
              ) : (
                'Muat Lebih Banyak'
              )}
            </button>
          </div>
        )}

        {/* No more data message */}
        {!hasMore && news.length > 0 && (
          <div className="text-center text-gray-600">
            <p>Semua berita telah ditampilkan</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;