"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Tipe data berita detail sesuai struktur admin
type NewsDetail = {
  id: number;
  title: string;
  excerpt?: string;
  slug: string;
  author?: string;
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
    urutan?: number;
  }>;
  contents: Array<{
    id: number;
    type: string;
    content: string;
    urutan?: number;
  }>;
  pdfs: Array<{
    id: number;
    path: string;
    title?: string;
    description?: string;
    original_name?: string;
    file_size?: number;
    urutan?: number;
  }>;
};

// Format tanggal Indonesia
const formatTanggal = (tanggal: string) => {
  if (!tanggal) return '';
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    weekday: 'long',
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Format ukuran file
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const NewsDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch detail berita berdasarkan slug
  const fetchNewsDetail = async () => {
    if (!slug) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Gunakan endpoint showBySlug jika ada, atau fallback ke method lama
      let response;
      try {
        // Coba endpoint showBySlug terlebih dahulu
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/slug/${slug}`, {
          headers: {
            'Accept': 'application/json',
          },
        });
      } catch (slugError) {
        // Fallback ke method lama jika endpoint slug tidak ada
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
          headers: {
            'Accept': 'application/json',
          },
        });
      }

      if (!response.ok) {
        throw new Error('Gagal mengambil data berita');
      }

      const data = await response.json();

      // Jika menggunakan endpoint slug, data langsung merupakan berita
      if (data.slug === slug) {
        if (data.status !== 'published') {
          throw new Error('Berita tidak ditemukan atau belum dipublikasikan');
        }
        setNews(data);
      } 
      // Jika menggunakan method lama (array berita)
      else if (Array.isArray(data)) {
        const foundNews = data.find(item => item.slug === slug && item.status === 'published');
        
        if (!foundNews) {
          throw new Error('Berita tidak ditemukan atau belum dipublikasikan');
        }
        
        setNews(foundNews);
      } else {
        throw new Error('Format data tidak valid');
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsDetail();
  }, [slug]);

  const handleBack = () => {
    router.push('/berita');
  };

  // Filter gambar untuk konten (EXCLUDE thumbnail)
  const getContentImages = () => {
    if (!news?.images || news.images.length === 0) return [];
    
    // EXCLUDE gambar yang dijadikan thumbnail berdasarkan thumbnail_image_id
    return news.images.filter(img => {
      // Jika ada thumbnail_image_id yang diset, exclude gambar tersebut
      if (news.thumbnail_image_id && img.id === news.thumbnail_image_id) {
        return false; // Jangan tampilkan di konten
      }
      return true; // Tampilkan gambar lainnya
    }).sort((a, b) => (a.urutan || 0) - (b.urutan || 0)); // Sort berdasarkan urutan
  };

  // Loading state
  if (loading) {
    return (
      <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !news) {
    return (
      <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Berita Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6">{error || 'Berita tidak ditemukan'}</p>
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

  // Gabungkan dan urutkan semua konten berdasarkan urutan (EXCLUDE gambar thumbnail)
  const contentImages = getContentImages(); // Sudah exclude thumbnail dan sorted
  const allContent = [
    ...contentImages.map(img => ({ ...img, type: 'image', order: img.urutan || 0 })),
    ...news.contents.map(content => ({ ...content, order: content.urutan || 0 })),
    ...news.pdfs.map(pdf => ({ ...pdf, type: 'pdf', order: pdf.urutan || 0 }))
  ].sort((a, b) => a.order - b.order);

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
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

        {/* Header artikel */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {news.title}
          </h1>
          
          {/* Meta informasi */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 border-b pb-4">
            {news.author && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {news.author}
              </span>
            )}
            
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formatTanggal(news.published_at)}
            </span>

            {news.categories && news.categories.length > 0 && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div className="flex gap-2">
                  {news.categories.map(cat => (
                    <span key={cat.id} className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Excerpt */}
          {news.excerpt && (
            <div className="text-lg text-gray-700 leading-relaxed mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="font-medium text-blue-800 mb-2">Ringkasan</p>
              <p>{news.excerpt}</p>
            </div>
          )}
        </header>

        {/* Konten artikel - TANPA gambar thumbnail */}
        <article className="space-y-6">
          {allContent.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Tidak ada konten untuk ditampilkan.</p>
            </div>
          ) : (
            allContent.map((item, index) => {
              // Render gambar konten (yang BUKAN thumbnail)
              if ('type' in item && item.type === 'image') {
                const imageItem = item as typeof news.images[0] & { type: string };
                return (
                  <figure key={`image-${imageItem.id}-${index}`} className="mb-8">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${imageItem.path}`}
                      alt={imageItem.caption || news.title}
                      className="w-full rounded-lg shadow-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/img/kesehatan.jpg';
                      }}
                    />
                    {imageItem.caption && (
                      <figcaption className="text-center text-gray-600 text-sm mt-3 italic">
                        {imageItem.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              // Render PDF
              if ('type' in item && item.type === 'pdf') {
                const pdfItem = item as typeof news.pdfs[0] & { type: string };
                return (
                  <div key={`pdf-${pdfItem.id}-${index}`} className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                          {pdfItem.title || pdfItem.original_name || 'Dokumen PDF'}
                        </h4>
                        
                        {pdfItem.description && (
                          <p className="text-gray-600 mb-2">{pdfItem.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          {pdfItem.file_size && (
                            <span>Ukuran: {formatFileSize(pdfItem.file_size)}</span>
                          )}
                          <span>Format: PDF</span>
                        </div>
                        
                        <div className="flex gap-3">
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${pdfItem.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Lihat PDF
                          </a>
                          
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${pdfItem.path}`}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Render content (heading/paragraph)
              if ('content' in item) {
                const contentItem = item as typeof news.contents[0];
                
                if (contentItem.type === 'heading') {
                  return (
                    <h2 key={`content-${contentItem.id}-${index}`} className="text-2xl font-bold text-gray-800 mb-4 mt-8">
                      {contentItem.content}
                    </h2>
                  );
                }
                
                if (contentItem.type === 'paragraph') {
                  return (
                    <div 
                      key={`content-${contentItem.id}-${index}`}
                      className="text-gray-700 leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ __html: contentItem.content }}
                    />
                  );
                }
              }

              return null;
            })
          )}
        </article>

        {/* Link sumber jika ada */}
        {news.source_url && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-600 mb-2">Sumber:</p>
            <a 
              href={news.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm break-all"
            >
              {news.source_url}
            </a>
          </div>
        )}

        {/* Tombol kembali */}
        <div className="mt-12 pt-8 border-t">
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Kembali ke Daftar Berita
          </button>
        </div>
      </div>
    </main>
  );
};

export default NewsDetailPage;