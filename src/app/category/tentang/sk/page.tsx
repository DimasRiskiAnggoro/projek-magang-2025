"use client";

import React, { useState } from "react";

// Struktur data folder SK
interface SKFile {
  name: string;
  url: string;
}

interface SKFolder {
  name: string;
  date: string;
  author: string;
  files: SKFile[];
}

const skFolders: SKFolder[] = [
  {
    name: "SK Tahun 2023",
    date: "5 Agustus, 2023",
    author: "admin",
    files: [
      { name: "SK Lurah 2023", url: "/pdf/2023/sk-lurah.pdf" },
      { name: "SK RW 2023", url: "/pdf/2023/sk-rw.pdf" },
      { name: "SK RT 2023", url: "/pdf/2023/sk-rt.pdf" },
    ],
  },
  {
    name: "SK Tahun 2024",
    date: "12 Januari, 2024",
    author: "admin",
    files: [
      { name: "SK RT 2024", url: "/pdf/2024/sk-rt.pdf" },
      { name: "SK RW 2024", url: "/pdf/2024/sk-rw.pdf" },
    ],
  },
  {
    name: "SK Tahun 2025",
    date: "3 Februari, 2025",
    author: "ppidtaman1",
    files: [
      { name: "SK Sekretaris 2025", url: "/pdf/2025/sk-sekretaris.pdf" },
      { name: "SK Lurah 2025", url: "/pdf/2025/sk-lurah.pdf" },
      { name: "SK RW 2025", url: "/pdf/2025/sk-rw.pdf" },
      { name: "SK RT 2025", url: "/pdf/2025/sk-rt.pdf" },
    ],
  },
];

export default function SKPage() {
  const [openFolder, setOpenFolder] = useState<number | null>(null);

  const toggleFolder = (index: number) => {
    setOpenFolder(openFolder === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          DAFTAR SK KECAMATAN TAMAN KOTA MADIUN
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded"></div>
      </div>

      {/* List Folder */}
      <div className="max-w-6xl mx-auto space-y-6">
        {skFolders.map((folder, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden border"
          >
            <button
              onClick={() => toggleFolder(index)}
              className="w-full flex flex-col lg:flex-row text-left focus:outline-none"
            >
              {/* Bagian Gambar */}
              <div className="lg:w-1/3 h-48 lg:h-auto">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">📂 Folder SK</span>
                </div>
              </div>

              {/* Bagian Konten */}
              <div className="lg:w-2/3 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {folder.name}
                </h2>

                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 space-x-4">
                  <div className="flex items-center">
                    <span className="text-blue-600">📅</span>
                    <span className="ml-1">{folder.date}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-600">👤</span>
                    <span className="ml-1">{folder.author}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-2">
                  {openFolder === index
                    ? "Klik lagi untuk menutup daftar file."
                    : "Klik untuk melihat daftar file SK."}
                </p>
              </div>
            </button>

            {/* List file PDF */}
            {openFolder === index && (
              <div className="px-6 pb-4">
                <ul className="space-y-2">
                  {folder.files.map((file, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded hover:bg-gray-100"
                    >
                      <span>{file.name}</span>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Lihat PDF
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
