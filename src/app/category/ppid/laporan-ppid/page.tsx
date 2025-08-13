"use client"

import { useState } from "react"
import { DocumentTextIcon, CalendarIcon, UserIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline"

interface LaporanItem {
  id: number
  title: string
  date: string
  author: string
  comments: number
  category: string
  excerpt: string
  downloadUrl?: string
}

export default function LaporanPPID() {
  const [searchTerm, setSearchTerm] = useState("")

  const laporanData: LaporanItem[] = [
    {
      id: 1,
      title: "LAPORAN PPID KECAMATAN TAMAN KOTA MADIUN TAHUN 2024",
      date: "15 March, 2024",
      author: "ppidtaman1",
      comments: 0,
      category: "Laporan Tahunan",
      excerpt: "Laporan lengkap kegiatan dan pencapaian PPID Kecamatan Taman Kota Madiun selama tahun 2024",
      downloadUrl: "/documents/laporan-ppid-2024.pdf",
    },
    {
      id: 2,
      title: "Laporan Pelayanan Informasi Publik Semester II Tahun 2023",
      date: "10 January, 2024",
      author: "ppidtaman1",
      comments: 0,
      category: "Laporan Semester",
      excerpt:
        "Laporan pelayanan informasi publik semester kedua tahun 2023 dengan statistik permohonan dan penyelesaian",
      downloadUrl: "/documents/laporan-semester-2-2023.pdf",
    },
    {
      id: 3,
      title: "Laporan Pelayanan Informasi Publik Semester I Tahun 2023",
      date: "15 July, 2023",
      author: "ppidtaman1",
      comments: 0,
      category: "Laporan Semester",
      excerpt: "Laporan pelayanan informasi publik semester pertama tahun 2023 beserta evaluasi dan rekomendasi",
      downloadUrl: "/documents/laporan-semester-1-2023.pdf",
    },
    {
      id: 4,
      title: "LAPORAN PPID KECAMATAN TAMAN KOTA MADIUN TAHUN 2022",
      date: "20 February, 2023",
      author: "ppidtaman1",
      comments: 0,
      category: "Laporan Tahunan",
      excerpt: "Laporan komprehensif aktivitas PPID tahun 2022 termasuk inovasi dan peningkatan layanan",
      downloadUrl: "/documents/laporan-ppid-2022.pdf",
    },
    {
      id: 5,
      title: "Laporan Monitoring dan Evaluasi PPID Tahun 2022",
      date: "30 November, 2022",
      author: "ppidtaman1",
      comments: 0,
      category: "Laporan Monitoring",
      excerpt: "Hasil monitoring dan evaluasi kinerja PPID serta rencana perbaikan untuk tahun mendatang",
      downloadUrl: "/documents/monev-ppid-2022.pdf",
    },
    {
      id: 6,
      title: "LAPORAN PPID KECAMATAN TAMAN KOTA MADIUN TAHUN 2021",
      date: "25 January, 2022",
      author: "ppidtaman1",
      comments: 0,
      category: "Laporan Tahunan",
      excerpt: "Laporan tahunan PPID 2021 dengan fokus pada digitalisasi layanan informasi publik",
      downloadUrl: "/documents/laporan-ppid-2021.pdf",
    },
  ]

  const filteredLaporan = laporanData.filter(
    (laporan) =>
      laporan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laporan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laporan.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Laporan Tahunan":
        return "bg-blue-100 text-blue-800"
      case "Laporan Semester":
        return "bg-green-100 text-green-800"
      case "Laporan Monitoring":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Laporan PPID</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Akses laporan berkala PPID Kecamatan Taman Kota Madiun untuk transparansi dan akuntabilitas pelayanan
              informasi publik
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Beranda</span>
            <span>/</span>
            <span className="text-blue-600 font-medium">Laporan PPID</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Cari laporan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Laporan PPID</h2>
          <p className="text-gray-600 leading-relaxed">
            Halaman ini menyediakan akses ke berbagai laporan PPID Kecamatan Taman Kota Madiun yang disusun secara
            berkala. Laporan-laporan ini mencakup statistik pelayanan informasi publik, evaluasi kinerja, dan pencapaian
            target sesuai dengan ketentuan Undang-Undang Keterbukaan Informasi Publik.
          </p>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {filteredLaporan.map((laporan) => (
            <div
              key={laporan.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {laporan.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{laporan.excerpt}</p>
                  </div>
                  <DocumentTextIcon className="h-8 w-8 text-blue-500 ml-4 flex-shrink-0" />
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{laporan.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserIcon className="h-4 w-4" />
                    <span>{laporan.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    <span>{laporan.comments} Comments</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(laporan.category)}`}>
                    {laporan.category}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">Read More</button>
                  {laporan.downloadUrl && (
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <DocumentTextIcon className="h-4 w-4" />
                      Download PDF
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLaporan.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada laporan ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  )
}
