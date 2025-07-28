// src/app/admin/berita/page.jsx
"use client";

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import NewsModal from '@/components/admin/NewsModal';
import Cookies from 'js-cookie';
import { Plus, Edit, Trash2, FileText, Link as LinkIcon } from 'lucide-react';

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
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        fetchNews();
      } catch (error) {
        console.error("Gagal menghapus berita:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <AdminLayout>
      {/* Ganti dengan kelas .themed-card */}
      <div className="themed-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-2xl">Manajemen Berita</h2>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" /> Tambah Berita
          </button>
        </div>

        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <div className="overflow-x-auto">
            {/* Hapus bg-white dari tabel */}
            <table className="min-w-full table-fixed">
              {/* Ganti dengan kelas .themed-table-head */}
              <thead className="themed-table-head">
                <tr>
                  <th className="w-[5%] text-left py-3 px-4 font-semibold">Gambar</th>
                  <th className="w-[12%] text-left py-3 px-4 font-semibold">Judul</th>
                  <th className="w-[12%] text-left py-3 px-4 font-semibold">Ringkasan</th>
                  <th className="w-[8%] text-left py-3 px-4 font-semibold">Penulis</th>
                  <th className="w-[8%] text-left py-3 px-4 font-semibold">Kategori</th>
                  <th className="w-[8%] text-left py-3 px-4 font-semibold">Slug</th>
                  <th className="w-[8%] text-left py-3 px-4 font-semibold">Status</th>
                  <th className="w-[5%] text-left py-3 px-4 font-semibold">PDF</th>
                  <th className="w-[5%] text-left py-3 px-4 font-semibold">Sumber</th>
                  <th className="w-[12%] text-left py-3 px-4 font-semibold">Tgl Publikasi</th>
                  <th className="w-[5%] text-left py-3 px-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {news.map((item) => (
                  <tr key={item.id} className="border-b dark:border-slate-700">
                    <td className="py-3 px-4 align-top">
                      <img 
                        src={item.image_url || 'https://placehold.co/600x400/e2e8f0/e2e8f0?text=.'} 
                        alt={item.title} 
                        className="h-12 w-16 object-cover rounded"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/e2e8f0?text=.' }}
                      />
                    </td>
                    <td className="py-3 px-4 whitespace-normal break-words align-top">{item.title}</td>
                    <td className="py-3 px-4 whitespace-normal break-words text-sm text-gray-600 dark:text-gray-400 align-top">{item.excerpt || '-'}</td>
                    <td className="py-3 px-4 align-top">{item.author || '-'}</td>
                    <td className="py-3 px-4 align-top">
                      {item.category ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {item.category}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400 align-top">{item.slug}</td>
                    <td className="py-3 px-4 align-top">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center align-top">
                      {item.pdf_url ? (
                        <a href={item.pdf_url} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700 inline-block">
                          <FileText size={20} />
                        </a>
                      ) : ('-')}
                    </td>
                    <td className="py-3 px-4 text-center align-top">
                      {item.source_url ? (
                        <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 inline-block">
                          <LinkIcon size={20} />
                        </a>
                      ) : ('-')}
                    </td>
                    <td className="py-3 px-4 align-top">{formatDate(item.published_at)}</td>
                    <td className="py-3 px-4 align-top">
                      <div className="flex space-x-2">
                        <button onClick={() => handleOpenModal(item)} className="text-blue-500 hover:text-blue-700"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </AdminLayout>
  );
}