'use client';

import React, { useState, useEffect } from 'react';
import { Users, FileText, Download, Calendar, User, MessageCircle, Eye, Folder, FolderOpen, ChevronRight } from 'lucide-react';

const DataPegawaiPage = () => {
  const [activeFolder, setActiveFolder] = useState(null);
  const [documents, setDocuments] = useState({});

  // Data dummy untuk simulasi
  useEffect(() => {
    const dummyData = {
      'data-pegawai': [
        {
          id: 1,
          title: "Data Pegawai Kecamatan Taman Periode 2024",
          fileName: "data_pegawai_kecamatan_taman_2024.pdf",
          fileSize: "2.8 MB",
          uploadDate: "2024-05-02",
          uploadBy: "ppidtaman1",
          comments: 0,
          category: "Data Pegawai",
          subcategory: "Informasi Secara Berkala",
          description: "Data lengkap pegawai Kecamatan Taman tahun 2024 termasuk struktur organisasi dan profil pegawai",
          pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        },
        {
          id: 2,
          title: "Profil Pegawai ASN Kecamatan Taman",
          fileName: "profil_pegawai_asn_2024.pdf",
          fileSize: "1.9 MB",
          uploadDate: "2024-04-15",
          uploadBy: "ppidtaman1",
          comments: 2,
          category: "Data Pegawai",
          subcategory: "Informasi Secara Berkala",
          description: "Profil lengkap Aparatur Sipil Negara di lingkungan Kecamatan Taman",
          pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
      ],
      'pejabat-struktural': [
        {
          id: 3,
          title: "Daftar Pejabat Struktural Kec. Taman Kota Madiun 2024",
          fileName: "daftar_pejabat_struktural_2024.pdf",
          fileSize: "1.5 MB",
          uploadDate: "2024-05-02",
          uploadBy: "ppidtaman1",
          comments: 0,
          category: "Pejabat Struktural",
          subcategory: "Informasi Secara Berkala",
          description: "Daftar lengkap pejabat struktural Kecamatan Taman Kota Madiun beserta jabatan dan tugas pokok",
          pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        },
        {
          id: 4,
          title: "Struktur Organisasi Pejabat Struktural",
          fileName: "struktur_organisasi_pejabat_2024.pdf",
          fileSize: "2.1 MB",
          uploadDate: "2024-04-20",
          uploadBy: "ppidtaman1",
          comments: 1,
          category: "Pejabat Struktural",
          subcategory: "Informasi Secara Berkala",
          description: "Bagan struktur organisasi dan hierarki pejabat struktural di Kecamatan Taman",
          pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        }
      ]
    };
    setDocuments(dummyData);
  }, []);

  const folders = [
    {
      id: 'data-pegawai',
      title: 'Data Pegawai Kecamatan Taman',
      description: 'Informasi dan data pegawai Kecamatan Taman',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'pejabat-struktural',
      title: 'Daftar Pejabat Struktural Kec. Taman Kota Madiun',
      description: 'Daftar dan profil pejabat struktural',
      icon: User,
      color: 'green'
    }
  ];

  const handleDownload = (doc) => {
    // Simulasi download
    const link = document.createElement('a');
    link.href = doc.pdfUrl;
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewPdf = (doc) => {
    if (doc && doc.pdfUrl) {
      window.open(doc.pdfUrl, '_blank');
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

  const formatDateShort = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-50',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        hover: 'hover:bg-green-50',
        border: 'border-green-200'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-24 pb-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Data Pegawai</h1>
                <p className="text-xl text-blue-600 font-semibold">Kecamatan Taman Kota Madiun</p>
              </div>
            </div>
            <p className="text-gray-600">
              Informasi dan data pegawai serta pejabat struktural Kecamatan Taman
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        {activeFolder && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <button
                onClick={() => setActiveFolder(null)}
                className="hover:text-blue-600 transition-colors"
              >
                Data Pegawai
              </button>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-800 font-medium">
                {folders.find(f => f.id === activeFolder)?.title}
              </span>
            </div>
          </div>
        )}

        {!activeFolder ? (
          /* Folder View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {folders.map((folder) => {
              const Icon = folder.icon;
              const colors = getColorClasses(folder.color);
              const folderDocs = documents[folder.id] || [];
              
              return (
                <div
                  key={folder.id}
                  className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${colors.hover}`}
                  onClick={() => setActiveFolder(folder.id)}
                >
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`${colors.bg} p-4 rounded-full mr-4`}>
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                          {folder.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {folder.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <FileText className="w-4 h-4 mr-1" />
                        <span>{folderDocs.length} dokumen</span>
                      </div>
                      <div className="flex items-center text-blue-600">
                        <span className="text-sm font-medium mr-2">Buka Folder</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Document List View */
          <div className="space-y-6">
            {documents[activeFolder]?.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                {/* Document Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-lg mr-4 flex-shrink-0">
                      <FileText className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="font-medium">{doc.fileSize}</span>
                        <span>•</span>
                        <span>{doc.category}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {doc.description && (
                  <div className="mb-4">
                    <p className="text-gray-600 leading-relaxed">{doc.description}</p>
                  </div>
                )}

                {/* Upload Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                      <span className="font-medium">{formatDateShort(doc.uploadDate)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-1 text-green-600" />
                      <span className="font-medium">{doc.uploadBy}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MessageCircle className="w-4 h-4 mr-1 text-orange-600" />
                      <span className="font-medium">{doc.comments} Comments</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="font-medium">{doc.subcategory}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleViewPdf(doc)}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Eye className="w-5 h-5" />
                    Lihat Dokumen
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                </div>
              </div>
            )) || (
              /* Empty State for Folder */
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-600 mb-3">
                  Belum ada dokumen
                </h3>
                <p className="text-gray-500">
                  Dokumen untuk kategori ini akan segera tersedia.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State - No Folders */}
        {Object.keys(documents).length === 0 && !activeFolder && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Users className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-600 mb-3">
              Belum ada data pegawai
            </h3>
            <p className="text-gray-500">
              Data pegawai dan pejabat struktural akan segera tersedia.
            </p>
          </div>
        )}

        {/* Back to Folders Button */}
        {activeFolder && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setActiveFolder(null)}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Kembali ke Daftar Folder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPegawaiPage;