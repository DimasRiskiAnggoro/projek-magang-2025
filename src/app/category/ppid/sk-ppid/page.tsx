"use client"

import { useState } from "react"
import { ChevronDownIcon, ChevronRightIcon, DocumentIcon, FolderIcon } from "@heroicons/react/24/outline"

interface PDFFile {
  id: string
  name: string
  size: string
  uploadDate: string
  url: string
}

interface Folder {
  id: string
  name: string
  files: PDFFile[]
  subfolders?: Folder[]
}

export default function SKPPIDPage() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

  // Sample data structure - admin dapat mengisi ini
  const folders: Folder[] = [
    {
      id: "1",
      name: "SK PPID 2024",
      files: [
        {
          id: "1",
          name: "SK Penetapan PPID Kecamatan Taman.pdf",
          size: "2.5 MB",
          uploadDate: "2024-01-15",
          url: "/documents/sk-ppid-2024-penetapan.pdf",
        },
        {
          id: "2",
          name: "SK Tugas dan Fungsi PPID.pdf",
          size: "1.8 MB",
          uploadDate: "2024-01-20",
          url: "/documents/sk-ppid-tugas-fungsi.pdf",
        },
      ],
    },
    {
      id: "2",
      name: "SK PPID 2023",
      files: [
        {
          id: "3",
          name: "SK PPID Revisi 2023.pdf",
          size: "3.2 MB",
          uploadDate: "2023-12-10",
          url: "/documents/sk-ppid-2023-revisi.pdf",
        },
        {
          id: "4",
          name: "SK Perubahan Struktur PPID.pdf",
          size: "2.1 MB",
          uploadDate: "2023-11-25",
          url: "/documents/sk-ppid-perubahan-struktur.pdf",
        },
      ],
    },
    {
      id: "3",
      name: "Dokumen Pendukung",
      files: [
        {
          id: "5",
          name: "Panduan Layanan Informasi.pdf",
          size: "4.5 MB",
          uploadDate: "2024-02-01",
          url: "/documents/panduan-layanan-informasi.pdf",
        },
        {
          id: "6",
          name: "SOP Pelayanan PPID.pdf",
          size: "3.8 MB",
          uploadDate: "2024-01-30",
          url: "/documents/sop-pelayanan-ppid.pdf",
        },
      ],
    },
  ]

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleDownload = (file: PDFFile) => {
    // Implementasi download file
    window.open(file.url, "_blank")
  }

  const formatFileSize = (size: string) => size
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">SK PPID Kecamatan Taman Kota Madiun</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Surat Keputusan Pejabat Pengelola Informasi dan Dokumentasi (PPID) Kecamatan Taman Kota Madiun beserta
            dokumen pendukung lainnya.
          </p>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="bg-white rounded-lg shadow-sm px-4 py-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Beranda</span>
              <span>/</span>
              <span className="text-blue-600 font-medium">SK PPID</span>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <FolderIcon className="w-6 h-6 mr-2" />
              Dokumen SK PPID
            </h2>
          </div>

          <div className="p-6">
            {folders.map((folder) => (
              <div key={folder.id} className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                {/* Folder Header */}
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <FolderIcon className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-800">{folder.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({folder.files.length} file{folder.files.length > 1 ? "s" : ""})
                    </span>
                  </div>
                  {expandedFolders.has(folder.id) ? (
                    <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {/* Folder Content */}
                {expandedFolders.has(folder.id) && (
                  <div className="bg-white">
                    {folder.files.map((file, index) => (
                      <div
                        key={file.id}
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                          index !== folder.files.length - 1 ? "border-b border-gray-100" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1">
                            <DocumentIcon className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-800 truncate">{file.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                <span>Ukuran: {formatFileSize(file.size)}</span>
                                <span>•</span>
                                <span>Diupload: {formatDate(file.uploadDate)}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(file)}
                            className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex-shrink-0"
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Empty State */}
            {folders.length === 0 && (
              <div className="text-center py-12">
                <FolderIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Belum ada dokumen</h3>
                <p className="text-gray-500">Dokumen SK PPID akan ditampilkan di sini setelah diupload oleh admin.</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-2">Informasi Penting</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Semua dokumen dalam format PDF dapat diunduh secara gratis</li>
            <li>• Untuk informasi lebih lanjut, hubungi PPID Kecamatan Taman Kota Madiun</li>
            <li>• Dokumen akan diperbarui secara berkala sesuai dengan peraturan terbaru</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
