'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, User, MessageCircle, Tag, Eye, ChevronDown, ChevronUp } from 'lucide-react';

const TupoksiPage = () => {
  const [tupoksiData, setTupoksiData] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

  // Data dummy untuk simulasi
  useEffect(() => {
    const dummyData = {
      id: 1,
      title: "Tupoksi Kecamatan Taman Kota Madiun",
      uploadDate: "2024-08-05",
      uploadBy: "admin",
      comments: 0,
      category: "Profil OPD",
      subcategory: "Tupoksi",
      fileName: "tupoksi_kecamatan_taman_2024.pdf",
      fileSize: "2.4 MB",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      excerpt: "Dokumen Tupoksi (Tugas Pokok dan Fungsi) Kecamatan Taman Kota Madiun yang berisi tugas pokok, fungsi, dan uraian tugas dari setiap unit organisasi di lingkungan Kecamatan Taman.",
      fullContent: `
        <div class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-800">Tugas Pokok dan Fungsi Kecamatan Taman</h3>
          
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800 mb-2">TUGAS POKOK</h4>
            <p class="text-gray-700">Kecamatan Taman mempunyai tugas melaksanakan kewenangan pemerintahan yang dilimpahkan oleh Walikota untuk menangani sebagian urusan otonomi daerah.</p>
          </div>

          <div class="space-y-4">
            <h4 class="font-semibold text-gray-800">FUNGSI KECAMATAN TAMAN:</h4>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li>Penyelenggaraan kegiatan pemerintahan di tingkat kecamatan</li>
              <li>Pembinaan ketentraman dan ketertiban wilayah</li>
              <li>Pelaksanaan kegiatan pemberdayaan masyarakat</li>
              <li>Pelaksanaan kegiatan pelayanan masyarakat yang menjadi ruang lingkup tugasnya</li>
              <li>Pembinaan penyelenggaraan kegiatan pemerintahan di tingkat kelurahan</li>
              <li>Pelaksanaan tugas lain yang diberikan oleh Walikota sesuai dengan tugas dan fungsinya</li>
            </ol>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold text-green-800 mb-2">STRUKTUR ORGANISASI</h4>
            <p class="text-gray-700">Kecamatan Taman terdiri dari beberapa seksi yang menjalankan fungsi spesifik dalam pelayanan kepada masyarakat, meliputi Seksi Pemerintahan, Seksi Pemberdayaan Masyarakat, dan Seksi Pelayanan Umum.</p>
          </div>

          <div class="space-y-3">
            <h4 class="font-semibold text-gray-800">URAIAN TUGAS POKOK:</h4>
            <div class="space-y-3">
              <div class="border-l-4 border-blue-400 pl-4">
                <h5 class="font-medium text-blue-800">Seksi Pemerintahan</h5>
                <p class="text-gray-600 text-sm">Melaksanakan urusan pemerintahan umum, kependudukan, dan pertanahan di tingkat kecamatan.</p>
              </div>
              <div class="border-l-4 border-green-400 pl-4">
                <h5 class="font-medium text-green-800">Seksi Pemberdayaan Masyarakat</h5>
                <p class="text-gray-600 text-sm">Melaksanakan kegiatan pemberdayaan masyarakat dan pembangunan ekonomi lokal.</p>
              </div>
              <div class="border-l-4 border-orange-400 pl-4">
                <h5 class="font-medium text-orange-800">Seksi Pelayanan Umum</h5>
                <p class="text-gray-600 text-sm">Melaksanakan pelayanan administrasi dan perizinan kepada masyarakat.</p>
              </div>
            </div>
          </div>
        </div>
      `
    };
    setTupoksiData(dummyData);
  }, []);

  const handleDownload = () => {
    if (tupoksiData) {
      const link = document.createElement('a');
      link.href = tupoksiData.pdfUrl;
      link.download = tupoksiData.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewPdf = () => {
    if (tupoksiData && tupoksiData.pdfUrl) {
      window.open(tupoksiData.pdfUrl, '_blank');
    } else {
      alert('File PDF tidak tersedia');
    }
  };

  const formatDateShort = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!tupoksiData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Memuat data Tupoksi...</p>
        </div>
      </div>
    );
  }

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
                <h1 className="text-3xl font-bold text-gray-800">Tupoksi</h1>
                <p className="text-xl text-blue-600 font-semibold">Kecamatan Taman Kota Madiun</p>
              </div>
            </div>
            <p className="text-gray-600">
              Tugas Pokok dan Fungsi Kecamatan Taman Kota Madiun
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">
              {tupoksiData.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                <span className="font-medium">{formatDateShort(tupoksiData.uploadDate)}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1 text-green-600" />
                <span className="font-medium">{tupoksiData.uploadBy}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1 text-orange-600" />
                <span className="font-medium">{tupoksiData.comments} Comments</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Tag className="w-3 h-3 mr-1" />
                {tupoksiData.category}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Tag className="w-3 h-3 mr-1" />
                {tupoksiData.subcategory}
              </span>
            </div>

            {/* Download Section */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <FileText className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Download Dokumen Tupoksi</h3>
                    <p className="text-sm text-gray-600">{tupoksiData.fileName} ({tupoksiData.fileSize})</p>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Disini
                </button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Excerpt */}
            <div className="prose prose-gray max-w-none mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {tupoksiData.excerpt}
              </p>
            </div>

            {/* Read More Section */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors mb-6"
              >
                <span className="mr-2">
                  {showFullContent ? 'Show Less' : 'Read More'}
                </span>
                {showFullContent ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Full Content */}
              {showFullContent && (
                <div className="animate-fadeIn">
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: tupoksiData.fullContent }}
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleViewPdf}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Eye className="w-5 h-5" />
                Lihat Dokumen PDF
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </article>

        {/* Related Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Terkait</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Struktur Organisasi</h4>
              <p className="text-sm text-gray-600">Lihat struktur organisasi lengkap Kecamatan Taman</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Data Pegawai</h4>
              <p className="text-sm text-gray-600">Informasi data pegawai dan pejabat struktural</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TupoksiPage;