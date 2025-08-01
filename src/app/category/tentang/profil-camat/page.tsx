import React from 'react';
import { User, MapPin, GraduationCap, FileText, Award } from 'lucide-react';

const ProfileCamat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 pt-24 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 px-8 py-16">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Photo Section */}
              <div className="relative">
                <div className="w-52 h-52 bg-white rounded-full p-3 shadow-2xl">
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-50">
                    <User size={90} className="text-gray-400" />
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-yellow-400 rounded-full p-4 shadow-xl border-4 border-white">
                  <Award size={28} className="text-white" />
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center lg:text-left text-white">
                <h2 className="text-4xl font-bold mb-3 text-white">M. YUSUF ASMADI, S.Sos., M.M.</h2>
                <p className="text-2xl text-blue-100 mb-6 font-medium">Camat Taman</p>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-blue-100 text-lg">
                  <MapPin size={20} />
                  <span>Kecamatan Taman, Kota Madiun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="p-10">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left Column - Data Kepegawaian */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-500 p-3 rounded-xl shadow-lg">
                      <FileText className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Data Kepegawaian</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold text-lg">NIP</span>
                        <span className="text-gray-800 font-mono text-lg">19721020 199803 1 009</span>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold text-lg">Pangkat</span>
                        <span className="text-gray-800 font-semibold text-lg">Pembina</span>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold text-lg">Golongan</span>
                        <span className="text-blue-600 font-bold text-xl">IV/a</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Informasi Kontak */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-purple-500 p-3 rounded-xl shadow-lg">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Informasi Kontak</h3>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <p className="text-gray-700 font-semibold text-lg mb-3">Alamat Kantor:</p>
                    <p className="text-gray-800 text-lg font-medium">Jl. MT. Haryono</p>
                    <p className="text-gray-800 text-lg font-medium">Kota Madiun</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-500 p-3 rounded-xl shadow-lg">
                      <GraduationCap className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Pendidikan</h3>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                    <span className="text-4xl font-bold text-green-600 block mb-2">S2</span>
                    <p className="text-gray-600 text-lg">Magister (Master's Degree)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gelar dan Jabatan Section */}
            <div className="mt-12 bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Informasi Gelar & Jabatan
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">S.Sos.</div>
                  <div className="text-sm text-gray-600 font-medium">Sarjana Sosial</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-indigo-100">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">M.M.</div>
                  <div className="text-sm text-gray-600 font-medium">Magister Manajemen</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-2">IV/a</div>
                  <div className="text-sm text-gray-600 font-medium">Golongan Pembina</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg text-center border border-purple-100">
                  <div className="text-3xl font-bold text-purple-600 mb-2">Camat</div>
                  <div className="text-sm text-gray-600 font-medium">Kecamatan Taman</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Mission Section */}
        <div className="mt-10 bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Komitmen Pelayanan Publik
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <Award className="text-blue-600" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Profesional</h4>
              <p className="text-gray-600 leading-relaxed">
                Melayani masyarakat dengan profesional dan berintegritas tinggi dalam setiap pelayanan publik
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <User className="text-green-600" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Responsif</h4>
              <p className="text-gray-600 leading-relaxed">
                Tanggap dan cepat merespon kebutuhan serta aspirasi masyarakat Kecamatan Taman
              </p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow duration-300">
                <MapPin className="text-purple-600" size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Inovatif</h4>
              <p className="text-gray-600 leading-relaxed">
                Mengembangkan inovasi pelayanan untuk kemajuan dan kesejahteraan masyarakat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCamat;