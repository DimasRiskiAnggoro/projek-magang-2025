"use client"

import { useState } from "react"
import { EyeSlashIcon, CalendarIcon, UserIcon, ChatBubbleLeftIcon, TagIcon } from "@heroicons/react/24/outline"

interface ArticleItem {
  id: string
  title: string
  date: string
  author: string
  comments: number
  category: string
  excerpt: string
}

export default function InformasiDikecualikan() {
  const [articles] = useState<ArticleItem[]>([
    {
      id: "1",
      title: "DAFTAR INFORMASI DIKECUALIKAN TAHUN 2024",
      date: "14 February, 2024",
      author: "ppidtaman1",
      comments: 0,
      category: "Berita Informasi Dikecualikan",
      excerpt:
        "Daftar lengkap informasi yang dikecualikan dari keterbukaan informasi publik untuk tahun 2024 berdasarkan peraturan perundang-undangan yang berlaku.",
    },
    {
      id: "2",
      title: "Informasi yang Dikecualikan Tahun 2023",
      date: "17 February, 2023",
      author: "ppidtaman1",
      comments: 0,
      category: "Berita Informasi Dikecualikan",
      excerpt:
        "Kompilasi informasi yang dikecualikan selama tahun 2023 sesuai dengan ketentuan UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik.",
    },
    {
      id: "3",
      title: "Informasi Yang Dikecualikan Tahun 2021",
      date: "15 January, 2021",
      author: "ppidtaman1",
      comments: 0,
      category: "Berita Informasi Dikecualikan",
      excerpt:
        "Dokumentasi informasi yang dikecualikan pada tahun 2021 untuk menjaga transparansi dalam pengelolaan informasi publik.",
    },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <EyeSlashIcon className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Informasi Dikecualikan</h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-4xl mx-auto">
              Daftar informasi yang dikecualikan dari keterbukaan informasi publik sesuai peraturan perundang-undangan
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Beranda</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Informasi Dikecualikan</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Informasi Dikecualikan</h2>
          <p className="text-gray-700 leading-relaxed">
            Berdasarkan Undang-Undang No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik, terdapat beberapa jenis
            informasi yang dikecualikan dari kewajiban untuk dibuka kepada publik. Berikut adalah daftar informasi
            dikecualikan yang telah dipublikasikan setiap tahunnya.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors duration-200 cursor-pointer">
                    {article.title}
                  </h3>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <UserIcon className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    <span>{article.comments} Comments</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TagIcon className="h-4 w-4" />
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>

                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Information */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Tambahan</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Dasar Hukum</h4>
              <ul className="space-y-1">
                <li>• UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik</li>
                <li>• PP No. 61 Tahun 2010 tentang Pelaksanaan UU KIP</li>
                <li>• Peraturan Komisi Informasi terkait</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Kontak</h4>
              <p>Untuk pertanyaan lebih lanjut mengenai informasi dikecualikan, silakan hubungi:</p>
              <p className="mt-2">
                <strong>PPID Kecamatan Taman Kota Madiun</strong>
                <br />
                Email: ppid@tamankotamadiun.go.id
                <br />
                Telepon: (0351) 123456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
