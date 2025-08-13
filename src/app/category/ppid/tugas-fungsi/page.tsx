import { MapPin, Phone, Mail, Clock, Users, Building, FileText, CheckCircle, Target, Shield, Eye } from "lucide-react"

export default function TugasFungsiPPID() {
  const tugasUtama = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Penyediaan Informasi Publik",
      description:
        "Menyediakan, memberikan, dan/atau menerbitkan informasi publik yang berada di bawah penguasaannya kepada pemohon informasi publik",
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Pengklasifikasian Informasi",
      description:
        "Melakukan pengklasifikasian informasi publik dan/atau pengubahannya sesuai dengan ketentuan peraturan perundang-undangan",
    },
    {
      icon: <Building className="w-6 h-6 text-blue-600" />,
      title: "Pengelolaan Dokumentasi",
      description: "Melakukan pengelolaan, pemeliharaan, dan penyimpanan informasi publik yang efisien dan efektif",
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      title: "Pengujian Konsekuensi",
      description:
        "Melakukan pengujian tentang konsekuensi yang timbul apabila suatu informasi diberikan kepada pemohon informasi publik",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Koordinasi dan Konsultasi",
      description: "Melakukan koordinasi dan konsultasi dengan atasan dalam rangka pelaksanaan tugas dan fungsi PPID",
    },
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Pelaporan Pelaksanaan",
      description: "Melakukan pelaporan pelaksanaan tugas kepada PPID Utama secara berkala",
    },
  ]

  const fungsiUtama = [
    "Pelaksanaan kebijakan keterbukaan informasi publik di lingkungan Kecamatan Taman",
    "Koordinasi pengumpulan bahan informasi publik dari unit kerja di lingkungan Kecamatan Taman",
    "Koordinasi penyediaan informasi publik yang mudah diakses oleh masyarakat",
    "Koordinasi penyusunan laporan pelaksanaan pelayanan informasi publik",
    "Pelaksanaan rapat koordinasi dan evaluasi pelaksanaan pelayanan informasi publik",
    "Pelaksanaan sosialisasi ketentuan pelayanan informasi publik kepada seluruh unit kerja",
    "Fasilitasi penyelesaian sengketa informasi publik melalui mediasi dan/atau ajudikasi non litigasi",
  ]

  const strukturPPID = [
    {
      jabatan: "PPID Pelaksana",
      nama: "Camat Taman",
      tugas: "Penanggung jawab utama pelaksanaan keterbukaan informasi publik",
    },
    {
      jabatan: "Sekretaris PPID",
      nama: "Sekretaris Camat",
      tugas: "Koordinasi dan administrasi pelayanan informasi publik",
    },
    {
      jabatan: "Anggota PPID",
      nama: "Kepala Seksi Pemerintahan",
      tugas: "Pengelolaan informasi bidang pemerintahan dan trantib",
    },
    {
      jabatan: "Anggota PPID",
      nama: "Kepala Seksi Kesejahteraan",
      tugas: "Pengelolaan informasi bidang kesejahteraan masyarakat",
    },
    {
      jabatan: "Anggota PPID",
      nama: "Kepala Seksi Pelayanan",
      tugas: "Pengelolaan informasi bidang pelayanan umum",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tugas dan Fungsi PPID Pelaksana</h1>
          <h2 className="text-2xl font-semibold mb-6">Kecamatan Taman - Kota Madiun</h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            Pejabat Pengelola Informasi dan Dokumentasi (PPID) Pelaksana bertugas melaksanakan kebijakan keterbukaan
            informasi publik sesuai dengan Undang-Undang No. 14 Tahun 2008
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Pengertian PPID */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Building className="w-8 h-8 text-blue-600 mr-3" />
            Pengertian PPID Pelaksana
          </h3>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              PPID Pelaksana adalah pejabat yang bertanggung jawab di bidang penyimpanan, pendokumentasian, penyediaan,
              dan/atau pelayanan informasi di lingkungan Kecamatan Taman.
            </p>
            <p className="mb-4">
              PPID Pelaksana berkedudukan di bawah dan bertanggung jawab kepada PPID Utama Pemerintah Kota Madiun serta
              memiliki tugas membantu PPID Utama dalam melaksanakan tanggung jawab, tugas, dan kewajibannya.
            </p>
          </div>
        </div>

        {/* Tugas Utama */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mr-3" />
            Tugas Utama PPID Pelaksana
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {tugasUtama.map((tugas, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{tugas.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{tugas.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{tugas.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fungsi Utama */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <Target className="w-8 h-8 text-blue-600 mr-3" />
            Fungsi Utama PPID Pelaksana
          </h3>
          <div className="space-y-4">
            {fungsiUtama.map((fungsi, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{fungsi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Struktur PPID */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            Struktur PPID Pelaksana Kecamatan Taman
          </h3>
          <div className="space-y-4">
            {strukturPPID.map((anggota, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h4 className="text-lg font-semibold text-gray-800">{anggota.jabatan}</h4>
                    <p className="text-blue-600 font-medium">{anggota.nama}</p>
                  </div>
                  <div className="md:max-w-md">
                    <p className="text-gray-600 text-sm">{anggota.tugas}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kontak PPID */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
            <Phone className="w-8 h-8 text-blue-600 mr-3" />
            Kontak PPID Pelaksana
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Alamat</p>
                  <p className="text-gray-600">Jl. Raya Taman No. 1, Kecamatan Taman, Kota Madiun</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Telepon</p>
                  <p className="text-gray-600">(0351) 123456</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">ppid@tamankotamadiun.go.id</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Jam Layanan</p>
                  <p className="text-gray-600">Senin - Jumat: 08.00 - 16.00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
