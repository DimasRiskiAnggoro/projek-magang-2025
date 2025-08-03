"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Tag } from 'lucide-react';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#3b82f6',
    is_active: true
  });
  const [errors, setErrors] = useState({});
  const [apiLoading, setApiLoading] = useState(false);

  // API Base URL - sesuaikan dengan URL API Laravel Anda
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  // Get auth token from localStorage or your auth context
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') || sessionStorage.getItem('token');
    }
    return null;
  };

  // API Headers
  const getHeaders = () => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      console.log('Fetching categories from:', `${API_BASE_URL}/categories`);
      console.log('Headers:', getHeaders());
      
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'GET',
        headers: getHeaders()
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Categories data:', data);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert(`Gagal memuat data kategori: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Auto-generate slug when name changes
    if (name === 'name') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama kategori wajib diisi';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug wajib diisi';
    }

    // Check for duplicate name/slug (excluding current item when editing)
    const existingCategory = categories.find(cat => 
      (cat.name.toLowerCase() === formData.name.toLowerCase() || 
       cat.slug.toLowerCase() === formData.slug.toLowerCase()) &&
      cat.id !== editingCategory?.id
    );

    if (existingCategory) {
      if (existingCategory.name.toLowerCase() === formData.name.toLowerCase()) {
        newErrors.name = 'Nama kategori sudah ada';
      }
      if (existingCategory.slug.toLowerCase() === formData.slug.toLowerCase()) {
        newErrors.slug = 'Slug sudah ada';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setApiLoading(true);
    
    try {
      const method = editingCategory ? 'PUT' : 'POST';
      const url = editingCategory 
        ? `${API_BASE_URL}/categories/${editingCategory.id}`
        : `${API_BASE_URL}/categories`;

      const response = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
          // Validation errors from Laravel
          setErrors(errorData.errors || {});
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Update local state
      if (editingCategory) {
        setCategories(prev => prev.map(cat => 
          cat.id === editingCategory.id ? result : cat
        ));
      } else {
        setCategories(prev => [...prev, result]);
      }

      handleCloseModal();
      alert(editingCategory ? 'Kategori berhasil diperbarui!' : 'Kategori berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Gagal menyimpan kategori. Silakan coba lagi.');
    } finally {
      setApiLoading(false);
    }
  };

  // Open modal for adding new category
  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3b82f6',
      is_active: true
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing category
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      color: category.color,
      is_active: category.is_active
    });
    setErrors({});
    setIsModalOpen(true);
  };

  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      alert('Kategori berhasil dihapus!');
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Gagal menghapus kategori. Silakan coba lagi.');
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3b82f6',
      is_active: true
    });
    setErrors({});
  };

  // Toggle category status
  const toggleCategoryStatus = async (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    try {
      const updatedData = { ...category, is_active: !category.is_active };
      
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Update local state
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId ? result : cat
      ));
    } catch (error) {
      console.error('Error updating category status:', error);
      alert('Gagal mengubah status kategori. Silakan coba lagi.');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Kategori</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Kelola kategori berita untuk sistem Anda</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                console.log('API_BASE_URL:', API_BASE_URL);
                console.log('Full URL:', `${API_BASE_URL}/categories`);
                console.log('Token:', getAuthToken());
                fetchCategories();
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              Debug & Reload
            </button>
            <button
              onClick={handleAddCategory}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Tambah Kategori
            </button>
          </div>
        </div>

        {/* Categories Table */}
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Memuat data kategori...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum ada kategori</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Mulai dengan menambahkan kategori pertama Anda</p>
            <button
              onClick={handleAddCategory}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <Plus size={20} />
              Tambah Kategori
            </button>
          </div>
        ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {category.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                        {category.description || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleCategoryStatus(category.id)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          category.is_active
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        }`}
                      >
                        {category.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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
        </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingCategory ? 'Edit Kategori' : 'Tambah Kategori'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nama Kategori *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama kategori"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.slug ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="slug-kategori"
                    />
                    {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Deskripsi kategori (opsional)"
                    />
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Warna
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_active"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Kategori aktif
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={apiLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {apiLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {editingCategory ? 'Mengupdate...' : 'Menyimpan...'}
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        {editingCategory ? 'Update' : 'Simpan'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}