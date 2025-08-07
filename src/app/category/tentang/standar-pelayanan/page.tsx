'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, User, Tag, Eye, X } from 'lucide-react';

const StandarPelayananPage = () => {
  const [document, setDocument] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    category: '',
    file: null,
    description: ''
  });

  // Data dummy untuk simulasi
  useEffect(() => {
    const dummyData = {
      id: 1,
      title: "Standar Pelayanan Kecamatan Taman Tahun 2024",
      category: "Standar Pelayanan",
      fileName: "standar_pelayanan_kecamatan_taman_2024.pdf",
      fileSize: "3.2 MB",
      uploadDate: "2024-02-20",
      uploadBy: "Admin Kecamatan Taman",
      description: "Dokumen standar pelayanan 6 komponen Kecamatan Taman Kota Madiun tahun 2024 yang mencakup semua layanan publik yang tersedia.",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // URL dummy untuk demo
    };
    setDocument(dummyData);
  }, []);

  const categories = [
    "Standar Pelayanan",
    "Administrasi Kependudukan",
    "Perizinan",
    "Surat Menyurat",
    "Sosial",
    "Kesehatan",
    "Pemberdayaan"
  ];

  const handleDownload = () => {
    if (document) {
      // Simulasi download - implementasi nyata akan menggunakan URL file yang sebenarnya
      const link = document.createElement('a');
      link.href = document.pdfUrl;
      link.download = document.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewPdf = () => {
    if (document && document.pdfUrl) {
      setShowPdfViewer(true);
    } else {
      alert('File PDF tidak tersedia');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-24 pb-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Standar Pelayanan</h1>
                <p className="text-xl text-blue-600 font-semibold">Kecamatan Taman Tahun 2024</p>
              </div>
            </div>
            <p className="text-gray-600">
              Dokumen Standar Pelayanan 6 Komponen Kecamatan Taman Kota Madiun
            </p>
          </div>
        </div>
      </div>

      {/* Document Display */}
      <div className="max-w-4xl mx-auto px-6">
        {document ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Document Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-lg mr-4 flex-shrink-0">
                  <FileText className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {document.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {document.category}
                    </span>
                    <span>•</span>
                    <span>{document.fileSize}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {document.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">{document.description}</p>
              </div>
            )}

            {/* Document Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Informasi Dokumen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Tanggal Upload</div>
                    <div className="font-medium">{formatDate(document.uploadDate)}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-500">Diupload oleh</div>
                    <div className="font-medium">{document.uploadBy}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleViewPdf}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 font-medium"
              >
                <Eye className="w-5 h-5" />
                Lihat Dokumen
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-3 font-medium"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-600 mb-3">
              Belum ada dokumen standar pelayanan
            </h3>
            <p className="text-gray-500">
              Dokumen standar pelayanan akan segera tersedia.
            </p>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {showPdfViewer && document && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {document.title}
              </h3>
              <button
                onClick={() => setShowPdfViewer(false)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={document.pdfUrl}
                className="w-full h-full border border-gray-200 rounded"
                title={document.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StandarPelayananPage;