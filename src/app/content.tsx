"use client"

import type React from "react"
import { useState } from "react"
import { Search, ExternalLink, Calendar, Eye, ChevronDown } from "lucide-react"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  views: number
  category: string
  image: string
}

const categories = [
  "Semua Kategori",
  "Infrastruktur",
  "Pelayanan",
  "Budaya",
  "Kesehatan",
  "Pendidikan",
  "Ekonomi",
  "Sosial",
]

const quickLinks = [
  {
    title: "Awak Sigap",
    description: "Sistem Informasi Keamanan dan Ketertiban",
    url: "#",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "PPID Kota Madiun",
    description: "Pejabat Pengelola Informasi dan Dokumentasi",
    url: "#",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Kominfo Kota Madiun",
    description: "Komunikasi dan Informatika Kota Madiun",
    url: "#",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Madiun Today",
    description: "Portal Berita Terkini Kota Madiun",
    url: "#",
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    title: "Portal Open Data",
    description: "Data Terbuka Kecamatan Taman Kota Madiun",
    url: "#",
    color: "bg-teal-500 hover:bg-teal-600",
  },
  {
    title: "siRUP",
    description: "Sistem Informasi Rencana Umum Pengadaan",
    url: "#",
    color: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    title: "LPSE",
    description: "Layanan Pengadaan Secara Elektronik",
    url: "#",
    color: "bg-red-500 hover:bg-red-600",
  },
  {
    title: "Daftar Kategori",
    description: "Kategori Layanan Kecamatan Taman",
    url: "#",
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
]

const popularNews: NewsItem[] = [
  {
    id: 1,
    title: "Pembangunan Infrastruktur Jalan di Kecamatan Kota Madiun Memasuki Tahap Akhir",
    excerpt:
      "Proyek pembangunan infrastruktur jalan sepanjang 2.5 km di wilayah kecamatan kota telah mencapai progress 85%...",
    date: "2024-01-15",
    views: 1250,
    category: "Infrastruktur",
    image: "/city-road-construction.png",
  },
  {
    id: 2,
    title: "Program Digitalisasi Pelayanan Publik Kecamatan Kota Madiun",
    excerpt:
      "Kecamatan Kota Madiun meluncurkan sistem pelayanan digital untuk mempermudah masyarakat dalam mengurus administrasi...",
    date: "2024-01-12",
    views: 980,
    category: "Pelayanan",
    image: "/digitalisasi-pelayanan-publik-komputer.png",
  },
  {
    id: 3,
    title: "Festival Budaya Lokal Meriahkan HUT Kecamatan Kota Madiun",
    excerpt:
      "Perayaan HUT ke-75 Kecamatan Kota Madiun dimeriahkan dengan berbagai pertunjukan budaya dan pameran UMKM lokal...",
    date: "2024-01-10",
    views: 1450,
    category: "Budaya",
    image: "/indonesian-cultural-festival.png",
  },
  {
    id: 4,
    title: "Sosialisasi Program Kesehatan Masyarakat di Kelurahan-Kelurahan",
    excerpt:
      "Tim kesehatan kecamatan mengadakan sosialisasi program kesehatan preventif kepada masyarakat di 12 kelurahan...",
    date: "2024-01-08",
    views: 750,
    category: "Kesehatan",
    image: "/public-health-talk.png",
  },
]

export default function Content() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNews, setFilteredNews] = useState(popularNews)
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSearch = () => {
    let filtered = popularNews

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "Semua Kategori") {
      filtered = filtered.filter((news) => news.category === selectedCategory)
    }

    setFilteredNews(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setIsDropdownOpen(false)
    let filtered = popularNews

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          news.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (category !== "Semua Kategori") {
      filtered = filtered.filter((news) => news.category === category)
    }

    setFilteredNews(filtered)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari berita, informasi, atau layanan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full text-lg h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-full md:w-48 relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                  >
                    <span>{selectedCategory}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center justify-center transition-colors"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Cari
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Layanan Digital Kecamatan Taman Kota Madiun
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${link.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}
                  >
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{link.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{link.description}</p>
                  <button className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent hover:bg-blue-600 hover:text-white hover:border-blue-600 text-gray-700 dark:text-gray-300 transition-colors">
                    Kunjungi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Kecamatan Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                Tentang Kecamatan Taman Kota Madiun
              </h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Kecamatan Taman merupakan salah satu kecamatan yang berada di wilayah Kota Madiun, Jawa Timur.
                    Sebagai pusat pemerintahan dan bisnis, kecamatan ini memiliki peran strategis dalam pengembangan
                    ekonomi dan sosial masyarakat Kota Madiun dengan fokus pada pelayanan digital dan transparansi data.
                  </p>

                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Dengan luas wilayah yang mencakup beberapa kelurahan, Kecamatan Taman terus berkomitmen untuk
                    memberikan pelayanan terbaik kepada masyarakat melalui berbagai program pembangunan infrastruktur,
                    peningkatan kualitas pendidikan, kesehatan, dan pemberdayaan ekonomi masyarakat dengan dukungan
                    teknologi informasi terkini.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold text-2xl text-blue-600 dark:text-blue-400">8</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Kelurahan</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-bold text-2xl text-green-600 dark:text-green-400">65,000+</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Penduduk</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src="/kantor-kecamatan-madiun-modern.png"
                      alt="Kantor Kecamatan Taman Kota Madiun"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Kantor Kecamatan Taman Kota Madiun</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular News Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Berita Terpopuler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full mb-2">
                      {news.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="w-4 h-4 mr-1" />
                      {news.views}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold leading-tight hover:text-blue-600 cursor-pointer transition-colors text-gray-800 dark:text-white">
                    {news.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{news.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(news.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <button className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                      Baca Selengkapnya
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Tidak ada berita yang ditemukan untuk pencarian "{searchTerm}"
                {selectedCategory !== "Semua Kategori" && ` dalam kategori "${selectedCategory}"`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
