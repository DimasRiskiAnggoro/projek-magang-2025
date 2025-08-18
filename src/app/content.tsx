"use client"
import { useRef, useEffect, useState } from "react"
import { Calendar, Eye, Play, ChevronRight, User } from "lucide-react"

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

const quickLinks = [
  {
    title: "Awak Sigap",
    description: "Sistem Informasi Keamanan dan Ketertiban",
    url: "https://awaksigap.madiunkota.go.id",
    logo: "/icons/awaksigap.jpeg",
  },
  {
    title: "PPID Kota Madiun",
    description: "Pejabat Pengelola Informasi dan Dokumentasi",
    url: "https://ppid.madiunkota.go.id",
    logo: "/icons/PPID.png",
  },
  {
    title: "Kominfo Kota Madiun",
    description: "Komunikasi dan Informatika Kota Madiun",
    url: "https://kominfo.madiunkota.go.id",
    logo: "/icons/madiun.png",
  },
  {
    title: "Madiun Today",
    description: "Portal Berita Terkini Kota Madiun",
    url: "https://madiuntoday.id",
    logo: "/icons/madiun-today.jpeg",
  },
  {
    title: "Portal Open Data",
    description: "Data Terbuka Kecamatan Taman Kota Madiun",
    url: "https://opendata.madiunkota.go.id",
    logo: "/icons/madiun.png",
  },
  {
    title: "siRUP",
    description: "Sistem Informasi Rencana Umum Pengadaan",
    url: "https://sirup-lat.lkpp.go.id/sirup/rekap/penyedia/D179",
    logo: "/icons/madiun.png",
  },
  {
    title: "LPSE",
    description: "Layanan Pengadaan Secara Elektronik",
    url: "https://spse.inaproc.id/madiunkota",
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
  {
    id: 5,
    title: "Pembangunan Sekolah Baru di Kelurahan Taman",
    excerpt:
      "Kecamatan Kota Madiun memulai pembangunan sekolah baru di Kelurahan Taman untuk meningkatkan kualitas pendidikan...",
    date: "2024-01-05",
    views: 1100,
    category: "Pendidikan",
    image: "/school-construction.png",
    author: "Admin Pendidikan",
  },
  {
    id: 6,
    title: "Pengadaan Obat-obatan di Apotek Kecamatan",
    excerpt: "Kecamatan Kota Madiun mengadakan pengadaan obat-obatan di apotek kecamatan untuk memastikan stok obat...",
    date: "2024-01-03",
    views: 800,
    category: "Kesehatan",
    image: "/medicine-supply.png",
    author: "Dinkes Kecamatan",
  },
]

const serviceInfo = [
  {
    id: 1,
    title: "MAKLUMAT PELAYANAN",
    image: "/image/maklumat-pelayanan.jpg",
  },
  {
    id: 2,
    title: "JAM PELAYANAN KECAMATAN TAMAN",
    image: "/image/jam-pelayanan.jpeg",
  },
  {
    id: 3,
    title: "INDEKS PELAYANAN PUBLIK TAHUN 2024",
    image: "/image/indeks-pelayanan.jpeg",
  },
  {
    id: 4,
    title: "INDEKS KEPUASAN MASYARAKAT TAHUN 2024",
    image: "/image/indeks-kepuasan.jpeg",
  },
  {
    id: 5,
    title: "NILAI SAKIP TAHUN 2024",
    image: "/image/nilai-sakip.jpeg",
  },
  {
    id: 6,
    title: "BUDAYA 5S",
    image: "/image/budaya-5s.png",
  },
]

export default function Content() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const serviceCarouselRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const scrollAmount = 1
        const maxScroll = carouselRef.current.scrollWidth / 2
        const currentScroll = carouselRef.current.scrollLeft

        if (currentScroll >= maxScroll) {
          carouselRef.current.scrollLeft = 0
        } else {
          carouselRef.current.scrollLeft += scrollAmount
        }
      }
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320
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
      const scrollAmount = 320
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
      {/* Header dengan garis putih tebal */}
      <div
        className="mb-16 w-full relative overflow-hidden border-t-8 border-white"
        style={{ backgroundColor: "#68b3e3" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-32 right-20 w-16 h-16 bg-white/15 rounded-full animate-pulse"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/20 rounded-full animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-8 h-8 bg-white/25 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
          ></div>
          <div
            className="absolute top-16 right-10 w-6 h-6 bg-white/20 rotate-45 animate-spin"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute bottom-32 right-1/4 w-4 h-4 bg-white/30 rotate-45 animate-spin"
            style={{ animationDuration: "6s", animationDirection: "reverse" }}
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse"></div>
        </div>

        <div className="relative py-8 z-10">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[...quickLinks, ...quickLinks].map((link, index) => (
              <div
                key={index}
                className="group relative rounded-2xl hover:shadow-none transition-all duration-500 transform hover:-translate-y-1 hover:rotate-1 p-4 flex-shrink-0 w-48"
                style={{ backgroundColor: "transparent" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500"
                  style={{ backgroundColor: "#68b3e3" }}
                ></div>
                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                      <img
                        src={link.logo || "/placeholder.svg"}
                        alt={`${link.title} logo`}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tentang Kecamatan */}
        <div className="mb-16">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-black dark:text-white">Tentang Kecamatan Taman Kota Madiun</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
              <div className="relative h-96">
                <div className="absolute top-4 right-0 z-10">
                  <div className="aspect-[4/3] w-72 rounded-2xl overflow-hidden shadow-xl transform rotate-3 hover:rotate-1 transition-transform duration-500">
                    <img
                      src="/image/ringroad.jpg"
                      alt="Ring Road Kota Madiun"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
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
                <div className="absolute top-2 right-12 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-lg"></div>
                <div className="absolute top-20 right-20 w-8 h-8 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full" style={{ backgroundColor: "#68b3e3" }}>
        <div className="container mx-auto px-4 py-16">
          {/* Smart City Section */}
          <div className="mb-16">
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800"></div>
              <div className="relative z-10 p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Jelajah</h3>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-1">Smart City</h4>
                      <h5 className="text-lg font-semibold text-white mb-4">Kota Madiun</h5>
                      <button className="group inline-flex items-center px-6 py-3 text-white hover:text-emerald-200 transition-all duration-300 font-medium">
                        <span>Jelajahi</span>
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
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
                  <div className="text-center lg:text-right">
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Jelajahi</h3>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-1">Pemerintah</h4>
                      <h5 className="text-lg font-semibold text-white mb-4">Kota Madiun</h5>
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

          {/* Berita Terpopuler - 3 berita pertama */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3 text-white">Berita Terpopuler</h2>
              <p className="text-base text-white/90">
                Informasi terkini seputar kegiatan dan perkembangan di Kecamatan Taman
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {popularNews.slice(0, 3).map((news, index) => (
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
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Sisa berita di luar background biru */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {popularNews.slice(3, 6).map((news, index) => (
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
            <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-md mx-auto font-medium">
              Temukan lebih banyak berita dan informasi terkini dari Kecamatan Taman Kota Madiun
            </p>
          </div>
        </div>

        {/* Layanan Digital - Tanpa tombol navigasi */}
        <div className="mb-16">
          <div
            ref={serviceCarouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 py-4"
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
  )
}
