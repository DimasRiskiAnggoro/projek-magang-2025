"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Komponen untuk Animated Tech Background
const TechBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Circuit lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-30" viewBox="0 0 1200 600">
          <defs>
            <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M20 20h160M20 20v160M180 20v160M20 180h160" 
                    stroke="rgba(255,255,255,0.3)" 
                    strokeWidth="1" 
                    fill="none" />
              <circle cx="20" cy="20" r="3" fill="rgba(255,255,255,0.5)" />
              <circle cx="180" cy="20" r="3" fill="rgba(255,255,255,0.5)" />
              <circle cx="20" cy="180" r="3" fill="rgba(255,255,255,0.5)" />
              <circle cx="180" cy="180" r="3" fill="rgba(255,255,255,0.5)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        <div className="tech-lines opacity-20"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 via-transparent to-blue-600/20" />
    </div>
  );
};

// Type definitions
interface NewsCategory {
  id: number;
  name: string;
}

interface NewsImage {
  id: number;
  path: string;
  caption?: string;
  urutan?: number;
}

interface NewsContent {
  id: number;
  type: string;
  content: string;
  urutan?: number;
}

interface NewsPdf {
  id: number;
  path: string;
  title?: string;
  description?: string;
  original_name?: string;
  file_size?: number;
  urutan?: number;
}

interface NewsDetail {
  id: number;
  title: string;
  excerpt?: string;
  slug: string;
  author?: string;
  published_at: string;
  status: string;
  source_url?: string;
  thumbnail_image_id?: number;
  views?: number;
  categories: NewsCategory[];
  images: NewsImage[];
  contents: NewsContent[];
  pdfs: NewsPdf[];
}

// Format tanggal Indonesia
const formatTanggal = (tanggal: string): string => {
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
const formatFileSize = (bytes: number): string => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Komponen untuk render konten yang diformat
const FormattedContent: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;
  const cleanText = content.replace(/<[^>]*>/g, '');
  return (
    <div
      className="text-gray-700 leading-relaxed whitespace-pre-line"
      style={{ whiteSpace: 'pre-line' }}
    >
      {cleanText}
    </div>
  );
};

const NewsDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch detail berita
  useEffect(() => {
    const fetchNewsDetail = async (): Promise<void> => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/news/slug/${slug}`, 
          {
            headers: { 'Accept': 'application/json' },
          }
        );
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data berita');
        }
        
        const data: NewsDetail = await response.json();
        
        if (data.status !== 'published') {
          throw new Error('Berita tidak ditemukan atau belum dipublikasikan');
        }
        
        setNews(data);
      } catch (error) {
        console.error("Error fetching news detail:", error);
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [slug]);

  const handleBack = (): void => {
    router.push('/berita');
  };

  const getContentImages = (): NewsImage[] => {
    if (!news?.images || news.images.length === 0) return [];
    return news.images.filter(img => {
      if (news.thumbnail_image_id && img.id === news.thumbnail_image_id) {
        return false;
      }
      return true;
    }).sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    (e.target as HTMLImageElement).src = '/image/DINAS KOMUNIKASI DAN INFORMATIKA KOTA MADIUN.png';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Tech Header untuk Loading */}
        <div className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 pt-20 pb-16">
          <TechBackground />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded w-48 mb-8"></div>
              <div className="h-12 bg-white/20 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-white/20 rounded w-1/2"></div>
            </div>
          </div>
          {/* Tech decorations */}
          <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-lg rotate-45 opacity-60" />
          <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-white/30 rotate-12 opacity-40" />
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full opacity-50" />
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto animate-pulse">
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

  if (error || !news) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Tech Header untuk Error */}
        <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 pt-20 pb-16">
          <TechBackground />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>|</span>
                <Link href="/berita" className="hover:text-white transition-colors">Berita</Link>
                <span>|</span>
                <span className="text-white font-semibold">Error</span>
              </div>
            </nav>

            <div className="text-white text-6xl mb-4">⚠️</div>
            <h1 className="text-4xl font-bold text-white mb-4">Berita Tidak Ditemukan</h1>
            <p className="text-xl text-white/90 mb-6">{error || 'Berita tidak ditemukan'}</p>
            
            <button
              onClick={handleBack}
              className="px-8 py-4 bg-white text-red-600 font-bold border-2 border-white hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
              style={{ borderRadius: '0px' }}
            >
              Kembali ke Daftar Berita
            </button>
          </div>
          {/* Tech decorations */}
          <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-lg rotate-45 opacity-60" />
          <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-white/30 rotate-12 opacity-40" />
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full opacity-50" />
        </div>
      </main>
    );
  }

  const contentImages = getContentImages();
  const allContent = [
    ...contentImages.map(img => ({ ...img, type: 'image', order: img.urutan || 0 })),
    ...news.contents.map(content => ({ ...content, order: content.urutan || 0 })),
    ...news.pdfs.map(pdf => ({ ...pdf, type: 'pdf', order: pdf.urutan || 0 }))
  ].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Tech Header Section dengan info berita */}
      <div className="relative bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 pt-20 pb-16">
        <TechBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-sm text-white/80 flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/60">|</span>
              <Link href="/berita" className="hover:text-white transition-colors">Berita</Link>
              <span className="text-white/60">|</span>
              <span className="text-white font-semibold">Detail</span>
            </div>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {news.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
              {news.author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-sm flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">Oleh {news.author}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-sm flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">{formatTanggal(news.published_at)}</span>
              </div>

              {news.views && news.views > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-sm flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">{news.views} views</span>
                </div>
              )}
            </div>

            {/* Kategori Tags */}
            {news.categories && news.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {news.categories.map(cat => (
                  <Link 
                    key={cat.id} 
                    href={`/berita/kategori/${cat.id}`}
                    className="px-3 py-1.5 text-sm font-bold bg-white/20 text-white hover:bg-white hover:text-teal-700 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                    style={{ borderRadius: '0px' }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tech decorations */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-lg rotate-45 opacity-60" />
        <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-white/30 rotate-12 opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full opacity-50" />
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <nav className="mb-8">
            <button 
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 font-bold border-2 border-teal-200 hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              style={{ borderRadius: '0px' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Daftar Berita
            </button>
          </nav>

          <article className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            {allContent.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada konten untuk ditampilkan.</p>
              </div>
            ) : (
              allContent.map((item, index) => {
                if ('type' in item && item.type === 'image') {
                  const imageItem = item as NewsImage & { type: string };
                  return (
                    <figure key={`image-${imageItem.id}-${index}`} className="mb-8">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${imageItem.path}`}
                        alt={imageItem.caption || news.title}
                        className="w-full rounded-lg shadow-lg"
                        onError={handleImageError}
                      />
                      {imageItem.caption && (
                        <figcaption className="text-center text-gray-600 text-sm mt-3 italic">
                          {imageItem.caption}
                        </figcaption>
                      )}
                    </figure>
                  );  
                }

                if ('type' in item && item.type === 'pdf') {
                  const pdfItem = item as NewsPdf & { type: string };
                  return (
                    <div key={`pdf-${pdfItem.id}-${index}`} className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-red-100 border-2 border-red-200 flex items-center justify-center" style={{ borderRadius: '0px' }}>
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
                              download
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-bold border-2 border-blue-600 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                              style={{ borderRadius: '0px' }}
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

                if ('content' in item) {
                  const contentItem = item as NewsContent;
                  if (contentItem.type === 'heading') {
                    return (
                      <h2 key={`content-${contentItem.id}-${index}`} className="text-2xl font-bold text-gray-800 mb-4 mt-8">
                        {contentItem.content}
                      </h2>
                    );
                  }
                  if (contentItem.type === 'paragraph') {
                    return (
                      <div key={`content-${contentItem.id}-${index}`}>
                        <FormattedContent content={contentItem.content} />
                      </div>
                    );
                  }
                }
                return null;
              })
            )}

            {news.source_url && (
              <div className="mt-8 p-6 bg-teal-50 border-2 border-teal-200" style={{ borderRadius: '0px' }}>
                <p className="text-sm font-bold text-teal-700 mb-2">Sumber:</p>
                <a 
                  href={news.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-800 text-sm break-all underline"
                >
                  {news.source_url}
                </a>
              </div>
            )}
          </article>
        </div>
      </div>
      
      <style jsx>{`
        .tech-lines {
          background-image: 
            linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: moveLines 10s linear infinite;
        }

        @keyframes moveLines {
          0% {
            background-position: 0 0, 0 0;
          }
          100% {
            background-position: 20px 20px, -20px 20px;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
};

export default NewsDetailPage;