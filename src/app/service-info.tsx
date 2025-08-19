"use client"
import { useRef } from "react"

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

export default function ServiceSection() {
  const serviceCarouselRef = useRef<HTMLDivElement>(null)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Informasi Pelayanan Publik</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dokumen dan informasi penting terkait pelayanan publik di Kecamatan Taman Kota Madiun
          </p>
        </div>

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
  )
}
