"use client";

import React, { useState } from "react";
import Link from "next/link";

// Tipe data berita
type NewsItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  image: string;
};

// Format tanggal Indonesia
const formatTanggal = (tanggal: string) => {
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Komponen kartu berita
const NewsCard = ({ news }: { news: NewsItem }) => (
  <article className="bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm rounded-lg overflow-hidden transform hover:scale-[1.01] hover:shadow-md duration-300">
    <div className="relative h-40 overflow-hidden">
      <img
        src={news.image}
        alt={news.title}
        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-4">
      <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
        {news.title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2 mb-1">
        {news.description}
      </p>
      <p className="text-xs text-gray-500 mb-3">
        Diposting oleh {news.author} pada {formatTanggal(news.date)}
      </p>
      <Link
        href={`/berita/${news.id}`}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow hover:from-blue-500 hover:to-blue-700 transition-all duration-300 group"
      >
        Baca Selengkapnya
        <svg
          className="w-4 h-4 transition-transform transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </article>
);

// Dummy data (bisa diganti dari backend)
const dummyNews: NewsItem[] = Array.from({ length: 23 }).map((_, i) => ({
  id: i + 1,
  title: `Judul Berita ${i + 1}`,
  description:
    "Ini adalah deskripsi singkat dari berita yang ditampilkan pada halaman ini. Berita ini berisi informasi penting.",
  category: "Umum",
  author: "Admin Kecamatan",
  date: "2025-07-31",
  image: "/img/kesehatan.jpg",
}));

const BeritaPage = () => {
  const perPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyNews.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedNews = dummyNews.slice(startIndex, startIndex + perPage);

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Berita Terbaru
      </h1>

      {/* Grid berita */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm rounded-md transition border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-700 border-blue-300 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </main>
  );
};

export default BeritaPage;
