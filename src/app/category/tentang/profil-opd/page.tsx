// app/profil-opd/page.tsx
"use client";

import React from "react";
import Image from "next/image";

const profilOpdData = [
  {
    title: "Tupoksi Kecamatan Taman Kota Madiun",
    date: "5 August, 2024",
    author: "admin",
    category: "Profil OPD",
    description: "Download Disini",
    image: "/tupoksi.png", // tempatkan gambar di folder public
    buttonText: "Read More",
  },
  {
    title: "Profil Kecamatan Taman Kota Madiun",
    date: "5 August, 2024",
    author: "ppidtaman1",
    category: "Profil OPD",
    description:
      "KECAMATAN TAMAN KOTA MADIUN merupakan salah satu kecamatan... (isi deskripsi selengkapnya)",
    image: "/kantor.png", // tempatkan gambar kantor di folder public
    buttonText: "Read More",
  },
];

export default function ProfilOPDPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Category: Profil OPD</h1>
      <div className="grid gap-8">
        {profilOpdData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-pink-300 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row"
          >
            <div className="md:w-1/3 w-full relative h-60 md:h-auto">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between md:w-2/3">
              <div>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <div className="text-sm text-gray-500 mb-2">
                  📅 {item.date} | 👤 {item.author} | 📂 {item.category}
                </div>
                <p className="text-gray-700 text-sm mb-4">{item.description}</p>
              </div>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md self-start">
                {item.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
