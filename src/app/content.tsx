"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Search, Calendar, Eye, ChevronDown, Play, ChevronLeft, ChevronRight, User } from "lucide-react"

interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  views: number
  category: string
  image: string
  author: string
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
    url: "https://awaksigap.madiunkota.go.id", // Updated URL from madiunpkota to madiunkota
    color: "from-blue-500 to-blue-600",
    logo: "/icons/awaksigap.jpeg",
  },
  {
    title: "PPID Kota Madiun",
    description: "Pejabat Pengelola Informasi dan Dokumentasi",
    url: "https://ppid.madiunkota.go.id", // Updated URL from madiunpkota to madiunkota
    color: "from-green-500 to-green-600",
    logo: "/icons/PPID.png",
  },
  {
    title: "Kominfo Kota Madiun",
    description: "Komunikasi dan Informatika Kota Madiun",
    url: "https://kominfo.madiunkota.go.id", // Updated URL from madiunpkota to madiunkota
    color: "from-purple-500 to-purple-600",
    logo: "/icons/madiun.png",
  },
  {
    title: "Madiun Today",
    description: "Portal Berita Terkini Kota Madiun",
    url: "https://madiuntoday.id", // Updated URL from madiuntoday.com to madiuntoday.id
    color: "from-orange-500 to-orange-600",
    logo: "/icons/madiun-today.jpeg", // Updated logo extension from png to jpeg
  },
  {
    title: "Portal Open Data",
    description: "Data Terbuka Kecamatan Taman Kota Madiun",
    url: "https://opendata.madiunkota.go.id", // Updated URL from data.madiunpkota to opendata.madiunkota
    color: "from-teal-500 to-teal-600",
    logo: "/icons/madiun.png",
  },
  {
    title: "siRUP",
    description: "Sistem Informasi Rencana Umum Pengadaan",
    url: "https://sirup-lat.lkpp.go.id/sirup/rekap/penyedia/D179", // Updated URL to specific siRUP path
    color: "from-indigo-500 to-indigo-600",
    logo: "/icons/madiun.png",
  },
  {
    title: "LPSE",
    description: "Layanan Pengadaan Secara Elektronik",
    url: "https://spse.inaproc.id/madiunkota", // Updated URL from lpse.madiunpkota to spse.inaproc.id/madiunkota
    color: "from-red-500 to-red-600",
    logo: "/icons/logo-lpse.png",
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
    author: "Admin Kecamatan",
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
    author: "Tim Kominfo",
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
    author: "Humas Kecamatan",
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
    author: "Dinkes Kecamatan",
  },
]

const serviceInfo = [
  {
    id: 1,
    title: "MAKLUMAT PELAYANAN",
    image: "/image/maklumat-pelayanan.jpg", // Updated path from user attachment
  },
  {
    id: 2,
    title: "JAM PELAYANAN KECAMATAN TAMAN",
    image: "/image/jam-pelayanan.jpeg", // Updated path from user attachment
  },
  {
    id: 3,
    title: "INDEKS PELAYANAN PUBLIK TAHUN 2024",
    image: "/image/indeks-pelayanan.jpeg", // Updated path from user attachment
  },
  {
    id: 4,
    title: "INDEKS KEPUASAN MASYARAKAT TAHUN 2024",
    image: "/image/indeks-kepuasan.jpeg", // Updated path from user attachment
  },
  {
    id: 5,
    title: "NILAI SAKIP TAHUN 2024",
    image: "/image/nilai-sakip.jpeg", // Updated path from user attachment
  },
  {
    id: 6,
    title: "BUDAYA 5S",
    image: "/image/budaya-5s.png", // Updated path from user attachment
  },
]

