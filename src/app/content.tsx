"use client";

import React from "react";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";

export function Content() {
  return (
    <section className="py-12 px-8">
      <div className="mx-auto max-w-screen-md">
        <Typography color="blue" variant="h6">
          #Diskominfo #KotaMadiun #SmartCity
        </Typography>
        <Typography className="my-12 font-normal !text-gray-500">
          Dinas Komunikasi dan Informatika (Diskominfo) Kota Madiun memegang
          peranan kunci dalam era transformasi digital. Sebagai ujung tombak
          penyebaran informasi pemerintah dan pelayanan publik berbasis
          teknologi, Diskominfo berkomitmen untuk mewujudkan tata kelola
          pemerintahan yang transparan, efektif, dan inovatif bagi seluruh
          masyarakat Kota Madiun.
        </Typography>

        <Typography variant="h2" color="blue-gray" className="mt-8 mb-6">
          Peran Vital Diskominfo dalam Pembangunan Kota
        </Typography>

        <Typography className="my-10 font-normal !text-gray-500">
          Diskominfo Kota Madiun memiliki beberapa bidang utama yang menjadi
          fokus kerja untuk mendukung visi kota. a. Pengelolaan Informasi dan
          Komunikasi Publik: Bertanggung jawab menyebarluaskan informasi
          program dan kebijakan pemerintah melalui berbagai kanal media. b.
          Infrastruktur dan Teknologi: Mengelola infrastruktur jaringan, pusat
          data, dan keamanan siber untuk mendukung operasional pemerintahan
          serta layanan digital bagi masyarakat. c. Pengembangan Aplikasi:
          Membangun dan mengembangkan aplikasi untuk mempermudah akses layanan
          publik.
        </Typography>
        <Image
          width={768}
          height={500}
          src="/image/dokumentasi-kominfo.jpg"
          alt="kegiatan-diskominfo-madiun"
          className="mb-4 h-[28rem] w-full rounded-xl object-cover"
        />
        <Typography variant="small" className="font-normal !text-gray-500">
          Dokumentasi Kegiatan Diskominfo Kota Madiun
        </Typography>

        <Typography className="my-12 font-normal !text-gray-500">
          Melalui pengelolaan media sosial yang aktif dan pengembangan
          aplikasi layanan publik, Diskominfo berupaya mendekatkan pemerintah
          dengan warganya.
          <br />
          <br />
          Program seperti penyediaan Wi-Fi gratis di ruang publik dan
          pengelolaan pusat data kota adalah beberapa contoh nyata dari
          implementasi teknologi untuk meningkatkan kesejahteraan masyarakat.
          Inovasi terus dilakukan untuk menjawab tantangan zaman dan kebutuhan
          warga yang dinamis.
        </Typography>

        <Typography variant="h2" color="blue-gray" className="mt-8 mb-6">
          Mewujudkan Madiun sebagai Smart City
        </Typography>

        <Typography className="my-10 font-normal !text-gray-500">
          Konsep Smart City di Kota Madiun tidak hanya sebatas penerapan
          teknologi, tetapi juga tentang menciptakan ekosistem digital yang
          terintegrasi. Ini mencakup smart governance untuk pemerintahan yang
          transparan dan efisien, smart branding untuk mempromosikan potensi
          kota, serta smart living untuk meningkatkan kualitas hidup warga.
          <br />
          <br />
          Diskominfo berada di garda terdepan dalam mengorkestrasi
          inisiatif-inisiatif ini, memastikan bahwa setiap langkah teknologi
          yang diambil memberikan dampak positif dan berkelanjutan bagi Kota
          Madiun.
        </Typography>
        <div className="container mx-auto px-4 py-20">
          <div className="w-full mb-10 md:flex items-center justify-between">
            <div className="flex mb-5 md:mb-0 items-center gap-3">
              <Button size="sm" color="gray" variant="outlined">
                Informasi
              </Button>
              <Button size="sm" color="gray" variant="outlined">
                Teknologi
              </Button>
              <Button size="sm" color="gray" variant="outlined">
                Layanan
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 bg-[#35518D] hover:cursor-pointer rounded-lg flex items-center justify-center ">
                <i className="text-white fab fa-facebook text-lg" />
              </button>
              <button className="w-9 h-9 bg-[#EA4C89] hover:cursor-pointer rounded-lg flex items-center justify-center ">
                <i className="text-white fab fa-dribbble text-lg" />
              </button>
              <button className="w-9 h-9 bg-gray-900 hover:cursor-pointer rounded-lg flex items-center justify-center ">
                <i className="text-white fab fa-github text-lg" />
              </button>
            </div>
          </div>
          <div className=" md:flex items-center justify-between">
            <div className="mb-4 md:mb-0 md:flex items-center gap-5 max-w-2xl">
              <div className="h-full mb-3 md:mb-0 w-full max-h-[4rem] max-w-[4rem] md:max-w-[6rem] md:max-h-[6rem] rounded-lg ">
                <Image
                  width={768}
                  height={768}
                  src="/image/pimpinan-kominfo.jpeg"
                  className="rounded-2xl"
                  alt="profil-diskominfo"
                />
              </div>
              <div>
                <Typography
                  variant="h5"
                  className="mb-4 md:mb-0"
                  color="blue-gray"
                >
                  Pimpinan Diskominfo
                </Typography>
                <Typography className="w-full md:w-10/12 font-normal !text-gray-500">
                Noor Aflah, S.Kom
                </Typography>
              </div>
            </div>
            <a href="https://www.instagram.com/m.a.s.noor/" target="_blank" rel="noopener noreferrer">
              <Button
                color="gray"
                className="w-1/2 md:w-fit flex-shrink-0"
                size="md"
              >
                Ikuti
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;