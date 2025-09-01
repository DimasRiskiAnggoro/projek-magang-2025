"use client";

import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { X, Plus, Trash2, Image, FileText, Upload, Star, StarOff, MoveUp, MoveDown, Edit3, Hash, Link, Eye, Table } from 'lucide-react';

export default function NewsModal({ news, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    slug: '',
    source_url: '',
    published_at: '',
    author: '',
    status: 'draft',
  });
 
  const [contentBlocks, setContentBlocks] = useState([
    { id: 1, type: 'paragraph', content: '', order: 1 }
  ]);
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [thumbnailImageId, setThumbnailImageId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const fileInputRef = useRef(null);

  const [tables, setTables] = useState([]);
  const [deletingTables, setDeletingTables] = useState(new Set());
  const [activeTab, setActiveTab] = useState('content');

  const [nextBlockId, setNextBlockId] = useState(2);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [pdfsToDelete, setPdfsToDelete] = useState([]);
  const [contentsToDelete, setContentsToDelete] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = Cookies.get('auth_token');
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        });
        const data = await response.json();
        setAllCategories(data || []);
      } catch (error) { console.error("Gagal mengambil kategori:", error); }
    };
    fetchCategories();
  }, []);

  const fetchTables = async (newsId) => {
    const token = Cookies.get('auth_token');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsId}/tables`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
      });
      
      if (!response.ok) {
        console.error("Response tidak OK:", response.status);
        setTables([]);
        return;
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setTables(data);
      } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
        setTables(data.data);
      } else {
        console.warn("Data tabel bukan array:", data);
        setTables([]);
      }
    } catch (error) { 
      console.error("Gagal mengambil tabel:", error);
      setTables([]);
    }
  };

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
      });

      if (news.categories) {
        setSelectedCategories(news.categories.map(cat => cat.id));
      }

      setThumbnailImageId(news.thumbnail_image_id);
      
      const blocks = [];
      let blockId = 1;
      
      if (news.images && Array.isArray(news.images)) {
        news.images.forEach((image) => {
          blocks.push({ 
            id: blockId++, 
            type: 'image', 
            file: null, 
            existingImage: image, 
            caption: image.caption || '', 
            order: image.urutan,
            existingId: image.id,
            existingImageId: image.id
          });
        });
      }
      if (news.contents && Array.isArray(news.contents)) {
        news.contents.forEach((content) => {
          blocks.push({ 
            id: blockId++, 
            type: content.type, 
            content: content.content, 
            metadata: content.metadata || {}, 
            existingContentId: content.id, 
            order: content.urutan,
            existingId: content.id
          });
        });
      }
      if (news.pdfs && Array.isArray(news.pdfs)) {
        news.pdfs.forEach((pdf) => {
          blocks.push({ 
            id: blockId++, 
            type: 'pdf', 
            file: null, 
            existingPdf: pdf, 
            title: pdf.title || 'Dokumen PDF', 
            description: pdf.description || '', 
            order: pdf.urutan,
            existingId: pdf.id,
            display_mode: pdf.display_mode || 'link'
          });
        });
      }
      
      if (blocks.length === 0) {
        blocks.push({ id: 1, type: 'paragraph', content: '', order: 1 });
      }
      
      blocks.sort((a, b) => a.order - b.order);
      setContentBlocks(blocks);
      setNextBlockId(blockId);

      fetchTables(news.id);

    } else {
      setContentBlocks([{ id: 1, type: 'paragraph', content: '', order: 1 }]);
      setNextBlockId(2);
      setThumbnailImageId(null);
      setSelectedCategories([]);
      setImagesToDelete([]);
      setPdfsToDelete([]);
      setContentsToDelete([]);
      setTables([]);
      setDeletingTables(new Set());
    }
  }, [news]);

  const addTable = () => {
    setTables(prevTables => {
      const currentTables = Array.isArray(prevTables) ? prevTables : [];
      return [...currentTables, {
        id: Date.now(),
        nama_inovasi: '',
        uraian: '',
        link: '',
        urutan: currentTables.length + 1
      }];
    });
  };

  const updateTable = (index, field, value) => {
    setTables(prevTables => {
      if (!Array.isArray(prevTables)) {
        console.error("Tables bukan array:", prevTables);
        return [];
      }
      
      return prevTables.map((table, i) => 
        i === index ? { ...table, [field]: value } : table
      );
    });
  };

  const removeTable = async (index) => {
    const tableToRemove = tables[index];
    
    if (!confirm('Apakah Anda yakin ingin menghapus tabel ini?')) {
      return;
    }

    if (tableToRemove.id && typeof tableToRemove.id === 'number' && tableToRemove.id < 1000000) { // Cek ID yang valid dari DB
      try {
        setDeletingTables(prev => new Set(prev).add(tableToRemove.id));
        
        const token = Cookies.get('auth_token');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${news.id}/tables/${tableToRemove.id}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Accept': 'application/json'
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal menghapus tabel dari server');
        }
        
        setTables(prevTables => {
          if (!Array.isArray(prevTables)) return [];
          return prevTables.filter((_, i) => i !== index);
        });
        
      } catch (error) {
        console.error('Error menghapus tabel:', error);
        alert('Error menghapus tabel: ' + error.message);
      } finally {
        setDeletingTables(prev => {
          const newSet = new Set(prev);
          newSet.delete(tableToRemove.id);
          return newSet;
        });
      }
    } else {
      setTables(prevTables => {
        if (!Array.isArray(prevTables)) return [];
        return prevTables.filter((_, i) => i !== index);
      });
    }
  };

  const saveTables = async (newsId) => {
    const token = Cookies.get('auth_token');
    
    if (!Array.isArray(tables)) {
      console.error("Tables bukan array, tidak bisa menyimpan:", tables);
      return;
    }
    
    for (const table of tables) {
      try {
        if (deletingTables.has(table.id)) continue;
        
        // ID > 1000000 (timestamp) dianggap sebagai data baru
        if (table.id && typeof table.id === 'number' && table.id > 1000000) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsId}/tables`, {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`, 
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nama_inovasi: table.nama_inovasi,
              uraian: table.uraian,
              link: table.link,
              urutan: table.urutan
            }),
          });
          
          if (!response.ok) {
            console.error('Gagal menyimpan tabel:', await response.json());
          }
        } else if (table.id) { // Data yang sudah ada (update)
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsId}/tables/${table.id}`, {
            method: 'PUT',
            headers: { 
              'Authorization': `Bearer ${token}`, 
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nama_inovasi: table.nama_inovasi,
              uraian: table.uraian,
              link: table.link,
              urutan: table.urutan
            }),
          });
          
          if (!response.ok) {
            console.error('Gagal update tabel:', await response.json());
          }
        }
      } catch (error) {
        console.error('Error menyimpan tabel:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
  };

  const addBlock = (type) => {
    const defaultOrder = contentBlocks.length > 0 ? Math.max(...contentBlocks.map(b => b.order || 0)) + 1 : 1;
    const newBlock = { id: nextBlockId, type: type, order: defaultOrder };

    if (type === 'paragraph' || type === 'heading') { newBlock.content = ''; } 
    else if (type === 'image') { newBlock.file = null; newBlock.caption = ''; } 
    else if (type === 'pdf') { 
      newBlock.file = null; 
      newBlock.title = ''; 
      newBlock.description = ''; 
      newBlock.display_mode = 'link'; 
    }

    setContentBlocks(prev => [...prev, newBlock]);
    setNextBlockId(prev => prev + 1);
  };

  const removeBlock = (blockId) => {
    if (contentBlocks.length <= 1) return;
    const blockToRemove = contentBlocks.find(block => block.id === blockId);

    if (blockToRemove) {
      if (blockToRemove.type === 'image' && blockToRemove.existingImage) {
        setImagesToDelete(prev => [...prev, blockToRemove.existingImage.id]);
        if (thumbnailImageId === blockToRemove.existingImage.id) {
          setThumbnailImageId(null);
        }
      } else if (blockToRemove.type === 'pdf' && blockToRemove.existingPdf) {
        setPdfsToDelete(prev => [...prev, blockToRemove.existingPdf.id]);
      } else if (blockToRemove.existingContentId) {
        setContentsToDelete(prev => [...prev, blockToRemove.existingContentId]);
      }
    }
    
    setContentBlocks(prev => {
      const filtered = prev.filter(block => block.id !== blockId);
      return filtered.map((block, index) => ({ ...block, order: index + 1 }));
    });
  };

  const updateBlock = (blockId, updates) => {
    setContentBlocks(prev => prev.map(block => block.id === blockId ? { ...block, ...updates } : block));
  };

  const moveBlock = (blockId, direction) => {
    let reorderedBlocks = [...contentBlocks];
    const index = reorderedBlocks.findIndex(block => block.id === blockId);

    if (direction === 'up' && index > 0) {
      [reorderedBlocks[index], reorderedBlocks[index - 1]] = [reorderedBlocks[index - 1], reorderedBlocks[index]];
    } else if (direction === 'down' && index < reorderedBlocks.length - 1) {
      [reorderedBlocks[index], reorderedBlocks[index + 1]] = [reorderedBlocks[index + 1], reorderedBlocks[index]];
    }
    
    const finalBlocks = reorderedBlocks.map((block, idx) => ({
      ...block,
      order: idx + 1
    }));
    
    setContentBlocks(finalBlocks);
  };

  const handleBlockFileUpload = (blockId, file) => {
    updateBlock(blockId, { file: file });
  };

  const setThumbnail = (blockId) => {
    const block = contentBlocks.find(b => b.id === blockId);
    if (block && block.type === 'image') {
      if (block.existingImageId) {
        setThumbnailImageId(block.existingImageId);
      } else if (block.file) {
        setThumbnailImageId(`new_${blockId}`);
      }
    }
  };

  const isThumbnailBlock = (block) => {
    if (block.type !== 'image') return false;
    if (block.existingImageId && thumbnailImageId === block.existingImageId) { return true; }
    if (block.file && thumbnailImageId === `new_${block.id}`) { return true; }
    return false;
  };

  const createBlockOrdersData = () => {
    return contentBlocks.map(block => ({
      id: block.existingId || null,
      localId: block.id,
      type: block.type,
      order: block.order
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const token = Cookies.get('auth_token');
    const isEditing = !!news;
    // Saat edit, kita POST dengan method _method=POST untuk meniru PUT/PATCH
    const url = isEditing ? `${process.env.NEXT_PUBLIC_API_URL}/api/news/${news.id}` : `${process.env.NEXT_PUBLIC_API_URL}/api/news`;
    const submissionData = new FormData();
    
    if (isEditing) {
      submissionData.append('_method', 'POST'); // Laravel butuh ini untuk form-data
    }

    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        submissionData.append(key, formData[key]);
      }
    });
    
    selectedCategories.forEach(categoryId => {
      submissionData.append('category_ids[]', categoryId);
    });

    const blockOrders = createBlockOrdersData();
    blockOrders.forEach((blockOrder, index) => {
      if (blockOrder.id) {
        submissionData.append(`block_orders[${index}][id]`, blockOrder.id);
      }
      submissionData.append(`block_orders[${index}][type]`, blockOrder.type);
      submissionData.append(`block_orders[${index}][order]`, blockOrder.order);
    });
    
    const newContents = [];
    const newImages = [];
    const newImageCaptions = [];
    const newPdfsData = { files: [], titles: [], descriptions: [], displayModes: [] };
    const localImagesToDelete = [...imagesToDelete];
    let newThumbnailImageId = null; 

    // ================== PENAMBAHAN LOGIKA UNTUK UPDATE PDF ==================
    const updatedPdfs = []; 
    // ======================================================================

    contentBlocks.forEach(block => {
      switch (block.type) {
        case 'heading':
        case 'paragraph':
          const contentData = { 
            type: block.type, 
            content: block.content || '', 
            order: block.order
          };
          if (isEditing && block.existingContentId) {
            contentData.id = block.existingContentId;
          }
          newContents.push(contentData);
          break;
        
        case 'image':
          if (block.file) { 
            newImages.push(block.file);
            newImageCaptions.push(block.caption || '');
            if (thumbnailImageId === `new_${block.id}`) {
              newThumbnailImageId = newImages.length - 1;
            }
            if (isEditing && block.existingImage) {
              localImagesToDelete.push(block.existingImage.id);
            }
          }
          break;

        case 'pdf':
          if (block.file) { // PDF baru diupload
            newPdfsData.files.push(block.file);
            newPdfsData.titles.push(block.title || '');
            newPdfsData.descriptions.push(block.description || '');
            newPdfsData.displayModes.push(block.display_mode || 'link');
            if (isEditing && block.existingPdf) {
              // Jika file baru diupload untuk menggantikan yang lama
              pdfsToDelete.push(block.existingPdf.id);
            }
          } else if (isEditing && block.existingPdf) {
            // ================== PENAMBAHAN LOGIKA UNTUK UPDATE PDF ==================
            // Ini untuk PDF yang sudah ada, hanya metadatanya yang diubah
            updatedPdfs.push({
              id: block.existingPdf.id,
              title: block.title,
              description: block.description,
              display_mode: block.display_mode
            });
            // ======================================================================
          }
          break;
      }
    });

    newContents.forEach((content, index) => {
      if(content.id) { submissionData.append(`contents[${index}][id]`, content.id); }
      submissionData.append(`contents[${index}][type]`, content.type);
      submissionData.append(`contents[${index}][content]`, content.content);
      submissionData.append(`contents[${index}][order]`, content.order);
    });

    newImages.forEach((file, index) => {
      submissionData.append('images[]', file);
      submissionData.append('image_captions[]', newImageCaptions[index]);
    });
    
    newPdfsData.files.forEach((file, index) => {
      submissionData.append('pdfs[]', file);
      submissionData.append('pdf_titles[]', newPdfsData.titles[index]);
      submissionData.append('pdf_descriptions[]', newPdfsData.descriptions[index]);
      submissionData.append('pdf_display_modes[]', newPdfsData.displayModes[index]);
    });

    // ================== PENAMBAHAN LOGIKA UNTUK UPDATE PDF ==================
    if (isEditing && updatedPdfs.length > 0) {
      updatedPdfs.forEach((pdf, index) => {
        submissionData.append(`updated_pdfs[${index}][id]`, pdf.id);
        submissionData.append(`updated_pdfs[${index}][title]`, pdf.title);
        submissionData.append(`updated_pdfs[${index}][description]`, pdf.description);
        submissionData.append(`updated_pdfs[${index}][display_mode]`, pdf.display_mode);
      });
    }
    // ======================================================================

    [...new Set(localImagesToDelete)].forEach(id => submissionData.append('delete_images[]', id));
    [...new Set(pdfsToDelete)].forEach(id => submissionData.append('delete_pdfs[]', id));
    [...new Set(contentsToDelete)].forEach(id => submissionData.append('delete_contents[]', id));

    if (thumbnailImageId && typeof thumbnailImageId === 'number') {
      submissionData.append('thumbnail_image_id', thumbnailImageId);
    }
    
    try {
      const response = await fetch(url, {
        method: 'POST', // Selalu POST, Laravel akan handle via _method
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
        body: submissionData,
      });

      if (!response.ok) {
        const errData = await response.json();
        let errorMessage = errData.message || 'Gagal menyimpan data.';
        if (errData.errors) {
          errorMessage += ' ' + Object.values(errData.errors).flat().join(' ');
        }
        throw new Error(errorMessage);
      }
      
      const responseData = await response.json();
      
      // Handle setting thumbnail untuk gambar baru
      if (newThumbnailImageId !== null && responseData.images && responseData.images.length > 0) {
        // Cari gambar baru berdasarkan urutan
        const newImage = responseData.images.find(img => !news.images.some(oldImg => oldImg.id === img.id));
        if (newImage) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${responseData.id}/set-thumbnail`, {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`, 
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_id: newImage.id }),
          });
        }
      }

      // Simpan tabel setelah berita berhasil dibuat/diupdate
      await saveTables(responseData.id || news.id);
      
      onSave();
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full p-2 border rounded bg-gray-50 dark:bg-[#1E293B] dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="themed-card rounded-lg p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{news ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><X size={24} /></button>
        </div>
        
        <div className="flex border-b mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 font-medium ${activeTab === 'content' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Konten Berita
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tables')}
            className={`px-4 py-2 font-medium ${activeTab === 'tables' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Tabel Inovasi
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
        {activeTab === 'content' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <div className="space-y-4">
                <h3 className="font-semibold mb-4">Informasi Berita</h3>
                
                <div className="mb-4">
                  <label className="block mb-1">Judul <span className="text-red-500">*</span></label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} required placeholder="Masukkan judul berita" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Ringkasan</label>
                  <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} className={inputClass} rows="3" placeholder="Ringkasan singkat berita..."></textarea>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                  <div className="max-h-40 overflow-y-auto border rounded p-2 bg-gray-100 dark:bg-slate-800 dark:border-slate-600">
                    {allCategories.map((category) => (
                      <label key={category.id} className="flex items-center space-x-2 p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded">
                        <input type="checkbox" checked={selectedCategories.includes(category.id)} onChange={() => handleCategoryToggle(category.id)} className="w-4 h-4 accent-blue-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Penulis</label>
                  <input type="text" name="author" value={formData.author} onChange={handleChange} className={inputClass} placeholder="Nama penulis" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Tanggal Publikasi</label>
                  <input type="datetime-local" name="published_at" value={formData.published_at} onChange={handleChange} className={inputClass} />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Slug</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} className={inputClass} placeholder="auto-generate-dari-judul" />
                  <small className="text-gray-500 text-xs">Kosongkan untuk auto-generate</small>
                </div>
                <div>
                  <label className="block mb-1">URL Sumber</label>
                  <input type="url" name="source_url" value={formData.source_url} onChange={handleChange} className={inputClass} placeholder="https://sumber.com" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Editor Konten</h3>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => addBlock('paragraph')} className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"><Edit3 size={14} /> Teks</button>
                    <button type="button" onClick={() => addBlock('image')} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"><Image size={14} /> Gambar</button>
                    <button type="button" onClick={() => addBlock('pdf')} className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"><FileText size={14} /> PDF</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {contentBlocks.map((block, index) => (
                    <div key={block.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                          {(block.type === 'heading' || block.type === 'paragraph') && <Edit3 size={16} />}
                          {block.type === 'image' && <Image size={16} />}
                          {block.type === 'pdf' && <FileText size={16} />}
                          {(block.type === 'heading' || block.type === 'paragraph') ? (
                            <select value={block.type} onChange={(e) => updateBlock(block.id, { type: e.target.value })} className="bg-transparent font-medium focus:outline-none p-1 -m-1 text-gray-500">
                              <option value="paragraph">PARAGRAPH</option>
                              <option value="heading">HEADING</option>
                            </select>
                          ) : (<span>{block.type.toUpperCase()}</span>)}
                          <span>#{block.order}</span>
                          {block.existingId && <span className="text-xs bg-gray-200 dark:bg-slate-600 dark:text-gray-300 px-1 rounded">DB:{block.existingId}</span>}
                        </div>
                        <div className="flex items-center gap-1">
                          {block.type === 'image' && (
                            <button 
                              type="button" 
                              onClick={() => setThumbnail(block.id)} 
                              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                                isThumbnailBlock(block)
                                  ? 'bg-yellow-500 text-white' 
                                  : 'bg-gray-200 dark:bg-slate-600 hover:bg-yellow-400'
                              }`}
                            >
                              {isThumbnailBlock(block) ? <Star size={12} /> : <StarOff size={12} />}
                              {isThumbnailBlock(block) ? 'Thumbnail' : 'Set Thumbnail'}
                            </button>
                          )}
                          <button type="button" onClick={() => moveBlock(block.id, 'up')} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><MoveUp size={14} /></button>
                          <button type="button" onClick={() => moveBlock(block.id, 'down')} disabled={index === contentBlocks.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><MoveDown size={14} /></button>
                          <button type="button" onClick={() => removeBlock(block.id)} disabled={contentBlocks.length <= 1} className="p-1 text-red-400 hover:text-red-600 disabled:opacity-30"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      {(block.type === 'heading' || block.type === 'paragraph') && (<textarea value={block.content || ''} onChange={(e) => updateBlock(block.id, { content: e.target.value })} className={inputClass} rows="6" placeholder={`Tulis ${block.type} di sini...`} />)}
                      {block.type === 'image' && (
                        <div>
                          {block.existingImage && !block.file ? (
                            <div className="mb-3">
                              <img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${block.existingImage.path}`} alt="Existing" className="w-full h-48 object-cover rounded border" />
                              <p className="text-sm text-gray-500 mt-1">Gambar saat ini. Pilih file baru untuk mengganti.</p>
                            </div>
                          ) : block.file ? (
                            <div className="mb-3">
                              <img src={URL.createObjectURL(block.file)} alt="Preview" className="w-full h-48 object-cover rounded border" />
                              <p className="text-sm text-gray-500 mt-1">Gambar baru</p>
                            </div>
                          ) : (<div className="mb-3 border-2 border-dashed rounded-lg p-6 text-center"><Upload size={32} className="mx-auto mb-2 text-gray-400" /><p className="text-sm text-gray-500">Belum ada gambar dipilih</p></div>)}
                          <input type="file" accept="image/*" onChange={(e) => handleBlockFileUpload(block.id, e.target.files[0])} className={`${inputClass} mb-2`} />
                          <input type="text" value={block.caption || ''} onChange={(e) => updateBlock(block.id, { caption: e.target.value })} className={inputClass} placeholder="Caption gambar (opsional)" />
                        </div>
                      )}
                      {block.type === 'pdf' && (
                        <div>
                          {block.existingPdf && !block.file ? (
                            <div className="mb-3 p-3 bg-gray-100 dark:bg-slate-600 rounded">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText size={20} />
                                  <div>
                                    <p className="font-medium">{block.existingPdf.title || block.existingPdf.original_name}</p>
                                    {block.existingPdf.description && (<p className="text-sm text-gray-600">{block.existingPdf.description}</p>)}
                                    {block.existingPdf.file_size && (<p className="text-xs text-gray-500">{(block.existingPdf.file_size / 1024 / 1024).toFixed(2)} MB</p>)}
                                  </div>
                                </div>
                                <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/pdfs/view/${block.existingPdf.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-sm">Lihat PDF</a>
                              </div>
                            </div>
                          ) : block.file ? (
                            <div className="mb-3 p-3 bg-gray-100 dark:bg-slate-600 rounded">
                              <div className="flex items-center gap-2">
                                <FileText size={20} />
                                <div>
                                  <span className="text-sm font-medium">{block.file.name}</span>
                                  <p className="text-xs text-gray-500">{(block.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                              </div>
                            </div>
                          ) : (<div className="mb-3 border-2 border-dashed rounded-lg p-6 text-center"><FileText size={32} className="mx-auto mb-2 text-gray-400" /><p className="text-sm text-gray-500">Belum ada PDF dipilih</p></div>)}
                          <input type="file" accept=".pdf" onChange={(e) => handleBlockFileUpload(block.id, e.target.files[0])} className={`${inputClass} mb-2`} />
                          <input type="text" value={block.title || ''} onChange={(e) => updateBlock(block.id, { title: e.target.value })} className={`${inputClass} mb-2`} placeholder="Judul dokumen PDF" />
                          <textarea value={block.description || ''} onChange={(e) => updateBlock(block.id, { description: e.target.value })} className={`${inputClass} mb-2`} rows="2" placeholder="Deskripsi dokumen PDF (opsional)" />

                          <div className="mt-2">
                            <label className="block mb-2 text-sm font-medium">Mode Tampilan</label>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => updateBlock(block.id, { display_mode: 'link' })}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                                        block.display_mode === 'link' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500'
                                    }`}
                                >
                                    <Link size={14} />
                                    Link
                                </button>
                                <button
                                    type="button"
                                    onClick={() => updateBlock(block.id, { display_mode: 'embed' })}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                                        block.display_mode === 'embed' 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500'
                                    }`}
                                >
                                    <Eye size={14} />
                                    Embed
                                </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Tabel Inovasi</h3>
              <button 
                type="button" 
                onClick={addTable}
                className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                <Plus size={14} /> Tambah Baris
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">No</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Nama Inovasi</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Uraian</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Link</th>
                    <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(tables) && tables.map((table, index) => (
                    <tr key={table.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        <input
                          type="number"
                          value={table.urutan || index + 1}
                          onChange={(e) => updateTable(index, 'urutan', parseInt(e.target.value) || index + 1)}
                          className="w-16 p-1 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        <input
                          type="text"
                          value={table.nama_inovasi || ''}
                          onChange={(e) => updateTable(index, 'nama_inovasi', e.target.value)}
                          className="w-full p-1 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Nama inovasi"
                        />
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        <textarea
                          value={table.uraian || ''}
                          onChange={(e) => updateTable(index, 'uraian', e.target.value)}
                          className="w-full p-1 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          rows="3"
                          placeholder="Uraian inovasi"
                        />
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        <input
                          type="url"
                          value={table.link || ''}
                          onChange={(e) => updateTable(index, 'link', e.target.value)}
                          className="w-full p-1 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="https://example.com"
                        />
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-2">
                        <button
                          type="button"
                          onClick={() => removeTable(index)}
                          disabled={deletingTables.has(table.id)}
                          className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Hapus baris"
                        >
                          {deletingTables.has(table.id) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!Array.isArray(tables) || tables.length === 0) && (
                    <tr>
                      <td colSpan="5" className="border border-gray-300 dark:border-gray-600 p-4 text-center text-gray-500 dark:text-gray-400">
                        Belum ada data tabel. Klik "Tambah Baris" untuk menambahkan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {error && (<div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-600 dark:text-red-300"><p className="text-sm">{error}</p></div>)}

        <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
          <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-500 transition">
            Batal
          </button>
          <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300">
            {isLoading ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Menyimpan...</>) : ('Simpan')}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}