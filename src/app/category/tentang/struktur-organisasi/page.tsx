// app/struktur-organisasi/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const StrukturOrganisasiPage: React.FC = () => {
  const strukturData = [
    {
      id: 1,
      name: "Struktur Organisasi Kecamatan Taman",
      image: "/struktur-organisasi/struktur.png", // path ke public/struktur-organisasi/struktur.png
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Struktur Organisasi Kecamatan Taman
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {strukturData.map((item) => (
            <Link
              key={item.id}
              href={`/struktur-organisasi/${item.id}`}
              className="block border rounded-lg p-4 hover:bg-gray-50"
            >
              <h2 className="text-lg font-semibold">{item.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasiPage;
