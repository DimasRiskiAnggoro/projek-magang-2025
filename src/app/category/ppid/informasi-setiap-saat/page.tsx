"use client"

import { useState } from "react"
import Image from "next/image"

interface InformationItem {
  id: string
  title: string
  content: string
  image?: string
  date: string
  author: string
}

interface InformationFolder {
  id: string
  name: string
  description: string
  items: InformationItem[]
  isExpanded: boolean
}

export default function InformasiSetiapSaat() {
  const [folders, setFolders] = useState<InformationFolder[]>([
    {
      id: "1",
      name: "Profil Kecamatan",
      description: "Informasi lengkap tentang profil Kecamatan Taman Kota Madiun",
      isExpanded: false,
      items: [
        {
          id: "1-1",
          title: "Sejarah Kecamatan Taman",
          content:
            "Kecamatan Taman merupakan salah satu kecamatan di Kota Madiun yang memiliki sejarah panjang dalam perkembangan kota. Wilayah ini dulunya merupakan area taman kota yang kemudian berkembang menjadi pusat pemerintahan dan perdagangan.",
          image: "/historical-building-madiun.png",
          date: "2024-01-15",
          author: "Admin Kecamatan",
        },
        {
          id: "1-2",
          title: "Visi dan Misi",
          content:
            "Visi: Mewujudkan Kecamatan Taman sebagai wilayah yang maju, sejahtera, dan berkarakter. Misi: Meningkatkan kualitas pelayanan publik, memberdayakan masyarakat, dan melestarikan budaya lokal.",
          date: "2024-01-10",
          author: "Camat Taman",
        },
      ],
    },
    {
      id: "2",
      name: "Layanan Publik",
      description: "Informasi tentang berbagai layanan publik yang tersedia",
      isExpanded: false,
      items: [
        {
          id: "2-1",
          title: "Pelayanan Administrasi Kependudukan",
          content:
            "Kecamatan Taman menyediakan layanan administrasi kependudukan seperti pembuatan KTP, KK, akta kelahiran, dan surat pindah. Layanan tersedia setiap hari kerja dari pukul 08.00-15.00 WIB.",
          image: "/government-office-service-counter.png",
          date: "2024-01-20",
          author: "Seksi Pemerintahan",
        },
        {
          id: "2-2",
          title: "Layanan Perizinan",
          content:
            "Berbagai layanan perizinan tersedia di Kecamatan Taman termasuk izin usaha mikro, izin keramaian, dan rekomendasi berbagai keperluan masyarakat.",
          date: "2024-01-18",
          author: "Seksi Ekonomi",
        },
      ],
    },
    {
      id: "3",
      name: "Program Kegiatan",
      description: "Informasi program dan kegiatan yang dilaksanakan kecamatan",
      isExpanded: false,
      items: [
        {
          id: "3-1",
          title: "Program Pemberdayaan Masyarakat",
          content:
            "Program pemberdayaan masyarakat meliputi pelatihan keterampilan, bantuan modal usaha kecil, dan pengembangan UMKM. Program ini bertujuan meningkatkan kesejahteraan masyarakat.",
          image: "/community-empowerment-training.png",
          date: "2024-01-25",
          author: "Seksi Kesejahteraan",
        },
      ],
    },
  ])

  const toggleFolder = (folderId: string) => {
    setFolders(
      folders.map((folder) => (folder.id === folderId ? { ...folder, isExpanded: !folder.isExpanded } : folder)),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16 pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Informasi Setiap Saat</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Akses informasi terkini tentang Kecamatan Taman Kota Madiun kapan saja
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <a href="/" className="hover:text-blue-600 transition-colors">
                Beranda
              </a>
              <span>/</span>
              <span className="text-gray-900 font-medium">Informasi Setiap Saat</span>
            </div>
          </nav>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Informasi Setiap Saat</h2>
            <p className="text-gray-700 leading-relaxed">
              Halaman ini menyediakan akses ke berbagai informasi penting tentang Kecamatan Taman yang dapat diakses
              kapan saja oleh masyarakat. Informasi disusun dalam kategori folder untuk memudahkan pencarian dan akses.
            </p>
          </div>

          {/* Folders */}
          <div className="space-y-6">
            {folders.map((folder) => (
              <div key={folder.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Folder Header */}
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="w-full px-8 py-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{folder.name}</h3>
                        <p className="text-gray-600 mt-1">{folder.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <span>{folder.items.length} item informasi</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${folder.isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Folder Content */}
                {folder.isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-8 space-y-8">
                      {folder.items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        >
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                              <div className="text-sm text-gray-500">
                                <div>{new Date(item.date).toLocaleDateString("id-ID")}</div>
                                <div className="mt-1">oleh {item.author}</div>
                              </div>
                            </div>

                            {item.image && (
                              <div className="mb-4">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  width={300}
                                  height={200}
                                  className="rounded-lg object-cover w-full max-w-md"
                                />
                              </div>
                            )}

                            <div className="prose prose-gray max-w-none">
                              <p className="text-gray-700 leading-relaxed">{item.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
