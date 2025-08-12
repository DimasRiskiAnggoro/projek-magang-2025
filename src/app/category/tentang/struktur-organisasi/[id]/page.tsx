// app/struktur-organisasi/[id]/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

const StrukturOrganisasiDetail: React.FC = () => {
  const params = useParams();
  const id = params.id;

  const strukturData = [
    {
      id: "1",
      name: "Struktur Organisasi Kecamatan Taman",
      image: "/struktur-organisasi/struktur.png",
    },
  ];

  const data = strukturData.find((item) => item.id === id);

  if (!data) {
    return <p className="text-center p-6">Data tidak ditemukan</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
        <div className="relative w-full h-[600px]">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-contain rounded-lg"
          />
        </div>
        <div className="mt-4">
          <Link href="/struktur-organisasi" className="text-blue-600 hover:underline">
            ← Kembali
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasiDetail;
