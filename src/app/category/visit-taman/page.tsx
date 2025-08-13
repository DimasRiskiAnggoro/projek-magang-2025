"use client"

import { useState } from "react"
import Image from "next/image"

interface Destination {
  id: number
  name: string
  description: string
  image: string
  category: "wisata" | "kuliner" | "fasilitas" | "sejarah"
  location: string
  openHours?: string
  contact?: string
}

export default function VisitTamanPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Alun-Alun Kota Madiun",
      description:
        "Pusat kota yang menjadi tempat berkumpul masyarakat dengan taman yang asri dan berbagai fasilitas rekreasi keluarga.",
      image: "/placeholder.svg?height=300&width=400&text=Alun-Alun",
      category: "wisata",
      location: "Jl. Pahlawan, Kecamatan Taman",
      openHours: "24 Jam",
      contact: "(0351) 464318",
    },
    {
      id: 2,
      name: "Museum Kota Madiun",
      description:
        "Museum yang menyimpan berbagai koleksi sejarah dan budaya Kota Madiun, termasuk peninggalan masa kolonial.",
      image: "/placeholder.svg?height=300&width=400&text=Museum",
      category: "sejarah",
      location: "Jl. Taman Praja, Kecamatan Taman",
      openHours: "08:00 - 16:00 WIB",
      contact: "(0351) 462233",
    },
    {
      id: 3,
      name: "Pasar Tradisional Taman",
      description:
        "Pasar tradisional yang menjual berbagai kebutuhan sehari-hari dan makanan khas Madiun dengan suasana yang autentik.",
      image: "/placeholder.svg?height=300&width=400&text=Pasar",
      category: "kuliner",
      location: "Jl. Pasar Taman, Kecamatan Taman",
      openHours: "05:00 - 17:00 WIB",
      contact: "(0351) 464125",
    },
    {
      id: 4,
      name: "Masjid Agung Madiun",
      description:
        "Masjid bersejarah dengan arsitektur yang indah, menjadi pusat kegiatan keagamaan masyarakat Kota Madiun.",
      image: "/placeholder.svg?height=300&width=400&text=Masjid",
      category: "sejarah",
      location: "Jl. Masjid Agung, Kecamatan Taman",
      openHours: "24 Jam",
      contact: "(0351) 464200",
    },
    {
      id: 5,
      name: "Taman Kota Hijau",
      description: "Ruang terbuka hijau yang menyediakan area rekreasi, jogging track, dan playground untuk anak-anak.",
      image: "/placeholder.svg?height=300&width=400&text=Taman",
      category: "wisata",
      location: "Jl. Taman Hijau, Kecamatan Taman",
      openHours: "05:00 - 22:00 WIB",
      contact: "-",
    },
    {
      id: 6,
      name: "Kantor Kecamatan Taman",
      description:
        "Pusat pelayanan administrasi kecamatan yang melayani berbagai kebutuhan masyarakat dengan fasilitas modern.",
      image: "/placeholder.svg?height=300&width=400&text=Kantor",
      category: "fasilitas",
      location: "Jl. Taman Praja No.99",
      openHours: "07:30 - 16:00 WIB",
      contact: "(0351) 464318",
    },
  ]

  const categories = [
    { value: "all", label: "Semua Kategori" },
    { value: "wisata", label: "Wisata" },
    { value: "kuliner", label: "Kuliner" },
    { value: "fasilitas", label: "Fasilitas Umum" },
    { value: "sejarah", label: "Sejarah & Budaya" },
  ]

  const filteredDestinations = destinations.filter((destination) => {
    const matchesCategory = selectedCategory === "all" || destination.category === selectedCategory
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "wisata":
        return "bg-pink-100 text-pink-800"
      case "kuliner":
        return "bg-orange-100 text-orange-800"
      case "fasilitas":
        return "bg-blue-100 text-blue-800"
      case "sejarah":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Visit Taman</h1>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto">
            Jelajahi keindahan dan kekayaan Kecamatan Taman Kota Madiun
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari destinasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tentang Kecamatan Taman</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kecamatan Taman merupakan salah satu kecamatan di Kota Madiun yang menjadi pusat pemerintahan dan
                bisnis. Dengan lokasi strategis di jantung kota, kecamatan ini menawarkan berbagai destinasi menarik
                mulai dari wisata sejarah, kuliner khas, hingga fasilitas modern.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sebagai bagian dari upaya meningkatkan pariwisata daerah, Kecamatan Taman terus mengembangkan potensi
                wisata dan pelayanan publik yang berkualitas untuk memberikan pengalaman terbaik bagi pengunjung.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">15+</div>
                  <div className="text-sm text-gray-600">Destinasi Wisata</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">50+</div>
                  <div className="text-sm text-gray-600">Kuliner Khas</div>
                </div>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Kecamatan+Taman"
                alt="Kecamatan Taman Kota Madiun"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(destination.category)}`}
                  >
                    {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
                <p
                  className="text-gray-600 text-sm mb-4 overflow-hidden"
                  style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                >
                  {destination.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {destination.location}
                  </div>

                  {destination.openHours && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {destination.openHours}
                    </div>
                  )}

                  {destination.contact && destination.contact !== "-" && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {destination.contact}
                    </div>
                  )}
                </div>

                <button className="w-full mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Tidak ada destinasi yang ditemukan</div>
            <p className="text-gray-500 mt-2">Coba ubah kata kunci pencarian atau kategori</p>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Informasi Kontak</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-pink-500 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Alamat</h3>
              <p className="text-gray-600 text-sm">
                Jl. Taman Praja No.99
                <br />
                Kecamatan Taman, Kota Madiun
              </p>
            </div>

            <div>
              <div className="text-pink-500 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Telepon</h3>
              <p className="text-gray-600 text-sm">(0351) 464318</p>
            </div>

            <div>
              <div className="text-pink-500 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Jam Pelayanan</h3>
              <p className="text-gray-600 text-sm">
                Senin - Jumat
                <br />
                07:30 - 16:00 WIB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
