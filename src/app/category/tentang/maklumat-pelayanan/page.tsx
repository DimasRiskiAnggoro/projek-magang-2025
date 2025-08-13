import { MapPin, Phone, Mail, Clock, Users, CheckCircle, AlertCircle, FileText } from "lucide-react"

export default function MaklumatPelayananPage() {
  const komitmenPelayanan = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: "Pelayanan Prima",
      description: "Memberikan pelayanan yang cepat, tepat, dan memuaskan sesuai dengan standar yang ditetapkan",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Tepat Waktu",
      description: "Menyelesaikan setiap pelayanan sesuai dengan waktu yang telah ditentukan",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Ramah dan Profesional",
      description: "Melayani masyarakat dengan sikap ramah, sopan, dan profesional",
    },
    {
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      title: "Transparan",
      description: "Memberikan informasi yang jelas dan transparan mengenai prosedur dan persyaratan",
    },
  ]

  const standarPelayanan = [
    {
      jenis: "Surat Keterangan Domisili",
      waktu: "1 Hari Kerja",
      biaya: "Gratis",
      persyaratan: ["KTP Asli", "KK Asli", "Surat Pengantar RT/RW"],
    },
    {
      jenis: "Surat Keterangan Usaha",
      waktu: "1 Hari Kerja",
      biaya: "Gratis",
      persyaratan: ["KTP Asli", "KK Asli", "Surat Pengantar RT/RW", "Foto Tempat Usaha"],
    },
    {
      jenis: "Surat Keterangan Tidak Mampu",
      waktu: "1 Hari Kerja",
      biaya: "Gratis",
      persyaratan: ["KTP Asli", "KK Asli", "Surat Pengantar RT/RW", "Surat Keterangan Penghasilan"],
    },
    {
      jenis: "Legalisir Dokumen",
      waktu: "30 Menit",
      biaya: "Gratis",
      persyaratan: ["Dokumen Asli", "Fotocopy Dokumen"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Maklumat Pelayanan</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Komitmen Kecamatan Taman dalam memberikan pelayanan terbaik kepada masyarakat sesuai dengan prinsip
            pelayanan publik yang berkualitas
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Komitmen Pelayanan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Komitmen Pelayanan Kami</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {komitmenPelayanan.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Maklumat Resmi */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Maklumat Pelayanan</h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                DENGAN INI KAMI MENYATAKAN SANGGUP MENYELENGGARAKAN PELAYANAN SESUAI DENGAN STANDAR PELAYANAN YANG TELAH
                DITETAPKAN
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Apabila pelayanan yang diberikan tidak sesuai dengan standar pelayanan, kami siap menerima sanksi sesuai
                dengan peraturan perundang-undangan yang berlaku. Kami berkomitmen untuk terus meningkatkan kualitas
                pelayanan demi kepuasan masyarakat.
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Madiun, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <p className="font-semibold text-gray-800">Camat Taman</p>
              <div className="mt-16 mb-4">
                <p className="font-bold text-gray-800">Drs. H. SUYANTO, M.Si</p>
                <p className="text-gray-600">NIP. 19650815 199203 1 008</p>
              </div>
            </div>
          </div>
        </section>

        {/* Standar Pelayanan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Standar Pelayanan</h2>
          <div className="grid gap-6">
            {standarPelayanan.map((layanan, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Jenis Layanan</h3>
                    <p className="text-blue-600 font-medium">{layanan.jenis}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Waktu Penyelesaian</h3>
                    <p className="text-green-600 font-medium">{layanan.waktu}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Biaya</h3>
                    <p className="text-orange-600 font-medium">{layanan.biaya}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Persyaratan</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {layanan.persyaratan.map((syarat, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0" />
                          {syarat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jam Pelayanan */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Jam Pelayanan</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Hari Kerja</h3>
                <p className="text-gray-600">Senin - Jumat</p>
                <p className="text-xl font-bold text-blue-600">08:00 - 15:30 WIB</p>
              </div>
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Istirahat</h3>
                <p className="text-gray-600">Senin - Kamis</p>
                <p className="text-xl font-bold text-orange-600">12:00 - 13:00 WIB</p>
                <p className="text-gray-600 mt-2">Jumat</p>
                <p className="text-xl font-bold text-orange-600">11:30 - 13:00 WIB</p>
              </div>
            </div>
          </div>
        </section>

        {/* Kontak dan Pengaduan */}
        <section>
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Kontak & Pengaduan</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <MapPin className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Alamat</h3>
                <p className="text-green-100">
                  Jl. Raya Taman No. 123
                  <br />
                  Kecamatan Taman
                  <br />
                  Kota Madiun 63139
                </p>
              </div>
              <div>
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Telepon</h3>
                <p className="text-green-100">
                  (0351) 123456
                  <br />
                  Fax: (0351) 123457
                </p>
              </div>
              <div>
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-green-100">
                  kecamatan.taman@madiunkota.go.id
                  <br />
                  pengaduan.taman@madiunkota.go.id
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
