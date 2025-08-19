import { Calendar, Eye, User, ChevronRight } from "lucide-react"

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
  return (
    <div className="w-full" style={{ backgroundColor: "#68b3e3" }}>
      <div className="container mx-auto px-4 py-16 relative z-10">
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
                className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? "transform hover:-rotate-1" : "transform hover:rotate-1"} hover:-translate-y-1`}
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

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {popularNews.slice(3, 6).map((news, index) => (
              <div
                key={news.id}
                className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 ${index % 2 === 0 ? "transform hover:-rotate-1" : "transform hover:rotate-1"} hover:-translate-y-1`}
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
            <p className="text-white/90 mt-4 max-w-md mx-auto font-medium">
              Temukan lebih banyak berita dan informasi terkini dari Kecamatan Taman Kota Madiun
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
