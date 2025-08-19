"use client"

import { Calendar, Eye, User, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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

export default function NewsSection() {
  const [isVisible, setIsVisible] = useState({
    smartCity: false,
    title: false,
    news: Array(6).fill(false),
    button: false,
  })

  const smartCityRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const newsRefs = useRef<(HTMLDivElement | null)[]>([])
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement

          if (target === smartCityRef.current) {
            setIsVisible((prev) => ({ ...prev, smartCity: true }))
          } else if (target === titleRef.current) {
            setIsVisible((prev) => ({ ...prev, title: true }))
          } else if (target === buttonRef.current) {
            setIsVisible((prev) => ({ ...prev, button: true }))
          } else {
            // Check if it's a news card
            const newsIndex = newsRefs.current.findIndex((ref) => ref === target)
            if (newsIndex !== -1) {
              setIsVisible((prev) => ({
                ...prev,
                news: prev.news.map((visible, index) => (index === newsIndex ? true : visible)),
              }))
            }
          }
        }
      })
    }, observerOptions)

    // Observe elements
    if (smartCityRef.current) observer.observe(smartCityRef.current)
    if (titleRef.current) observer.observe(titleRef.current)
    if (buttonRef.current) observer.observe(buttonRef.current)

    newsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Blue background section with Smart City and first 3 news */}
      <div className="w-full min-h-screen relative overflow-hidden" style={{ backgroundColor: "#68b3e3" }}>
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Large Floating Circles with higher opacity */}
          <div
            className="absolute top-10 left-10 w-32 h-32 bg-white/25 rounded-full animate-bounce shadow-lg"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-32 right-20 w-24 h-24 bg-cyan-200/30 rounded-full animate-bounce shadow-md"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-40 left-1/4 w-20 h-20 bg-blue-200/35 rounded-full animate-bounce shadow-lg"
            style={{ animationDelay: "2s", animationDuration: "5s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/30 rounded-full animate-pulse shadow-md"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-28 h-28 bg-teal-200/25 rounded-full animate-pulse shadow-lg"
            style={{ animationDelay: "1.5s" }}
          ></div>

          {/* Floating Geometric Shapes */}
          <div
            className="absolute top-20 right-1/4 w-12 h-12 bg-white/20 animate-spin shadow-md"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/3 w-8 h-8 bg-cyan-300/25 animate-spin shadow-sm"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/3 left-1/5 w-6 h-12 bg-blue-300/20 rounded-full animate-pulse"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          ></div>

          {/* Moving Particles */}
          <div
            className="absolute top-1/4 left-1/2 w-4 h-4 bg-white/40 rounded-full animate-ping shadow-sm"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/2 w-6 h-6 bg-cyan-200/35 rounded-full animate-ping shadow-md"
            style={{ animationDelay: "3s" }}
          ></div>
          <div
            className="absolute top-3/4 left-1/6 w-3 h-3 bg-blue-200/40 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating Diamonds */}
          <div
            className="absolute top-16 left-1/3 w-8 h-8 bg-white/25 transform rotate-45 animate-bounce shadow-md"
            style={{ animationDelay: "0.5s", animationDuration: "4s" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-cyan-300/30 transform rotate-45 animate-bounce shadow-sm"
            style={{ animationDelay: "2.5s", animationDuration: "5s" }}
          ></div>

          {/* Animated Gradient Overlays */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-400/15 via-transparent to-cyan-300/15 animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-tl from-teal-300/10 via-transparent to-blue-300/10 animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "2s" }}
          ></div>

          {/* Floating Lines */}
          <div
            className="absolute top-1/2 left-10 w-16 h-1 bg-white/20 animate-pulse shadow-sm"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-20 w-12 h-1 bg-cyan-200/25 animate-pulse shadow-sm"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          ></div>

          {/* Enhanced Wave Effect */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-500/20 to-transparent">
            <div
              className="absolute bottom-0 left-0 w-full h-6 bg-white/15 animate-pulse shadow-inner"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="absolute bottom-2 left-0 w-full h-4 bg-cyan-200/20 animate-pulse"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        <div className="w-full mx-auto px-4 py-16 relative z-10">
          {/* Smart City Section with scroll animation */}
          <div
            ref={smartCityRef}
            className={`mb-16 transition-all duration-1000 ease-out ${
              isVisible.smartCity ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800"></div>
              <div className="relative z-10 p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div
                    className={`text-center lg:text-left transition-all duration-1000 delay-200 ${
                      isVisible.smartCity ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                  >
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Jelajahi</h3>
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-1">Smart City</h4>
                      <h5 className="text-lg font-semibold text-white mb-4">Kota Madiun</h5>
                      <button className="group inline-flex items-center px-6 py-3 text-white hover:text-emerald-200 transition-all duration-300 font-medium">
                        <span>Jelajahi</span>
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`flex justify-center transition-all duration-1000 delay-300 ${
                      isVisible.smartCity ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
                  >
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
                  <div
                    className={`text-center lg:text-right transition-all duration-1000 delay-400 ${
                      isVisible.smartCity ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                    }`}
                  >
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

          {/* First 3 news in blue background */}
          <div className="mb-12">
            <div
              ref={titleRef}
              className={`text-center mb-8 transition-all duration-1000 ease-out ${
                isVisible.title ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="inline-block bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg">
                <h2 className="text-3xl font-bold mb-3 text-gray-800">Berita Terpopuler</h2>
                <p className="text-base text-gray-600">
                  Informasi terkini seputar kegiatan dan perkembangan di Kecamatan Taman
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {popularNews.slice(0, 3).map((news, index) => (
                <div
                  key={news.id}
                  ref={(el) => {
                    newsRefs.current[index] = el
                  }}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 ${
                    index % 2 === 0 ? "transform hover:-rotate-1" : "transform hover:rotate-1"
                  } hover:-translate-y-1 ${
                    isVisible.news[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{
                    transitionDelay: isVisible.news[index] ? `${index * 200}ms` : "0ms",
                  }}
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

            <div
              ref={buttonRef}
              className={`text-center transition-all duration-1000 ease-out ${
                isVisible.button ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
              }`}
            >
              <button className="bg-gradient-to-r from-white/20 to-white/30 hover:from-white/30 hover:to-white/40 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm border border-white/20">
                <div className="flex items-center space-x-3">
                  <span>Lihat Semua Berita</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
              <p className="text-white/90 mt-4 max-w-md mx-auto font-medium">
                Temukan lebih banyak berita dan informasi terkini dari Kecamatan Taman Kota Madiun
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
