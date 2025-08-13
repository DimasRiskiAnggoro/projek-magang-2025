"use client"

import { useState } from "react"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  DownloadIcon,
  EyeIcon,
  CalendarIcon,
  UserIcon,
  FolderIcon,
} from "lucide-react"

interface InformasiPublik {
  id: number
  judul: string
  kategori: string
  tanggal: string
  author: string
  deskripsi: string
  jenisFile: string
  ukuranFile: string
  downloadUrl: string
  viewUrl: string
}

export default function DaftarInformasiPublik() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const categories = [
    "Semua",
    "Profil Kecamatan",
    "Struktur Organisasi",
    "Program Kerja",
    "Anggaran",
    "Layanan Publik",
    "Peraturan",
    "Laporan Kinerja",
    "Data Statistik",
  ]

  const informasiPublik: InformasiPublik[] = [
    {
      id: 1,
      judul: "Profil Kecamatan Taman Kota Madiun Tahun 2024",
      kategori: "Profil Kecamatan",
      tanggal: "15 March, 2024",
      author: "ppidtaman1",
      deskripsi: "Dokumen lengkap profil Kecamatan Taman meliputi visi, misi, sejarah, dan kondisi geografis",
      jenisFile: "PDF",
      ukuranFile: "2.5 MB",
      downloadUrl: "/documents/profil-kecamatan-2024.pdf",
      viewUrl: "/view/profil-kecamatan-2024",
    },
    {
      id: 2,
      judul: "Struktur Organisasi dan Tata Kerja Kecamatan Taman",
      kategori: "Struktur Organisasi",
      tanggal: "10 March, 2024",
      author: "ppidtaman1",
      deskripsi: "Bagan struktur organisasi lengkap dengan tugas dan fungsi setiap unit kerja",
      jenisFile: "PDF",
      ukuranFile: "1.8 MB",
      downloadUrl: "/documents/struktur-organisasi-2024.pdf",
      viewUrl: "/view/struktur-organisasi-2024",
    },
    {
      id: 3,
      judul: "Program Kerja Kecamatan Taman Tahun 2024",
      kategori: "Program Kerja",
      tanggal: "05 March, 2024",
      author: "ppidtaman1",
      deskripsi: "Rencana program kerja dan kegiatan Kecamatan Taman untuk tahun 2024",
      jenisFile: "PDF",
      ukuranFile: "3.2 MB",
      downloadUrl: "/documents/program-kerja-2024.pdf",
      viewUrl: "/view/program-kerja-2024",
    },
    {
      id: 4,
      judul: "Rencana Anggaran Pendapatan dan Belanja Kecamatan 2024",
      kategori: "Anggaran",
      tanggal: "28 February, 2024",
      author: "ppidtaman1",
      deskripsi: "Dokumen RAPB Kecamatan Taman dengan rincian alokasi anggaran per program",
      jenisFile: "PDF",
      ukuranFile: "4.1 MB",
      downloadUrl: "/documents/rapb-kecamatan-2024.pdf",
      viewUrl: "/view/rapb-kecamatan-2024",
    },
    {
      id: 5,
      judul: "Standar Operasional Prosedur Layanan Publik",
      kategori: "Layanan Publik",
      tanggal: "20 February, 2024",
      author: "ppidtaman1",
      deskripsi: "SOP lengkap untuk semua jenis layanan publik di Kecamatan Taman",
      jenisFile: "PDF",
      ukuranFile: "2.9 MB",
      downloadUrl: "/documents/sop-layanan-publik.pdf",
      viewUrl: "/view/sop-layanan-publik",
    },
    {
      id: 6,
      judul: "Peraturan Camat Nomor 1 Tahun 2024",
      kategori: "Peraturan",
      tanggal: "15 February, 2024",
      author: "ppidtaman1",
      deskripsi: "Peraturan Camat tentang Pedoman Pelaksanaan Tugas dan Fungsi Kecamatan",
      jenisFile: "PDF",
      ukuranFile: "1.5 MB",
      downloadUrl: "/documents/peraturan-camat-01-2024.pdf",
      viewUrl: "/view/peraturan-camat-01-2024",
    },
    {
      id: 7,
      judul: "Laporan Kinerja Kecamatan Taman Tahun 2023",
      kategori: "Laporan Kinerja",
      tanggal: "31 January, 2024",
      author: "ppidtaman1",
      deskripsi: "Laporan pencapaian kinerja dan evaluasi program kerja tahun 2023",
      jenisFile: "PDF",
      ukuranFile: "5.3 MB",
      downloadUrl: "/documents/laporan-kinerja-2023.pdf",
      viewUrl: "/view/laporan-kinerja-2023",
    },
    {
      id: 8,
      judul: "Data Statistik Kependudukan Kecamatan Taman 2024",
      kategori: "Data Statistik",
      tanggal: "25 January, 2024",
      author: "ppidtaman1",
      deskripsi: "Data statistik lengkap kependudukan meliputi jumlah penduduk, demografi, dan sebaran wilayah",
      jenisFile: "PDF",
      ukuranFile: "2.7 MB",
      downloadUrl: "/documents/data-statistik-kependudukan-2024.pdf",
      viewUrl: "/view/data-statistik-kependudukan-2024",
    },
  ]

  const filteredInformasi = informasiPublik.filter((item) => {
    const matchesSearch =
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || item.kategori === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Daftar Informasi Publik</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Akses lengkap ke berbagai informasi publik Kecamatan Taman Kota Madiun
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <span>Beranda</span>
            <span className="mx-2">/</span>
            <span className="text-green-600 font-medium">Daftar Informasi Publik</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari informasi publik..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full md:w-64 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-green-500"
              >
                <span className="text-gray-700">{selectedCategory}</span>
                {isDropdownOpen ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan {filteredInformasi.length} dari {informasiPublik.length} informasi publik
          </p>
        </div>

        {/* Information List */}
        <div className="space-y-6">
          {filteredInformasi.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FolderIcon className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                        {item.kategori}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                      {item.judul}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">{item.deskripsi}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{item.tanggal}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-4 h-4" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{item.jenisFile}</span>
                        <span>•</span>
                        <span>{item.ukuranFile}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <EyeIcon className="w-4 h-4" />
                      <span>Lihat</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      <DownloadIcon className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredInformasi.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <SearchIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada informasi ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau pilih kategori yang berbeda</p>
          </div>
        )}
      </div>
    </div>
  )
}
