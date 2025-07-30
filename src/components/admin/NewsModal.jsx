"use client";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { X, Plus } from 'lucide-react';

export default function NewsModal({ news, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    source_url: '',
    published_at: '',
    author: '',
    status: 'draft',
  });
  
  const [categories, setCategories] = useState(['']); // Array of categories
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [allCategories, setAllCategories] = useState([]); // For autocomplete suggestions

  // Fetch all existing categories for suggestions
  useEffect(() => {
    const fetchCategories = async () => {
      const token = Cookies.get('auth_token');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/categories`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        const data = await response.json();
        setAllCategories(data.categories || []);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchCategories();
  }, []);

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
        status: news.status || 'draft',
      });
      
      // Set categories array
      if (news.category && Array.isArray(news.category) && news.category.length > 0) {
        setCategories(news.category);
      } else {
        setCategories(['']);
      }
    } else {
      // Reset for new news
      setCategories(['']);
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

  // Handle category changes
  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  // Add new category input
  const addCategoryInput = () => {
    if (categories.length < 10) { // Limit to 10 categories
      setCategories([...categories, '']);
    }
  };

  // Remove category input
  const removeCategoryInput = (index) => {
    if (categories.length > 1) {
      const newCategories = categories.filter((_, i) => i !== index);
      setCategories(newCategories);
    }
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
    
    // Add form data
    Object.keys(formData).forEach(key => {
      submissionData.append(key, formData[key]);
    });
    
    // Add categories (filter out empty ones)
    const validCategories = categories.filter(cat => cat.trim() !== '');
    validCategories.forEach((category, index) => {
      submissionData.append(`categories[${index}]`, category.trim());
    });
    
    // Add files
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

  const inputClass = "w-full p-2 border rounded bg-gray-50 dark:bg-[#1E293B] dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="themed-card p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{news ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Judul */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Judul <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                className={inputClass} 
                required 
                placeholder="Masukkan judul berita"
              />
            </div>

            {/* Konten */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Konten <span className="text-red-500">*</span></label>
              <textarea 
                name="content" 
                value={formData.content} 
                onChange={handleChange} 
                className={inputClass} 
                rows="6" 
                required
                placeholder="Tulis konten berita di sini..."
              ></textarea>
            </div>

            {/* Ringkasan (Excerpt) */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Ringkasan (Excerpt)</label>
              <textarea 
                name="excerpt" 
                value={formData.excerpt} 
                onChange={handleChange} 
                className={inputClass} 
                rows="3"
                placeholder="Ringkasan singkat tentang berita ini..."
              ></textarea>
            </div>

            {/* Categories Section */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Kategori</label>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => handleCategoryChange(index, e.target.value)}
                      className={inputClass}
                      placeholder="Masukkan kategori..."
                      list="category-suggestions"
                    />
                    {categories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCategoryInput(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Hapus kategori"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
                {categories.length < 10 && (
                  <button
                    type="button"
                    onClick={addCategoryInput}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-700 text-sm"
                  >
                    <Plus size={16} />
                    Tambah Kategori
                  </button>
                )}
              </div>
              
              {/* Datalist untuk autocomplete suggestions */}
              <datalist id="category-suggestions">
                {allCategories.map((cat, index) => (
                  <option key={index} value={cat} />
                ))}
              </datalist>
            </div>

            {/* Slug */}
            <div>
              <label className="block mb-1 font-medium">Slug</label>
              <input 
                type="text" 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                className={inputClass} 
                placeholder="akan-dibuat-otomatis-jika-kosong" 
              />
              <small className="text-gray-500 text-xs">Kosongkan untuk membuat otomatis dari judul</small>
            </div>

            {/* Sumber URL */}
            <div>
              <label className="block mb-1 font-medium">URL Sumber</label>
              <input 
                type="url" 
                name="source_url" 
                value={formData.source_url} 
                onChange={handleChange} 
                className={inputClass} 
                placeholder="https://contoh.com/sumber-berita" 
              />
            </div>

            {/* Penulis */}
            <div>
              <label className="block mb-1 font-medium">Penulis</label>
              <input 
                type="text" 
                name="author" 
                value={formData.author} 
                onChange={handleChange} 
                className={inputClass} 
                placeholder="Nama penulis"
              />
            </div>

            {/* Tanggal Publikasi */}
            <div>
              <label className="block mb-1 font-medium">Tanggal Publikasi</label>
              <input 
                type="datetime-local" 
                name="published_at" 
                value={formData.published_at} 
                onChange={handleChange} 
                className={inputClass} 
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                className={inputClass}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* File Image */}
            <div>
              <label className="block mb-1 font-medium">Gambar Cover</label>
              <input 
                type="file" 
                name="image" 
                onChange={handleFileChange} 
                className={inputClass} 
                accept="image/*" 
              />
              {news?.image_url && (
                <div className="mt-2">
                  <img 
                    src={news.image_url} 
                    alt="Current" 
                    className="h-20 w-32 object-cover rounded border"
                  />
                  <small className="text-gray-500 text-xs block">Gambar saat ini</small>
                </div>
              )}
            </div>

            {/* File PDF */}
            <div>
              <label className="block mb-1 font-medium">File PDF (Opsional)</label>
              <input 
                type="file" 
                name="pdf" 
                onChange={handleFileChange} 
                className={inputClass} 
                accept=".pdf" 
              />
              {news?.pdf_url && (
                <div className="mt-2">
                  <a 
                    href={news.pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    📄 PDF saat ini
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6 pt-4 border-t dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition disabled:opacity-50"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isLoading} 
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}