export default function Content() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredNews, setFilteredNews] = useState(popularNews)
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const serviceCarouselRef = useRef<HTMLDivElement>(null)

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

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320 // Width of one card plus gap
      const currentScroll = carouselRef.current.scrollLeft
      const targetScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      })
    }
  }

  const scrollServiceCarousel = (direction: "left" | "right") => {
    if (serviceCarouselRef.current) {
      const scrollAmount = 320 // Width of one card plus gap
      const currentScroll = serviceCarouselRef.current.scrollLeft
      const targetScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

      serviceCarouselRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Search Section - Made more organic */}
        <div className="mb-12">
          <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cari berita, informasi, atau layanan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full text-lg h-14 px-6 border border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="w-full md:w-48 relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full h-14 px-6 border border-gray-200 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                  >
                    <span>{selectedCategory}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-xl z-10 overflow-hidden">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className="w-full px-6 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  className="h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-medium flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Cari
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">Layanan Digital Kecamatan Taman</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Akses mudah ke berbagai layanan digital untuk kemudahan masyarakat Kota Madiun
            </p>
          </div>

          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-gray-200 dark:border-gray-600"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
            </button>

            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-gray-200 dark:border-gray-600"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
            </button>

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {quickLinks.map((link, index) => (
                <div
                  key={index}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 p-6 flex-shrink-0 w-80 border border-gray-200 dark:border-gray-700"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                  ></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${link.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}
                      >
                        <img
                          src={link.logo || "/placeholder.svg"}
                          alt={`${link.title} logo`}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">{link.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{link.description}</p>
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-blue-500 hover:to-blue-600 hover:text-white rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        Akses Layanan
                      </a>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Kecamatan Section - Removed all box styling */}
        <div className="mb-16">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-black dark:text-white">Tentang Kecamatan Taman Kota Madiun</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Content Column */}
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Kecamatan Taman merupakan salah satu kecamatan yang berada di wilayah Kota Madiun, Jawa Timur. Sebagai
                  pusat pemerintahan dan bisnis, kecamatan ini memiliki peran strategis dalam pengembangan ekonomi dan
                  sosial masyarakat Kota Madiun dengan fokus pada pelayanan digital dan transparansi data.
                </p>

                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  Dengan luas wilayah yang mencakup beberapa kelurahan, Kecamatan Taman terus berkomitmen untuk
                  memberikan pelayanan terbaik kepada masyarakat melalui berbagai program pembangunan infrastruktur,
                  peningkatan kualitas pendidikan, kesehatan, dan pemberdayaan ekonomi masyarakat dengan dukungan
                  teknologi informasi terkini.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4">
                    <h4 className="font-bold text-2xl text-black dark:text-white">8</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Kelurahan</p>
                  </div>
                  <div className="text-center p-4">
                    <h4 className="font-bold text-2xl text-black dark:text-white">65,000+</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Penduduk</p>
                  </div>
                </div>
              </div>

              {/* Media Column - Stacked overlapping layout with video in front */}
              <div className="relative h-96">
                {/* Background image - Ring Road */}
                <div className="absolute top-4 right-0 z-10">
                  <div className="aspect-[4/3] w-72 rounded-2xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-1 transition-transform duration-500">
                    <img
                      src="/image/ringroad.jpg"
                      alt="Ring Road Kota Madiun"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Front element - YouTube Video */}
                <div className="absolute top-12 left-8 z-30">
                  <div className="aspect-[4/3] w-80 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/xxT-ZbcMrGM?rel=0&modestbranding=1&showinfo=0"
                      title="Profil Kecamatan Taman Kota Madiun"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-red-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg z-40">
                    <Play className="w-4 h-4 inline mr-1" />
                    Video Profil
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 right-12 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-lg"></div>
                <div className="absolute top-20 right-20 w-8 h-8 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-md"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Kota Madiun Section */}
        <div className="mb-16">
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800"></div>
            <div className="relative z-10 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left Section - Smart City */}
                <div className="text-center lg:text-left">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Jelajah</h3>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Smart City</h4>
                    <h5 className="text-lg font-semibold text-white mb-6">Kota Madiun</h5>
                    <button className="group inline-flex items-center px-6 py-3 text-white hover:text-emerald-200 transition-all duration-300 font-medium">
                      <span>Jelajahi</span>
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                {/* Center Section - Logo */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                      <img
                        src="/icons/madiun.png"
                        alt="Logo Kota Madiun"
                        className="w-32 h-32 md:w-36 md:h-36 object-contain filter drop-shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Section - Government */}
                <div className="text-center lg:text-right">
                  <div className="transform hover:scale-105 transition-transform duration-300">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Jelajahi</h3>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Pemerintah</h4>
                    <h5 className="text-lg font-semibold text-white mb-6">Kota Madiun</h5>
                    <button className="group inline-flex items-center px-6 py-3 text-white hover:text-cyan-200 transition-all duration-300 font-medium">
                      <span>Jelajahi</span>
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular News Section - Made smaller and more compact */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 text-black dark:text-white">Berita Terpopuler</h2>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Informasi terkini seputar kegiatan dan perkembangan di Kecamatan Taman
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {filteredNews.slice(0, 6).map((news, index) => (
              <div
                key={news.id}
                className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 ${
                  index % 2 === 0 ? "transform hover:-rotate-1" : "transform hover:rotate-1"
                } hover:-translate-y-1`}
              >
                <div className="aspect-[16/10] bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                  <img
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 rounded-full">
                      {news.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Eye className="w-3 h-3 mr-1" />
                      {news.views}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold leading-tight hover:text-blue-600 cursor-pointer transition-colors text-gray-800 dark:text-white line-clamp-2">
                    {news.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 leading-relaxed">
                    {news.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(news.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <User className="w-3 h-3 mr-1" />
                        {news.author}
                      </div>
                    </div>
                    <button className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Baca
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <span>Lihat Semua Berita</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>

            {/* Description text */}
            <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-md mx-auto font-medium">
              Temukan lebih banyak berita dan informasi terkini dari Kecamatan Taman Kota Madiun
            </p>
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md mx-auto border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">
                  Tidak ada berita yang ditemukan untuk pencarian "{searchTerm}"
                  {selectedCategory !== "Semua Kategori" && ` dalam kategori "${selectedCategory}"`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Informasi Pelayanan Section - Changed to horizontal carousel */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">Informasi Pelayanan</h2>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Informasi lengkap mengenai pelayanan dan standar kinerja Kecamatan Taman
            </p>
          </div>

          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={() => scrollServiceCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-gray-200 dark:border-gray-600"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
            </button>

            <button
              onClick={() => scrollServiceCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-gray-200 dark:border-gray-600"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600" />
            </button>

            <div
              ref={serviceCarouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {serviceInfo.map((info) => (
                <div
                  key={info.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 w-80"
                >
                  <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                    <img
                      src={info.image || "/placeholder.svg"}
                      alt={info.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">{info.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
