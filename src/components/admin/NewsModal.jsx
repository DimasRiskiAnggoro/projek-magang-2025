// src/components/admin/NewsModal.jsx
"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function NewsModal({ news, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    source_url: '',
    published_at: '',
    author: '',
    category: '',
    status: 'draft',
  });
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (news) {
      const publishedDate = news.published_at ? new Date(news.published_at).toISOString().slice(0, 16) : '';
      setFormData({
        title: news.title || '',
        content: news.content || '',
        excerpt: news.excerpt || '',
        slug: news.slug || '',
        source_url: news.source_url || '',
        published_at: publishedDate,
        author: news.author || '',
        category: news.category || '',
        status: news.status || 'draft',
      });
    }
  }, [news]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'image') setImageFile(files[0]);
    if (name === 'pdf') setPdfFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const token = Cookies.get('auth_token');
    const isEditing = !!news;
    const url = isEditing 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/news/${news.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/news`;
    
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });
    if (imageFile) submissionData.append('image', imageFile);
    if (pdfFile) submissionData.append('pdf', pdfFile);
    if (isEditing) submissionData.append('_method', 'PUT');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: submissionData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Gagal menyimpan data.');
      }

      onSave();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ===================================================================
  // PERBAIKAN DI SINI: Ganti warna background dark mode
  // ===================================================================
  const inputClass = "w-full p-2 border rounded bg-gray-50 dark:bg-[#1E293B] dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="themed-card p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">{news ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Judul */}
            <div className="md:col-span-2">
              <label className="block mb-1">Judul</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} required />
            </div>
            {/* Konten */}
            <div className="md:col-span-2">
              <label className="block mb-1">Konten</label>
              <textarea name="content" value={formData.content} onChange={handleChange} className={inputClass} rows="6" required></textarea>
            </div>
            {/* Ringkasan (Excerpt) */}
            <div className="md:col-span-2">
              <label className="block mb-1">Ringkasan (Excerpt)</label>
              <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} className={inputClass} rows="3"></textarea>
            </div>
            {/* Slug */}
            <div>
              <label className="block mb-1">Slug</label>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} className={inputClass} placeholder="Otomatis jika kosong" />
            </div>
            {/* Sumber URL */}
            <div>
              <label className="block mb-1">URL Sumber</label>
              <input type="url" name="source_url" value={formData.source_url} onChange={handleChange} className={inputClass} placeholder="https://..." />
            </div>
            {/* Penulis & Kategori */}
            <div>
              <label className="block mb-1">Penulis</label>
              <input type="text" name="author" value={formData.author} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block mb-1">Kategori</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className={inputClass} />
            </div>
            {/* Tanggal & Status */}
            <div>
              <label className="block mb-1">Tanggal Publikasi</label>
              <input type="datetime-local" name="published_at" value={formData.published_at} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            {/* File Image & PDF */}
            <div>
              <label className="block mb-1">Gambar Cover</label>
              <input type="file" name="image" onChange={handleFileChange} className={inputClass} accept="image/*" />
            </div>
            <div>
              <label className="block mb-1">File PDF (Opsional)</label>
              <input type="file" name="pdf" onChange={handleFileChange} className={inputClass} accept=".pdf" />
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-500 transition"
          >
            Batal
          </button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300">
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
