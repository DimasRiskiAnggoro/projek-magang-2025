"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Button, Typography, Card, CardBody } from "@material-tailwind/react";
import {
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

// Tipe data untuk setiap item berita yang diambil dari API.
interface NewsItem {
  id: number | string;
  title: string;
  content?: string;
  excerpt?: string;
  image_url?: string;
  source_url?: string;
  pdf_url?: string;
  author?: string;
  published_at?: string;
  status: 'published' | 'draft';
}

export function BlogPost() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  const fetchPublishedNews = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`);
      const data = await response.json() as NewsItem[];
      
      const publishedNews = data.filter(item => item.status === 'published');
      setNews(publishedNews);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublishedNews();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetElement = entry.target as HTMLElement;
            if (targetElement.dataset.index) {
              setVisibleItems(prev => new Set(prev).add(targetElement.dataset.index!));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const newsItems = document.querySelectorAll('[data-news-item]');
    newsItems.forEach((item) => observer.observe(item));

    return () => {
      newsItems.forEach((item) => observer.unobserve(item));
    };
  }, [news]);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const truncateText = (text: string | null | undefined, maxLength: number): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.target as HTMLImageElement;
      target.onerror = null; // Mencegah loop error jika gambar fallback juga gagal
      target.src = 'https://placehold.co/800x600/e2e8f0/64748b?text=Gambar+Tidak+Tersedia';
  };

  const headlineNews = news[0];
  const featuredNews = news.slice(1, 4);
  const sidebarNews = news.slice(4, 8);
  const bottomNews = news.slice(8, 12);

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 py-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 w-full">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <Typography variant="h4" className="text-center mt-4" color="blue-gray">
            Memuat berita terbaru...
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 py-20">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 w-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-50 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

        <div className="text-center mb-12 relative z-10 border-b-4 border-gray-900 pb-6">
          <div className="inline-block mb-4">
            <Button color="gray" className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gray-900 text-white font-bold px-6 py-2" size="sm">
              BERITA HARIAN
            </Button>
          </div>
          <Typography variant="h2" className="text-center mb-2 font-black text-gray-900 tracking-tight" style={{ fontFamily: 'serif' }}>
            KOMINFO MADIUN
          </Typography>
          <Typography variant="small" className="text-center font-normal text-gray-600 uppercase tracking-widest">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            {headlineNews && (
              <div
                data-news-item data-index="headline"
                className={`mb-8 transform transition-all duration-700 ease-out ${visibleItems.has('headline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                onMouseEnter={() => setHoveredItem('headline')} onMouseLeave={() => setHoveredItem(null)}
              >
                <Card shadow={false} className={`p-0 transition-all duration-500 hover:shadow-xl rounded-none border-b-2 border-gray-900 ${hoveredItem === 'headline' ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-white'}`}>
                  <CardBody className="p-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className={`overflow-hidden transition-all duration-500 ${hoveredItem === 'headline' ? 'shadow-xl' : 'shadow-lg'}`}>
                        <Image
                          width={800} height={600}
                          src={headlineNews.image_url || '/placeholder.jpg'}
                          className={`w-full h-[300px] object-cover transition-all duration-700 ${hoveredItem === 'headline' ? 'scale-105' : 'scale-100'}`}
                          alt={headlineNews.title}
                          onError={handleImageError}
                        />
                      </div>
                      
                      <div className="flex flex-col justify-between">
                        <div>
                          <Typography variant="small" className="text-red-600 font-bold uppercase tracking-widest mb-2">
                            BERITA UTAMA
                          </Typography>
                          <Typography variant="h2" className={`font-black text-gray-900 mb-4 leading-tight cursor-pointer transition-all duration-300 ${hoveredItem === 'headline' ? 'text-blue-600' : 'hover:text-blue-600'}`} style={{ fontFamily: 'serif' }} onClick={() => window.open(headlineNews.source_url || '#', '_blank')}>
                            {truncateText(headlineNews.title, 120)}
                          </Typography>
                          <Typography className="text-lg text-gray-700 mb-4 leading-relaxed" style={{ fontFamily: 'serif' }}>
                            {truncateText(headlineNews.excerpt || headlineNews.content, 250)}
                          </Typography>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {(headlineNews.author || 'Admin')[0].toUpperCase()}
                            </div>
                            <div>
                              <Typography className="font-bold text-sm text-gray-900">{headlineNews.author || 'Admin'}</Typography>
                              <Typography className="text-xs text-gray-600">{formatDate(headlineNews.published_at)}</Typography>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {headlineNews.pdf_url && (<a href={headlineNews.pdf_url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-bold px-3 py-1 border border-red-600 hover:bg-red-50 transition-all duration-300"><DocumentTextIcon className="w-4 h-4" />PDF</a>)}
                            {headlineNews.source_url && (<a href={headlineNews.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-bold px-3 py-1 border border-blue-600 hover:bg-blue-50 transition-all duration-300"><ArrowTopRightOnSquareIcon className="w-4 h-4" />BACA SELENGKAPNYA</a>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {featuredNews.map((item, idx) => (
                <div key={item.id} data-news-item data-index={`featured-${idx}`} className={`transform transition-all duration-700 ease-out ${visibleItems.has(`featured-${idx}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${idx * 150}ms` }} onMouseEnter={() => setHoveredItem(`featured-${idx}`)} onMouseLeave={() => setHoveredItem(null)}>
                  <Card shadow={false} className={`p-0 transition-all duration-500 hover:shadow-lg rounded-none border-r border-gray-300 pr-4 ${hoveredItem === `featured-${idx}` ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-white'}`}>
                    <CardBody className="p-0">
                      <div className={`w-full mb-3 h-[150px] overflow-hidden ${hoveredItem === `featured-${idx}` ? 'shadow-lg' : 'shadow-md'}`}>
                        <Image width={400} height={300} src={item.image_url || '/placeholder.jpg'} className={`w-full object-cover h-full transition-all duration-700 ${hoveredItem === `featured-${idx}` ? 'scale-110' : 'scale-100'}`} alt={item.title} onError={handleImageError}/>
                      </div>
                      <Typography variant="h6" className={`font-bold text-gray-900 mb-2 leading-tight cursor-pointer transition-all duration-300 ${hoveredItem === `featured-${idx}` ? 'text-blue-600' : 'hover:text-blue-600'}`} style={{ fontFamily: 'serif' }} onClick={() => window.open(item.source_url || '#', '_blank')}>
                        {truncateText(item.title, 80)}
                      </Typography>
                      <Typography className="text-sm text-gray-600 mb-3 leading-relaxed">{truncateText(item.excerpt || item.content, 120)}</Typography>
                      <Typography className="text-xs text-gray-500 font-medium">{item.author || 'Admin'} • {formatDate(item.published_at)}</Typography>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 border-l-2 border-gray-900 pl-6">
            <div className="mb-6">
              <Typography variant="h4" className="font-black text-gray-900 mb-4 border-b-2 border-gray-300 pb-2" style={{ fontFamily: 'serif' }}>BERITA LAINNYA</Typography>
            </div>
            
            {sidebarNews.map((item, idx) => (
              <div key={item.id} data-news-item data-index={`sidebar-${idx}`} className={`mb-6 pb-4 border-b border-gray-200 transform transition-all duration-700 ease-out ${visibleItems.has(`sidebar-${idx}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${300 + idx * 150}ms` }} onMouseEnter={() => setHoveredItem(`sidebar-${idx}`)} onMouseLeave={() => setHoveredItem(null)}>
                <Card shadow={false} className={`p-0 transition-all duration-500 ${hoveredItem === `sidebar-${idx}` ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-white'}`}>
                  <CardBody className="p-0">
                    <div className="flex gap-3">
                      <div className={`w-20 h-16 flex-shrink-0 overflow-hidden ${hoveredItem === `sidebar-${idx}` ? 'shadow-md' : ''}`}>
                        <Image width={200} height={150} src={item.image_url || '/placeholder.jpg'} className={`w-full h-full object-cover transition-all duration-700 ${hoveredItem === `sidebar-${idx}` ? 'scale-110' : 'scale-100'}`} alt={item.title} onError={handleImageError}/>
                      </div>
                      <div className="flex-1">
                        <Typography variant="h6" className={`font-bold text-gray-900 mb-1 leading-tight cursor-pointer transition-all duration-300 text-sm ${hoveredItem === `sidebar-${idx}` ? 'text-blue-600' : 'hover:text-blue-600'}`} style={{ fontFamily: 'serif' }} onClick={() => window.open(item.source_url || '#', '_blank')}>
                          {truncateText(item.title, 60)}
                        </Typography>
                        <Typography className="text-xs text-gray-600 mb-2">{truncateText(item.excerpt || item.content, 80)}</Typography>
                        <Typography className="text-xs text-gray-500">{formatDate(item.published_at)}</Typography>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {bottomNews.length > 0 && (
          <div className="mt-12 pt-8 border-t-2 border-gray-900">
            <Typography variant="h4" className="font-black text-gray-900 mb-6 text-center" style={{ fontFamily: 'serif' }}>BERITA TERKINI</Typography>
            <div className="grid md:grid-cols-4 gap-4">
              {bottomNews.map((item, idx) => (
                <div key={item.id} data-news-item data-index={`bottom-${idx}`} className={`transform transition-all duration-700 ease-out ${visibleItems.has(`bottom-${idx}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${600 + idx * 100}ms` }} onMouseEnter={() => setHoveredItem(`bottom-${idx}`)} onMouseLeave={() => setHoveredItem(null)}>
                  <Card shadow={false} className={`p-0 transition-all duration-500 hover:shadow-lg rounded-none ${hoveredItem === `bottom-${idx}` ? 'bg-gradient-to-br from-blue-50 to-white transform -translate-y-1' : 'bg-white'}`}>
                    <CardBody className="p-3">
                      <Typography variant="h6" className={`font-bold text-gray-900 mb-2 leading-tight cursor-pointer transition-all duration-300 text-sm ${hoveredItem === `bottom-${idx}` ? 'text-blue-600' : 'hover:text-blue-600'}`} style={{ fontFamily: 'serif' }} onClick={() => window.open(item.source_url || '#', '_blank')}>
                        {truncateText(item.title, 60)}
                      </Typography>
                      <Typography className="text-xs text-gray-600 mb-2">{truncateText(item.excerpt || item.content, 80)}</Typography>
                      <Typography className="text-xs text-gray-500">{item.author || 'Admin'} • {formatDate(item.published_at)}</Typography>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <a href="/berita" className="group flex items-center gap-2 bg-gray-900 text-white px-6 py-3 font-bold uppercase tracking-wider text-sm hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span>LIHAT SEMUA BERITA</span>
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {news.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentTextIcon className="w-8 h-8 text-gray-400" />
            </div>
            <Typography variant="h5" color="gray" style={{ fontFamily: 'serif' }}>Belum ada berita yang dipublikasikan</Typography>
            <Typography variant="small" color="gray" className="mt-2">Silakan kembali lagi nanti untuk berita terbaru</Typography>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogPost;