import { Play } from "lucide-react"

export default function AboutSection() {
  return (
    <div className="container mx-auto px-4 py-8">
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
                Dengan luas wilayah yang mencakup beberapa kelurahan, Kecamatan Taman terus berkomitmen untuk memberikan
                pelayanan terbaik kepada masyarakat melalui berbagai program pembangunan infrastruktur, peningkatan
                kualitas pendidikan, kesehatan, dan pemberdayaan ekonomi masyarakat dengan dukungan teknologi informasi
                terkini.
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
  )
}
