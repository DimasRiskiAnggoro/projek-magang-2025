// components/VisiMisiArticle.tsx
import React from 'react';
import Link from 'next/link';

const VisiMisiArticle: React.FC = () => {
  return (
    <article className="max-w-4xl mx-auto bg-white px-6 py-8" style={{ marginTop: '120px' }}>
      {/* Article Meta - Moved below navbar */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            12 September, 2023
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            ppidtaman1
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            0 Comments
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            2 categories
          </span>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-8">
        <div className="border-l-4 border-blue-500 pl-6 py-4 bg-gray-50">
          <p className="text-gray-700 leading-relaxed">
            Dalam pelaksanaan tugasnya agar lebih terarah, berhasil dan berdaya guna, maka ditetapkan visi, misi dan strategi Kecamatan Taman Kota Madiun dalam rangka mewujudkan tujuan yang telah ditetapkan sesuai dengan Visi dan Misi Walikota Madiun Tahun 2019-2024.
          </p>
        </div>
      </div>

      {/* Visi Misi Walikota Section */}
      <div className="mb-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Visi dan Misi Walikota Madiun
          </h2>
          <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
            Tahun 2019-2024
          </span>
        </div>
        
        {/* Visi */}
        <div className="mb-8">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <h3 className="text-xl font-semibold">Visi</h3>
            </div>
          </div>
          <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-6">
            <p className="text-center text-lg text-gray-800 font-medium italic">
              "Terwujudnya Pemerintahan Bersih Berwibawa Menuju Masyarakat Sejahtera"
            </p>
          </div>
        </div>

        {/* Misi */}
        <div className="mb-8">
          <div className="bg-green-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <h3 className="text-xl font-semibold">Misi</h3>
            </div>
          </div>
          <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-6">
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1 flex-shrink-0">1</span>
                <span className="text-gray-700">Wewujudkan Pemerintahan yang Baik <em>(Good Governance)</em></span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1 flex-shrink-0">2</span>
                <span className="text-gray-700">Mewujudkan Pembangunan yang Berwawasan Lingkungan</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1 flex-shrink-0">3</span>
                <span className="text-gray-700">Meningkatkan Kualitas Hidup Masyarakat Kota Madiun</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1 flex-shrink-0">4</span>
                <span className="text-gray-700">Mewujudkan Kemandirian Ekonomi dan Meratakan Tingkat Kesejahteraan Masyarakat Kota Madiun</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Kecamatan Taman Section */}
      <div className="mb-10">
        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            Visi Kecamatan Taman mengikuti visi Pemerintah Kota Madiun yaitu{' '}
            <span className="font-semibold text-purple-700">
              "Terwujudnya Pemerintahan Bersih Berwibawa Menuju Masyarakat Sejahtera"
            </span>{' '}
            dan mengambil misi 1 yaitu{' '}
            <span className="font-semibold text-purple-700">
              "Mewujudkan Pemerintahan yang Baik (<em>Good Governance</em>)"
            </span>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Sehingga Kecamatan Taman memiliki tujuan sesuai misi 1 yaitu{' '}
            <span className="font-semibold text-purple-700">
              "Terwujudnya Pemerintahan Kecamatan yang Baik"
            </span>{' '}
            dan memiliki 3 (tiga) sasaran.
          </p>
        </div>

        {/* Sasaran */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Sasaran Kecamatan Taman</h3>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-blue-50 rounded-lg">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1 flex-shrink-0">1</span>
              <p className="text-gray-700">Meningkatnya Akuntabilitas Kinerja dan Keuangan di Kecamatan Taman</p>
            </div>
            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1 flex-shrink-0">2</span>
              <p className="text-gray-700">Meningkatnya Pemberdayaan Masyarakat Kecamatan</p>
            </div>
            <div className="flex items-start p-4 bg-purple-50 rounded-lg">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1 flex-shrink-0">3</span>
              <p className="text-gray-700">Meningkatnya Kualitas Pelayanan Publik di Kecamatan Taman</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-gray-600 font-medium">Category:</span>
          <Link href="/category/informasi-berkala" className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors">
            Informasi Secara Berkala
          </Link>
          <Link href="/category/visi-misi" className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors">
            Visi dan Misi
          </Link>
        </div>
      </div>

      {/* Post Navigation */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Post navigation</h4>
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600 font-medium">Previous:</span>
            <Link href="/artikel/studi-lapangan-kualitas-pelayanan" className="block text-blue-600 hover:text-blue-800 transition-colors mt-1">
              Kecamatan Taman Terima Studi Lapangan Kualitas Pelayanan Publik untuk PKP Angkatan III dari PPSDM Kemendagri Regional Yogyakarta
            </Link>
          </div>
          <div>
            <span className="text-sm text-gray-600 font-medium">Next:</span>
            <Link href="/artikel/lowongan-pppk-2023" className="block text-blue-600 hover:text-blue-800 transition-colors mt-1">
              LOWONGAN PPPK KOTA MADIUN TAHUN 2023
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VisiMisiArticle;