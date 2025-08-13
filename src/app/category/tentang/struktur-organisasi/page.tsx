'use client';

import { useState } from 'react';
import Image from 'next/image';

// Interface untuk data struktur organisasi
interface OrganizationStructure {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  uploadedBy: string;
  uploadDate: string;
  category: string;
}

// Data dummy - nanti bisa diganti dengan data dari API atau admin panel
const organizationData: OrganizationStructure[] = [
  {
    id: '1',
    name: 'Struktur Organisasi Kecamatan Taman',
    imageUrl: '/images/placeholder-org.jpg',
    description: 'Struktur organisasi lengkap Kecamatan Taman Kota Madiun',
    uploadedBy: 'Admin Kecamatan',
    uploadDate: '2024-12-15',
    category: 'Organisasi Pemerintahan'
  }
];

// Icon components (mengganti heroicons dengan SVG langsung)
const FolderIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const XMarkIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const StrukturOrganisasiPage: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const [selectedImage, setSelectedImage] = useState<OrganizationStructure | null>(null);

  const handleFolderClick = (item: OrganizationStructure) => {
    setSelectedImage(item);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-24 pb-6 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Struktur Organisasi
          </h1>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            Kecamatan Taman
          </h2>
          <h3 className="text-xl text-gray-600">
            Kota Madiun
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Folder Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center">
          {organizationData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleFolderClick(item)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100 overflow-hidden max-w-2xl w-full"
            >
              <div className="p-6">
                {/* Header dengan Folder Icon dan Kategori */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <FolderIcon className="w-16 h-16 text-blue-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-6 bg-blue-100 rounded-sm opacity-80"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1 break-words leading-tight">
                      {item.name}
                    </h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                {/* Description */}
                {item.description && (
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                )}
                
                {/* Upload Info */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-500 gap-2">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Diupload oleh: <strong>{item.uploadedBy}</strong></span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-4 8V9" />
                      </svg>
                      <span>Tanggal: <strong>{formatDate(item.uploadDate)}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Effect Border */}
              <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal untuk menampilkan gambar */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedImage.name}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            {/* Image Container */}
            <div className="p-4 max-h-[calc(90vh-80px)] overflow-auto">
              <div className="relative w-full h-auto">
                <div className="flex flex-col items-center justify-center p-12 text-gray-500">
                  <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <h3 className="text-lg font-medium mb-2">Gambar Belum Tersedia</h3>
                  <p className="text-sm text-center">
                    Gambar struktur organisasi sedang dalam proses upload.<br/>
                    Silakan hubungi admin untuk informasi lebih lanjut.
                  </p>
                </div>
              </div>
              
              {/* Description in Modal */}
              {selectedImage.description && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 text-center">
                    {selectedImage.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <p className="text-gray-600 mb-2">
            Untuk informasi lebih lanjut mengenai struktur organisasi
          </p>
          <p className="text-gray-800 font-semibold">
            Hubungi: Kecamatan Taman, Kota Madiun
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasiPage;