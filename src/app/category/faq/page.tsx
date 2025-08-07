'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, MessageCircle, Building, Phone, Mail, Instagram, Facebook, MapPin, Globe } from 'lucide-react';

const FAQPage = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqData = [
    {
      question: "Jam berapakah pelayanan di kantor Kecamatan Taman?",
      answer: {
        type: "schedule",
        content: {
          title: "JAM PELAYANAN",
          schedule: [
            { day: "SENIN - KAMIS", time: "07.00 - 15.30 WIB" },
            { day: "JUMAT", time: "06.30 - 14.30 WIB" }
          ],
          contact: {
            phone: "(0351) 463297",
            email: "kecamatantaman@madiunksota.go.id",
            address: "JL TAMAN PRAJA No. 99 KOTA MADIUN"
          }
        }
      }
    },
    {
      question: "Bagaimana cara untuk memberikan saran dan aspirasi di Kecamatan Taman?",
      answer: {
        type: "contact",
        content: {
          title: "KRITIK, SARAN, KONSULTASI DAN PENGADUAN",
          methods: [
            { icon: "phone", label: "Telepon", value: "(0351) 463297" },
            { icon: "email", label: "Email", value: "kecamatantaman@madiunksota.go.id" },
            { icon: "email", label: "Email Alternatif", value: "kectaman@gmail.com" },
            { icon: "instagram", label: "Instagram", value: "kecamatantaman_madiun" },
            { icon: "facebook", label: "Facebook", value: "Kecamatan Taman" },
            { icon: "whatsapp", label: "WhatsApp", value: "085186056056" },
            { icon: "web", label: "Website", value: "kecamatan-taman.madiunksota.go.id" },
            { icon: "app", label: "Aplikasi LAPOR", value: "SPAN LAPOR!" }
          ]
        }
      }
    },
    {
      question: "Bagaimana cara sewa gedung Kecamatan Taman?",
      answer: {
        type: "rental",
        content: {
          title: "ALUR SEWA GEDUNG ABDI PRAJA KECAMATAN TAMAN",
          steps: [
            {
              number: "01",
              title: "LIHAT JADWAL PEMAKAIAN",
              description: "VIA WA: 085186056056\nVIA WEB: tinyurl.com/sl-noman\nPilih menu: Jadwal Gedung Kecamatan Taman"
            },
            {
              number: "02",
              title: "SYARAT",
              description: "Membuat Surat Permohonan di ajukan kepada Camat Taman dengan mencantumkan:\n• Waktu penggunaan, Perihal, Jumlah Peserta\n• Untuk penyewa perorangan/bukan instansi lampirkan scan KTP\n• Info lebih lanjut hub WA Kecamatan"
            },
            {
              number: "03",
              title: "TARIF",
              description: "PAGI: 1.250.000 (07.00 - 13.00)\nMALAM: 1.750.000 (17.00 - 22.00)\nSIANG + MALAM: 2.250.000"
            },
            {
              number: "04",
              title: "FASILITAS",
              description: "AC 4 STANDING\nSOUND SYSTEM\nMIC KABEL & STANDAR RAPAT\nLCD PROJECTOR\nMEJA 31 BUAH\nKURSI 150 BUAH\nTOILET\nPETUGAS PARKIR DAN KEBERSHAN"
            },
            {
              number: "05",
              title: "PEMBAYARAN",
              description: "Transfer ke Rekening Kas Daerah Kota Madiun\nBank Jatim: 0551021333\nCatatan:\n• Setelah Penetaan Layar Koordinasi dengan Petugas\n• Penyewa harus bertanggung jawab atas kebersihan dan keamanan Kecamatan Taman\n• Pengguna fasilitas bertanggung jawab atas kerusakan barang dan Ganti Rugi.\n\nkontak: kecamatan-taman.madiunksota.go.id"
            }
          ]
        }
      }
    }
  ];

  const renderIcon = (iconType) => {
    const iconMap = {
      phone: Phone,
      email: Mail,
      instagram: Instagram,
      facebook: Facebook,
      whatsapp: MessageCircle,
      web: Globe,
      app: Building
    };
    const Icon = iconMap[iconType] || Phone;
    return <Icon className="w-5 h-5" />;
  };

  const renderAnswer = (answer) => {
    if (answer.type === "schedule") {
      return (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-bold text-orange-800 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              {answer.content.title}
            </h4>
            <div className="space-y-2">
              {answer.content.schedule.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-3 rounded border">
                  <span className="font-semibold text-gray-700">{item.day}</span>
                  <span className="text-orange-600 font-bold">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h5 className="font-bold text-green-800 mb-2">Kontak & Lokasi:</h5>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-green-600" />
                <span>{answer.content.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green-600" />
                <span>{answer.content.contact.email}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-green-600 mt-1" />
                <span>{answer.content.contact.address}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (answer.type === "contact") {
      return (
        <div className="space-y-4">
          <h4 className="font-bold text-blue-800 mb-3">{answer.content.title}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {answer.content.methods.map((method, index) => (
              <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg border">
                <div className="text-blue-600 mr-3">
                  {renderIcon(method.icon)}
                </div>
                <div>
                  <div className="text-sm text-gray-600">{method.label}</div>
                  <div className="font-semibold text-gray-800">{method.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (answer.type === "rental") {
      return (
        <div className="space-y-6">
          <h4 className="font-bold text-purple-800 mb-4 text-center">{answer.content.title}</h4>
          <div className="space-y-6">
            {answer.content.steps.map((step, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                      {step.number}
                    </div>
                    <h5 className="font-bold text-purple-800">{step.title}</h5>
                  </div>
                  <div className="text-sm text-gray-700 whitespace-pre-line ml-11">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-24 pb-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-600 p-3 rounded-full mr-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">FAQ</h1>
                <p className="text-xl text-green-600 font-semibold">Kecamatan Taman Kota Madiun</p>
              </div>
            </div>
            <p className="text-gray-600">
              Frequently Asked Questions - Informasi layanan dan fasilitas Kecamatan Taman
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 text-green-600">
                  {openItem === index ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </div>
              </button>
              
              {openItem === index && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    {renderAnswer(item.answer)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Info Footer */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Kontak Kecamatan Taman</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2 text-green-600" />
                <span>(0351) 463297</span>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2 text-green-600" />
                <span>kecamatantaman@madiunksota.go.id</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                <span>Jl. Taman Praja No. 99 Kota Madiun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;