"use client";

import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
// MODIFIKASI: Menambahkan ikon Link dan Eye untuk UI mode tampilan
import { X, Plus, Trash2, Image, FileText, Upload, Star, StarOff, MoveUp, MoveDown, Edit3, Hash, Link, Eye } from 'lucide-react';

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
    { id: 1, type: 'text', content: '', order: 1 }
  ]);
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [thumbnailImageId, setThumbnailImageId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const fileInputRef = useRef(null);

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
            // MODIFIKASI: Baca display_mode dari data server, default ke 'link' jika tidak ada
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

    } else {
      setContentBlocks([{ id: 1, type: 'paragraph', content: '', order: 1 }]);
      setNextBlockId(2);
      setThumbnailImageId(null);
      setSelectedCategories([]);
      setImagesToDelete([]);
      setPdfsToDelete([]);
      setContentsToDelete([]);
    }
  }, [news]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
  };

  const addBlock = (type) => {
    const defaultOrder = contentBlocks.length > 0 ? Math.max(...contentBlocks.map(b => b.order)) + 1 : 1;
    const newBlock = { id: nextBlockId, type: type, order: defaultOrder };

    if (type === 'paragraph' || type === 'heading') { newBlock.content = ''; } 
    else if (type === 'image') { newBlock.file = null; newBlock.caption = ''; } 
    else if (type === 'pdf') { 
      newBlock.file = null; 
      newBlock.title = ''; 
      newBlock.description = ''; 
      // MODIFIKASI: Set display_mode default untuk blok PDF baru
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
    const url = isEditing ? `${process.env.NEXT_PUBLIC_API_URL}/api/news/${news.id}` : `${process.env.NEXT_PUBLIC_API_URL}/api/news`;
    const submissionData = new FormData();

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
    // MODIFIKASI: Menambahkan display_modes ke data PDF baru
    const newPdfsData = { files: [], titles: [], descriptions: [], displayModes: [] };
    const localImagesToDelete = [...imagesToDelete];
    let newThumbnailImageId = null; 

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
          if (block.file) {
            newPdfsData.files.push(block.file);
            newPdfsData.titles.push(block.title || '');
            newPdfsData.descriptions.push(block.description || '');
            // MODIFIKASI: Menambahkan display_mode untuk file baru
            newPdfsData.displayModes.push(block.display_mode || 'link');
            if (isEditing && block.existingPdf) {
              pdfsToDelete.push(block.existingPdf.id);
            }
          } 
          // CATATAN: Untuk meng-update display_mode PDF yang sudah ada (existing),
          // Anda perlu menambahkan logika di sini untuk mengirim data update ke backend.
          // Misalnya, membuat array 'updated_pdfs' dan mengirimnya.
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
    
    // MODIFIKASI: Mengirim data pdf_display_modes[] ke backend
    newPdfsData.files.forEach((file, index) => {
      submissionData.append('pdfs[]', file);
      submissionData.append('pdf_titles[]', newPdfsData.titles[index]);
      submissionData.append('pdf_descriptions[]', newPdfsData.descriptions[index]);
      submissionData.append('pdf_display_modes[]', newPdfsData.displayModes[index]);
    });

    [...new Set(localImagesToDelete)].forEach(id => submissionData.append('delete_images[]', id));
    [...new Set(pdfsToDelete)].forEach(id => submissionData.append('delete_pdfs[]', id));
    [...new Set(contentsToDelete)].forEach(id => submissionData.append('delete_contents[]', id));

    if (thumbnailImageId && typeof thumbnailImageId === 'number') {
      submissionData.append('thumbnail_image_id', thumbnailImageId);
    }
    
    try {
      const response = await fetch(url, {
        method: 'POST',
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
      
      if (newThumbnailImageId !== null && responseData.images && responseData.images.length > 0) {
        const newImageId = responseData.images[newThumbnailImageId]?.id;
        if (newImageId) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${responseData.id}/set-thumbnail`, {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`, 
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image_id: newImageId }),
          });
        }
      }
      
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
      <div className="bg-white dark:bg-slate-800 rounded-lg p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{news ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><X size={24} /></button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Informasi Berita</h3>
              
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Judul <span className="text-red-500">*</span></label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} required placeholder="Masukkan judul berita" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Ringkasan</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} className={inputClass} rows="3" placeholder="Ringkasan singkat berita..."></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                <div className="max-h-40 overflow-y-auto border rounded p-2 bg-white dark:bg-slate-800">
                  {allCategories.map((category) => (
                    <label key={category.id} className="flex items-center space-x-2 p-1 hover:bg-gray-50 dark:hover:bg-slate-700 rounded">
                      <input type="checkbox" checked={selectedCategories.includes(category.id)} onChange={() => handleCategoryToggle(category.id)} className="w-4 h-4" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Penulis</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} className={inputClass} placeholder="Nama penulis" />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Tanggal Publikasi</label>
                <input type="datetime-local" name="published_at" value={formData.published_at} onChange={handleChange} className={inputClass} />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className={inputClass} placeholder="auto-generate-dari-judul" />
                <small className="text-gray-500 text-xs">Kosongkan untuk auto-generate</small>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">URL Sumber</label>
                <input type="url" name="source_url" value={formData.source_url} onChange={handleChange} className={inputClass} placeholder="https://sumber.com" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Editor Konten</h3>
                <div className="flex gap-2">
                  <button type="button" onClick={() => addBlock('paragraph')} className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"><Edit3 size={14} /> Teks</button>
                  <button type="button" onClick={() => addBlock('image')} className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"><Image size={14} /> Gambar</button>
                  <button type="button" onClick={() => addBlock('pdf')} className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"><FileText size={14} /> PDF</button>
                </div>
              </div>
              <div className="space-y-4">
                {contentBlocks.map((block, index) => (
                  <div key={block.id} className="border border-gray-200 dark:border-slate-600 rounded-lg p-4 bg-white dark:bg-slate-800">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {(block.type === 'heading' || block.type === 'paragraph') && <Edit3 size={16} />}
                        {block.type === 'image' && <Image size={16} />}
                        {block.type === 'pdf' && <FileText size={16} />}
                        {(block.type === 'heading' || block.type === 'paragraph') ? (
                          <select value={block.type} onChange={(e) => updateBlock(block.id, { type: e.target.value })} className="bg-transparent font-medium focus:outline-none p-1 -m-1">
                            <option value="paragraph">PARAGRAPH</option>
                            <option value="heading">HEADING</option>
                          </select>
                        ) : (<span>{block.type.toUpperCase()}</span>)}
                        <span>#{block.order}</span>
                        {block.existingId && <span className="text-xs bg-gray-200 px-1 rounded">DB:{block.existingId}</span>}
                      </div>
                      <div className="flex items-center gap-1">
                        {block.type === 'image' && (
                          <button 
                            type="button" 
                            onClick={() => setThumbnail(block.id)} 
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                              isThumbnailBlock(block)
                                ? 'bg-yellow-500 text-white' 
                                : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-400'
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
                        ) : (<div className="mb-3 border-2 border-dashed border-gray-300 dark:border-slate-500 rounded-lg p-6 text-center"><Upload size={32} className="mx-auto mb-2 text-gray-400" /><p className="text-sm text-gray-500">Belum ada gambar dipilih</p></div>)}
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
                              <a href={`${process.env.NEXT_PUBLIC_API_URL}/storage/${block.existingPdf.path}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-sm">Lihat PDF</a>
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
                        ) : (<div className="mb-3 border-2 border-dashed border-gray-300 dark:border-slate-500 rounded-lg p-6 text-center"><FileText size={32} className="mx-auto mb-2 text-gray-400" /><p className="text-sm text-gray-500">Belum ada PDF dipilih</p></div>)}
                        <input type="file" accept=".pdf" onChange={(e) => handleBlockFileUpload(block.id, e.target.files[0])} className={`${inputClass} mb-2`} />
                        <input type="text" value={block.title || ''} onChange={(e) => updateBlock(block.id, { title: e.target.value })} className={`${inputClass} mb-2`} placeholder="Judul dokumen PDF" />
                        <textarea value={block.description || ''} onChange={(e) => updateBlock(block.id, { description: e.target.value })} className={`${inputClass} mb-2`} rows="2" placeholder="Deskripsi dokumen PDF (opsional)" />

                        {/* MODIFIKASI: Menambahkan UI untuk memilih mode tampilan PDF */}
                        <div className="mt-2">
                          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Mode Tampilan</label>
                          <div className="flex items-center gap-2">
                              <button
                                  type="button"
                                  onClick={() => updateBlock(block.id, { display_mode: 'link' })}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                                      block.display_mode === 'link' 
                                          ? 'bg-blue-600 text-white' 
                                          : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
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
                                          : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
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
        
        {error && (<div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-600 dark:text-red-300"><p className="text-sm">{error}</p></div>)}

        <div className="flex justify-end space-x-4 mt-6 pt-4 border-t dark:border-slate-700">
          <button type="button" onClick={onClose} disabled={isLoading} className="px-6 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition disabled:opacity-50">Batal</button>
          <button type="button" onClick={handleSubmit} disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2">
            {isLoading ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> Menyimpan...</>) : ('Simpan')}
          </button>
        </div>
      </div>
    </div>
  );
}