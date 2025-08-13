"use client"

import { useState } from "react"
import Image from "next/image"

interface InformationItem {
  id: number
  title: string
  content: string
  image?: string
  date: string
  priority: "urgent" | "high" | "normal"
}

interface InformationFolder {
  id: number
  name: string
  description: string
  items: InformationItem[]
  isOpen: boolean
}

export default function InformasiSertaMerta() {
  const [folders, setFolders] = useState<InformationFolder[]>([
    {
      id: 1,
      name: "Pengumuman Darurat",
      description: "Informasi penting yang memerlukan perhatian segera",
      isOpen: false,
      items: [
        {
          id: 1,
          title: "Penutupan Sementara Jalan Utama",
          content:
            "Jalan utama Kecamatan Taman akan ditutup sementara untuk perbaikan infrastruktur mulai tanggal 15 Januari 2024. Masyarakat diharapkan menggunakan jalur alternatif yang telah disediakan.",
          image: "/road-closure-emergency.png",
          date: "2024-01-14",
          priority: "urgent",
        },
        {
          id: 2,
          title: "Gangguan Layanan Air Bersih",
          content:
            "Terjadi gangguan layanan air bersih di wilayah RT 05-08 RW 03 akibat perbaikan pipa utama. Layanan diperkirakan normal kembali dalam 24 jam.",
          image: "/water-service-disruption.png",
          date: "2024-01-13",
          priority: "high",
        },
      ],
    },
    {
      id: 2,
      name: "Informasi Layanan",
      description: "Update terkini mengenai layanan publik kecamatan",
      isOpen: false,
      items: [
        {
          id: 3,
          title: "Perpanjangan Jam Layanan Administrasi",
          content:
            "Mulai tanggal 20 Januari 2024, jam layanan administrasi kecamatan diperpanjang hingga pukul 16.00 WIB untuk memberikan kemudahan bagi masyarakat.",
          image: "/extended-service-hours.png",
          date: "2024-01-12",
          priority: "normal",
        },
        {
          id: 4,
          title: "Layanan Online Kependudukan",
          content:
            "Kini tersedia layanan online untuk pengurusan dokumen kependudukan. Akses melalui website resmi atau aplikasi mobile yang telah disediakan.",
          image: "/online-population-service.png",
          date: "2024-01-10",
          priority: "normal",
        },
      ],
    },
    {
      id: 3,
      name: "Kegiatan Mendadak",
      description: "Informasi kegiatan yang diselenggarakan dalam waktu dekat",
      isOpen: false,
      items: [
        {
          id: 5,
          title: "Rapat Koordinasi Darurat RT/RW",
          content:
            "Akan dilaksanakan rapat koordinasi darurat dengan seluruh RT/RW se-Kecamatan Taman pada hari Senin, 22 Januari 2024 pukul 09.00 WIB di Aula Kecamatan.",
          image: "/emergency-coordination-meeting.png",
          date: "2024-01-15",
          priority: "high",
        },
      ],
    },
  ])

  const toggleFolder = (folderId: number) => {
    setFolders(folders.map((folder) => (folder.id === folderId ? { ...folder, isOpen: !folder.isOpen } : folder)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "MENDESAK"
      case "high":
        return "PENTING"
      case "normal":
        return "NORMAL"
      default:
        return "NORMAL"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Informasi Serta Merta</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
              Informasi penting dan mendesak yang perlu diketahui masyarakat Kecamatan Taman Kota Madiun
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <span>Beranda</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Informasi Serta Merta</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Informasi Serta Merta</h2>
          <p className="text-gray-700 leading-relaxed">
            Halaman ini menyediakan akses ke informasi yang harus diumumkan serta merta oleh Kecamatan Taman Kota
            Madiun. Informasi disusun dalam kategori folder berdasarkan tingkat urgensi dan jenis informasi untuk
            memudahkan pencarian dan akses masyarakat.
          </p>
        </div>

        {/* Information Folders */}
        <div className="space-y-6">
          {folders.map((folder) => (
            <div key={folder.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Folder Header */}
              <div
                className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-colors"
                onClick={() => toggleFolder(folder.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2v0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{folder.name}</h3>
                    <p className="text-gray-600">{folder.description}</p>
                    <p className="text-sm text-blue-600 font-medium">{folder.items.length} item informasi</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${folder.isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Folder Content */}
              {folder.isOpen && (
                <div className="p-6 space-y-6">
                  {folder.items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Image */}
                        {item.image && (
                          <div className="lg:w-1/3">
                            <div className="relative h-48 lg:h-32 rounded-lg overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className={item.image ? "lg:w-2/3" : "w-full"}>
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-semibold text-gray-900 flex-1">{item.title}</h4>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ml-4 ${getPriorityColor(item.priority)}`}
                            >
                              {getPriorityLabel(item.priority)}
                            </span>
                          </div>

                          <p className="text-gray-700 leading-relaxed mb-4">{item.content}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v16a2 2 0 002 2z"
                                />
                              </svg>
                              {new Date(item.date).toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
