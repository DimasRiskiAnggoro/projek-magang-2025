// src/app/admin/berita/page.jsx
"use client";

import { useEffect, useState } from 'react';
import NewsModal from '@/components/admin/NewsModal';
import Cookies from 'js-cookie';
import { Plus, Edit, Trash2, FileText, Link as LinkIcon, Image, Star } from 'lucide-react';

export default function BeritaPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    const token = Cookies.get('auth_token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (Array.isArray(data)) {
        setNews(data);
      } else if (data.data && Array.isArray(data.data)) {
        setNews(data.data);
      } else {
        console.error("Respons API bukan array yang valid:", data);
        setNews([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleOpenModal = (newsItem = null) => {
    setEditingNews(newsItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNews(null);
  };

  const handleSave = () => {
    handleCloseModal();
    fetchNews();
  };

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      const token = Cookies.get('auth_token');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        fetchNews();
      } catch (error) {
        console.error("Gagal menghapus berita:", error);
        alert("Gagal menghapus berita. Silakan coba lagi.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const renderCategories = (categories) => {
    if (!categories || categories.length === 0) {
      return '-';
    }
    
    return (
      <div className="flex flex-wrap gap-1">
        {categories.map((cat) => (
          <span key={cat.id} className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {cat.name}
          </span>
        ))}
      </div>
    );
  };

  // Get thumbnail image for display
  const getThumbnailImage = (item) => {
    // If there's a specific thumbnail image set
    if (item.thumbnail_image && item.thumbnail_image.path) {
      return `${process.env.NEXT_PUBLIC_API_URL}/storage/${item.thumbnail_image.path}`;
    }
    
    // Fall back to first image if available
    if (item.images && item.images.length > 0) {
      return `${process.env.NEXT_PUBLIC_API_URL}/storage/${item.images[0].path}`;
    }
    
    // Default placeholder
    return 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image';
  };

  // Check if item has thumbnail set
  const hasThumbnail = (item) => {
    return item.thumbnail_image_id && item.images && item.images.some(img => img.id === item.thumbnail_image_id);
  };

  return (
    <>
      <div className="themed-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl text-gray-900 dark:text-white">
            Manajemen Berita
          </h2>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> 
            Tambah Berita
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Memuat data...</span>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada berita yang tersedia</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border-collapse">
              <thead className="themed-table-head">
                <tr>
                  <th className="w-[8%] text-left py-3 px-4 font-semibold">Gambar</th>
                  <th className="w-[15%] text-left py-3 px-4 font-semibold">Judul</th>
                  <th className="w-[15%] text-left py-3 px-4 font-semibold">Ringkasan</th>
                  <th className="w-[8%] text-left py-3 px-4 font-semibold">Penulis</th>
                  <th className="w-[12%] text-left py-3 px-4 font-semibold">Kategori</th>
                  <th className="w-[10%] text-left py-3 px-4 font-semibold">Slug</th>
                  <th className="w-[6%] text-left py-3 px-4 font-semibold">Status</th>
                  <th className="w-[4%] text-left py-3 px-4 font-semibold">PDF</th>
                  <th className="w-[4%] text-left py-3 px-4 font-semibold">Sumber</th>
                  <th className="w-[12%] text-left py-3 px-4 font-semibold">Tgl Publikasi</th>
                  <th className="w-[6%] text-left py-3 px-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 align-top">
                      <div className="relative">
                        <img 
                          src={getThumbnailImage(item)} 
                          alt={item.title || 'News image'} 
                          className="h-12 w-16 object-cover rounded border"
                          onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Error'; 
                          }}
                        />
                        {hasThumbnail(item) && (
                          <div className="absolute -top-1 -right-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" title="Thumbnail set" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-normal break-words align-top">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {item.title || 'Untitled'}
                      </div>
                      {item.views > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          👁️ {item.views} views
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-normal break-words text-sm text-gray-600 dark:text-gray-400 align-top">
                      <div className="line-clamp-3">
                        {item.excerpt || '-'}
                      </div>
                    </td>
                    <td className="py-3 px-4 align-top text-sm">
                      {item.author || '-'}
                    </td>
                    <td className="py-3 px-4 align-top">
                      {renderCategories(item.categories)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400 align-top">
                      <div className="truncate max-w-[120px]" title={item.slug}>
                        {item.slug || '-'}
                      </div>
                    </td>
                    <td className="py-3 px-4 align-top">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {item.status || 'draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center align-top">
                      {item.pdfs && item.pdfs.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {item.pdfs.map((pdf, index) => (
                            <a 
                              key={pdf.id || index}
                              href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${pdf.path}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-red-500 hover:text-red-700 inline-block" 
                              title={pdf.title || pdf.original_name || 'Download PDF'}
                            >
                              <FileText size={16} />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center align-top">
                      {item.source_url ? (
                        <a 
                          href={item.source_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:text-blue-700 inline-block" 
                          title="Buka Sumber"
                        >
                          <LinkIcon size={16} />
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 align-top">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(item.published_at)}
                      </div>
                    </td>
                    <td className="py-3 px-4 align-top">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleOpenModal(item)} 
                          className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" 
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" 
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Summary info */}
        {!loading && news.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <div>
              Total: {news.length} berita
            </div>
            <div>
              Published: {news.filter(item => item.status === 'published').length} | 
              Draft: {news.filter(item => item.status === 'draft').length}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <NewsModal
          news={editingNews}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  );
}