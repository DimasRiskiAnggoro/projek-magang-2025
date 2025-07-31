"use client";

import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { X, Plus, Trash2, Image, FileText, Upload, Star, StarOff, MoveUp, MoveDown, Edit3 } from 'lucide-react';

export default function NewsModal({ news, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    slug: '',
    source_url: '',
    published_at: '',
    author: '',
    status: 'draft',
    category: '',
  });
 
  // Content blocks system
  const [contentBlocks, setContentBlocks] = useState([
    { id: 1, type: 'text', content: '', order: 1 }
  ]);
  
  const [thumbnailBlockId, setThumbnailBlockId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const fileInputRef = useRef(null);

  // Block ID counter
  const [nextBlockId, setNextBlockId] = useState(2);

  // Fetch categories
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

  // Parse existing content when editing
  useEffect(() => {
    if (news) {
      const publishedDate = news.published_at ? new Date(news.published_at).toISOString().slice(0, 16) : '';
      setFormData({
        title: news.title || '',
        excerpt: news.excerpt || '',
        slug: news.slug || '',
        source_url: news.source_url || '',
        published_at: publishedDate,
        author: news.author || '',
        status: news.status || 'draft',
        category: news.category || '',
      });
     
      // Parse existing content and images into blocks
      const blocks = [];
      let blockId = 1;
      
      // Add existing images as blocks
      if (news.images && Array.isArray(news.images)) {
        news.images.forEach((image, index) => {
          blocks.push({
            id: blockId++,
            type: 'image',
            file: null,
            existingImage: image,
            caption: '',
            order: index + 1
          });
        });
      }
      
      // Add content as text block
      if (news.content) {
        blocks.push({
          id: blockId++,
          type: 'text',
          content: news.content,
          order: blocks.length + 1
        });
      }
      
      // Add PDF if exists
      if (news.pdf_url) {
        blocks.push({
          id: blockId++,
          type: 'pdf',
          file: null,
          existingPdf: { url: news.pdf_url },
          title: 'Dokumen PDF',
          order: blocks.length + 1
        });
      }
      
      if (blocks.length === 0) {
        blocks.push({ id: 1, type: 'text', content: '', order: 1 });
      }
      
      setContentBlocks(blocks);
      setNextBlockId(blockId);
      
      // Set first image as thumbnail if exists
      const firstImageBlock = blocks.find(block => block.type === 'image');
      if (firstImageBlock) {
        setThumbnailBlockId(firstImageBlock.id);
      }
    } else {
      // Reset for new news
      setContentBlocks([{ id: 1, type: 'text', content: '', order: 1 }]);
      setNextBlockId(2);
      setThumbnailBlockId(null);
    }
  }, [news]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add new content block
  const addBlock = (type) => {
    const newBlock = {
      id: nextBlockId,
      type: type,
      order: contentBlocks.length + 1
    };

    if (type === 'text') {
      newBlock.content = '';
    } else if (type === 'image') {
      newBlock.file = null;
      newBlock.caption = '';
    } else if (type === 'pdf') {
      newBlock.file = null;
      newBlock.title = '';
    }

    setContentBlocks(prev => [...prev, newBlock]);
    setNextBlockId(prev => prev + 1);
  };

  // Remove block
  const removeBlock = (blockId) => {
    if (contentBlocks.length <= 1) return;
    
    setContentBlocks(prev => {
      const filtered = prev.filter(block => block.id !== blockId);
      // Reorder
      return filtered.map((block, index) => ({
        ...block,
        order: index + 1
      }));
    });

    // Reset thumbnail if deleted block was thumbnail
    if (thumbnailBlockId === blockId) {
      const remainingImageBlocks = contentBlocks.filter(block => 
        block.type === 'image' && block.id !== blockId
      );
      setThumbnailBlockId(remainingImageBlocks.length > 0 ? remainingImageBlocks[0].id : null);
    }
  };

  // Update block content
  const updateBlock = (blockId, updates) => {
    setContentBlocks(prev => 
      prev.map(block => 
        block.id === blockId ? { ...block, ...updates } : block
      )
    );
  };

  // Move block up/down
  const moveBlock = (blockId, direction) => {
    setContentBlocks(prev => {
      const blocks = [...prev];
      const index = blocks.findIndex(block => block.id === blockId);
      
      if (direction === 'up' && index > 0) {
        [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
      } else if (direction === 'down' && index < blocks.length - 1) {
        [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
      }
      
      // Update order
      return blocks.map((block, idx) => ({
        ...block,
        order: idx + 1
      }));
    });
  };

  // Handle file upload for blocks
  const handleBlockFileUpload = (blockId, file) => {
    updateBlock(blockId, { file: file });
  };

  // Set thumbnail
  const setThumbnail = (blockId) => {
    setThumbnailBlockId(blockId);
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
   
    // Add basic form data
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '') {
        submissionData.append(key, formData[key]);
      }
    });
    
    // Compile content from blocks
    let compiledContent = '';
    const imageFiles = [];
    const imagesToDelete = [];
    let pdfFile = null;
    
    contentBlocks.forEach((block, index) => {
      if (block.type === 'text') {
        compiledContent += block.content + '\n\n';
      } else if (block.type === 'image') {
        compiledContent += `[IMAGE_${index}]`;
        if (block.caption) {
          compiledContent += `[CAPTION: ${block.caption}]`;
        }
        compiledContent += '\n\n';
        
        if (block.file) {
          imageFiles.push({
            file: block.file,
            order: block.order,
            caption: block.caption || '',
            is_thumbnail: thumbnailBlockId === block.id ? 1 : 0
          });
        } else if (block.existingImage && isEditing) {
          // Keep existing image, update metadata
          submissionData.append(`existing_images[${index}][id]`, block.existingImage.id);
          submissionData.append(`existing_images[${index}][order]`, block.order);
          submissionData.append(`existing_images[${index}][caption]`, block.caption || '');
          submissionData.append(`existing_images[${index}][is_thumbnail]`, thumbnailBlockId === block.id ? 1 : 0);
        }
      } else if (block.type === 'pdf') {
        compiledContent += `[PDF: ${block.title || 'Dokumen PDF'}]\n\n`;
        if (block.file) {
          pdfFile = block.file;
        }
      }
    });
    
    // Remove extra newlines
    compiledContent = compiledContent.replace(/\n\n$/, '');
    submissionData.append('content', compiledContent);
    
    // Add image files
    imageFiles.forEach((imageData, index) => {
      submissionData.append(`images[${index}]`, imageData.file);
      submissionData.append(`image_orders[${index}]`, imageData.order);
      submissionData.append(`image_captions[${index}]`, imageData.caption);
      submissionData.append(`image_thumbnails[${index}]`, imageData.is_thumbnail);
    });
   
    // Add PDF file
    if (pdfFile) {
      submissionData.append('pdf', pdfFile);
    }
    
    // Method override for Laravel
    if (isEditing) {
      submissionData.append('_method', 'PUT');
    }

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
      <div className="bg-white dark:bg-slate-800 rounded-lg p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {news ? 'Edit Berita' : 'Tambah Berita Baru'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Meta Information */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Informasi Berita</h3>
              
              {/* Judul */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Judul <span className="text-red-500">*</span>
                </label>
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

              {/* Excerpt */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Ringkasan
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className={inputClass}
                  rows="3"
                  placeholder="Ringkasan singkat berita..."
                ></textarea>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Kategori
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Masukkan kategori..."
                  list="category-suggestions"
                />
                <datalist id="category-suggestions">
                  {allCategories.map((cat, index) => (
                    <option key={index} value={cat} />
                  ))}
                </datalist>
              </div>

              {/* Author */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Penulis
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Nama penulis"
                />
              </div>

              {/* Published Date */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Tanggal Publikasi
                </label>
                <input
                  type="datetime-local"
                  name="published_at"
                  value={formData.published_at}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
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

              {/* Slug */}
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="auto-generate-dari-judul"
                />
                <small className="text-gray-500 text-xs">Kosongkan untuk auto-generate</small>
              </div>

              {/* Source URL */}
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                  URL Sumber
                </label>
                <input
                  type="url"
                  name="source_url"
                  value={formData.source_url}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://sumber.com"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Content Editor */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Editor Konten</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => addBlock('text')}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    <Edit3 size={14} />
                    Teks
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('image')}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                  >
                    <Image size={14} />
                    Gambar
                  </button>
                  <button
                    type="button"
                    onClick={() => addBlock('pdf')}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    <FileText size={14} />
                    PDF
                  </button>
                </div>
              </div>

              {/* Content Blocks */}
              <div className="space-y-4">
                {contentBlocks.map((block, index) => (
                  <div key={block.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4 bg-white dark:bg-slate-800">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {block.type === 'text' && <Edit3 size={16} />}
                          {block.type === 'image' && <Image size={16} />}
                          {block.type === 'pdf' && <FileText size={16} />}
                          {block.type.toUpperCase()} #{block.order}
                        </span>
                        {block.type === 'image' && (
                          <button
                            type="button"
                            onClick={() => setThumbnail(block.id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                              thumbnailBlockId === block.id
                                ? 'bg-yellow-500 text-white'
                                : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-400'
                            }`}
                          >
                            {thumbnailBlockId === block.id ? <Star size={12} /> : <StarOff size={12} />}
                            {thumbnailBlockId === block.id ? 'Thumbnail' : 'Set Thumbnail'}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(block.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <MoveUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(block.id, 'down')}
                          disabled={index === contentBlocks.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <MoveDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(block.id)}
                          disabled={contentBlocks.length <= 1}
                          className="p-1 text-red-400 hover:text-red-600 disabled:opacity-30"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Text Block */}
                    {block.type === 'text' && (
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        className={inputClass}
                        rows="6"
                        placeholder="Tulis konten teks di sini..."
                      />
                    )}

                    {/* Image Block */}
                    {block.type === 'image' && (
                      <div>
                        {block.existingImage && !block.file ? (
                          <div className="mb-3">
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${block.existingImage.path}`}
                              alt="Existing"
                              className="w-full h-48 object-cover rounded border"
                            />
                            <p className="text-sm text-gray-500 mt-1">Gambar saat ini</p>
                          </div>
                        ) : block.file ? (
                          <div className="mb-3">
                            <img
                              src={URL.createObjectURL(block.file)}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded border"
                            />
                            <p className="text-sm text-gray-500 mt-1">Gambar baru</p>
                          </div>
                        ) : (
                          <div className="mb-3 border-2 border-dashed border-gray-300 dark:border-slate-500 rounded-lg p-6 text-center">
                            <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">Belum ada gambar dipilih</p>
                          </div>
                        )}
                        
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleBlockFileUpload(block.id, e.target.files[0])}
                          className={`${inputClass} mb-2`}
                        />
                        
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                          className={inputClass}
                          placeholder="Caption gambar (opsional)"
                        />
                      </div>
                    )}

                    {/* PDF Block */}
                    {block.type === 'pdf' && (
                      <div>
                        {block.existingPdf && !block.file ? (
                          <div className="mb-3 p-3 bg-gray-100 dark:bg-slate-600 rounded">
                            <div className="flex items-center gap-2">
                              <FileText size={20} />
                              <a
                                href={block.existingPdf.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                              >
                                PDF saat ini
                              </a>
                            </div>
                          </div>
                        ) : block.file ? (
                          <div className="mb-3 p-3 bg-gray-100 dark:bg-slate-600 rounded">
                            <div className="flex items-center gap-2">
                              <FileText size={20} />
                              <span className="text-sm">{block.file.name}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="mb-3 border-2 border-dashed border-gray-300 dark:border-slate-500 rounded-lg p-6 text-center">
                            <FileText size={32} className="mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">Belum ada PDF dipilih</p>
                          </div>
                        )}
                        
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handleBlockFileUpload(block.id, e.target.files[0])}
                          className={`${inputClass} mb-2`}
                        />
                        
                        <input
                          type="text"
                          value={block.title || ''}
                          onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                          className={inputClass}
                          placeholder="Judul dokumen PDF"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
         
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-600 dark:text-red-300">
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
            type="button"
            onClick={handleSubmit}
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
      </div>
    </div>
  );
}