import { Phone, Mail, Building, FileText, Calendar } from "lucide-react"

export default function InformasiBerkalaPage() {
  const informasiBerkala = [
    {
      judul: "Laporan Kependudukan Triwulan I 2024",
      tanggal: "15 Maret 2024",
      kategori: "Kependudukan",
      deskripsi: "Data statistik kependudukan Kecamatan Taman periode Januari-Maret 2024",
      ukuranFile: "2.5 MB",
      format: "PDF",
    },
    {
      judul: "Program Pemberdayaan Masyarakat",
      tanggal: "10 Maret 2024",
      kategori: "Pemberdayaan",
      deskripsi: "Laporan pelaksanaan program pemberdayaan masyarakat di 12 kelurahan",
      ukuranFile: "1.8 MB",
      format: "PDF",
    },
    {
      judul: "Rekapitulasi Pelayanan Publik",
      tanggal: "5 Maret 2024",
      kategori: "Pelayanan",
      deskripsi: "Data pelayanan administrasi kependudukan dan perizinan bulan Februari 2024",
      ukuranFile: "3.2 MB",
      format: "PDF",
    },
    {
      judul: "Kegiatan Gotong Royong Lingkungan",
      tanggal: "28 Februari 2024",
      kategori: "Lingkungan",
      deskripsi: "Dokumentasi kegiatan gotong royong pembersihan lingkungan se-Kecamatan Taman",
      ukuranFile: "4.1 MB",
      format: "PDF",
    },
    {
      judul: "Laporan Anggaran Triwulan I 2024",
      tanggal: "20 Februari 2024",
      kategori: "Keuangan",
      deskripsi: "Realisasi anggaran dan belanja Kecamatan Taman periode Januari-Maret 2024",
      ukuranFile: "1.9 MB",
      format: "PDF",
    },
    {
      judul: "Data Infrastruktur Wilayah",
      tanggal: "15 Februari 2024",
      kategori: "Infrastruktur",
      deskripsi: "Kondisi dan perkembangan infrastruktur jalan, jembatan, dan fasilitas umum",
      ukuranFile: "2.7 MB",
      format: "PDF",
    },
  ]

  const kategoriFilter = [
    "Semua",
    "Kependudukan",
    "Pemberdayaan",
    "Pelayanan",
    "Lingkungan",
    "Keuangan",
    "Infrastruktur",
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Informasi Berkala PPID</h1>
            <p className="text-xl text-blue-100 mb-6">Kecamatan Taman - Kota Madiun</p>
            <p className="text-lg text-blue-50 leading-relaxed">
              Akses informasi publik yang wajib disediakan dan diumumkan secara berkala sesuai dengan Undang-Undang No.
              14 Tahun 2008 tentang Keterbukaan Informasi Publik
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {kategoriFilter.map((kategori, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mb-2 ${
                  index === 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {kategori}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Informasi Berkala Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {informasiBerkala.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {info.kategori}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {info.tanggal}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold leading-tight mb-2">{info.judul}</h3>
                  <p className="text-sm text-gray-600 mb-4">{info.deskripsi}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {info.format}
                      </span>
                      <span>{info.ukuranFile}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Unduh
                    </button>
                    <button className="bg-white text-gray-700 border border-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      Lihat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
              Muat Lebih Banyak
            </button>
          </div>
        </div>
      </section>

      {/* Info PPID */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h2 className="flex items-center text-xl font-semibold mb-4">
                  <Building className="h-6 w-6 mr-2 text-blue-600" />
                  Tentang PPID Kecamatan Taman
                </h2>

                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Pejabat Pengelola Informasi dan Dokumentasi (PPID) Kecamatan Taman bertugas untuk mengelola,
                    menyimpan, mendokumentasikan, menyediakan, dan/atau melayani informasi publik sesuai dengan
                    ketentuan peraturan perundang-undangan.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Kontak PPID</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span>(0351) 123-4567</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <span>ppid.taman@madiunkota.go.id</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Jam Layanan</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>Senin - Jumat: 08.00 - 16.00 WIB</p>
                        <p>Sabtu: 08.00 - 12.00 WIB</p>
                        <p>Minggu & Hari Libur: Tutup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
