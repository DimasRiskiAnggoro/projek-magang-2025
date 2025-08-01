import React, { useState, useEffect } from 'react';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const topCards = [
    {
      title: "Seputar",
      subtitle: "Kota Madiun",
      icon: "❓",
      bgColor: "from-teal-400 to-teal-600",
      links: [
        "Website Kota Madiun",
        "SmartCity Kota Madiun", 
        "Data Sektoral Kota Madiun",
        "SPBE Kota Madiun",
        "Madiun Today",
        "E-Book Kota Madiun"
      ]
    },
    {
      title: "Seputar",
      subtitle: "Pelayanan Kota Madiun",
      icon: "📢",
      bgColor: "from-teal-500 to-teal-700",
      links: [
        "Awak Sigap Kota Madiun",
        "PPID Kota Madiun",
        "Kontribusi Berita",
        "Ayo Ke Madiun"
      ]
    }
  ];

  const footerSections = [
    {
      title: "Kominfo Kota Madiun",
      content: [
        "Jl. Perintis Kemerdekaan No. 32",
        "Kel. Kartoharjo, Kecamatan Kartoharjo,",
        "Kota Madiun, Jawa Timur.",
        "",
        "Jam Pelayanan :",
        "Senin - Kamis (07.00 - 15.30)",
        "Jumat (06.30 - 14.30)"
      ]
    },
    {
      title: "Jelajahi",
      links: [
        "Sipdok Kota Madiun",
        "Beasiswa Kota Madiun", 
        "Awak Sigap Kota Madiun",
        "Pecat Tumpang Kota Madiun",
        "Sicaker Kota Madiun",
        "Madiun Single Submission"
      ]
    },
    {
      title: "Agenda Madiun",
      links: [
        "Agenda Kota Madiun",
        "Agenda Walikota Madiun",
        "Agenda Wakil Walikota Madiun",
        "Agenda Sekretariat Daerah"
      ]
    },
    {
      title: "Berita Madiun",
      links: [
        "Madiun Today",
        "Analisa Berita",
        "Madiun Kota",
        "93 FM Suara Madiun",
        "Seputar Kota Madiun"
      ]
    }
  ];

  const socialIcons = [
    { name: 'Facebook', icon: 'f', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: 't', color: 'hover:bg-sky-500' },
    { name: 'Instagram', icon: 'i', color: 'hover:bg-pink-500' }
  ];

  return (
    <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 min-h-screen text-white relative overflow-hidden">
      
      {/* Animated Background Elements for entire container */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-white rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white rotate-45 animate-pulse"></div>
      </div>

      {/* Top Cards Section */}
      <div className="relative z-10 container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {topCards.map((card, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                isVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header with Gradient */}
              <div className={`h-2 bg-gradient-to-r ${card.bgColor} transition-all duration-500 ${
                hoveredCard === index ? 'h-3 shadow-lg' : ''
              }`}></div>
              
              <div className="bg-white rounded-b-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} transform rotate-12 scale-150 transition-transform duration-700 ${
                    hoveredCard === index ? 'rotate-45 scale-200' : ''
                  }`}></div>
                </div>

                <div className="p-6 relative z-10">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`text-4xl transform transition-all duration-500 ${
                      hoveredCard === index ? 'scale-125 rotate-12' : ''
                    }`}>
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-teal-600 text-sm font-normal">{card.title}</p>
                      <h3 className="text-2xl font-normal text-gray-800">{card.subtitle}</h3>
                    </div>
                  </div>

                  {/* Links Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {card.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href="#"
                        className="group flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-all duration-300 p-2 rounded-lg hover:bg-teal-50 relative overflow-hidden"
                        style={{ transitionDelay: `${linkIndex * 50}ms` }}
                      >
                        <span className="text-teal-400 group-hover:translate-x-1 transition-transform duration-300">▶</span>
                        <span className="text-sm font-normal group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                        
                        {/* Slide effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-10"></div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${card.bgColor} opacity-0 transition-opacity duration-500 ${
                  hoveredCard === index ? 'opacity-10' : ''
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="relative z-10 container mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div 
                key={section.title}
                className={`transform transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                onMouseEnter={() => setHoveredSection(index)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <div className="relative group">
                  
                  {/* Section Title with Underline Animation */}
                  <h3 className="text-xl font-normal mb-6 text-white group-hover:text-teal-200 transition-colors duration-300 relative">
                    {section.title}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-300 to-white group-hover:w-full transition-all duration-700"></div>
                    
                    {/* Glowing dot */}
                    <div className="absolute -left-3 top-1/2 w-2 h-2 bg-teal-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1/2 group-hover:scale-150"></div>
                  </h3>
                  
                  {section.content ? (
                    <div className="space-y-2">
                      {section.content.map((line, idx) => (
                        <p 
                          key={idx} 
                          className={`text-teal-100 hover:text-white transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
                            line.includes('Jam Pelayanan') ? 'font-normal mt-4 text-teal-200' : ''
                          } ${line === '' ? 'h-2' : ''}`}
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {section.links && section.links.map((link, idx) => (
                        <li key={idx}>
                          <a 
                            href="#" 
                            className="group/link text-teal-100 hover:text-white transition-all duration-500 flex items-center relative overflow-hidden p-2 rounded-lg -m-2"
                            style={{ transitionDelay: `${idx * 75}ms` }}
                          >
                            <span className="relative z-10 transform group-hover/link:translate-x-3 transition-all duration-300 flex items-center gap-3">
                              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full group-hover/link:scale-150 group-hover/link:bg-white transition-all duration-300"></span>
                              <span className="group-hover/link:font-normal transition-all duration-300">{link}</span>
                            </span>
                            
                            {/* Multi-layer hover effects */}
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 transform -translate-x-full group-hover/link:translate-x-0 transition-transform duration-500 opacity-20 rounded-lg"></div>
                            <div className="absolute inset-0 bg-white transform scale-0 group-hover/link:scale-100 transition-transform duration-300 opacity-5 rounded-lg"></div>
                            
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/link:opacity-30 transform -skew-x-12 -translate-x-full group-hover/link:translate-x-full transition-all duration-700"></div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section with Social Icons */}
          <div className="mt-16 pt-8 border-t border-teal-400 border-opacity-30 relative">
            
            {/* Animated border line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse opacity-50"></div>
            </div>

            <div className="flex justify-end">
              <div className="flex space-x-4">
                {socialIcons.map((social, idx) => (
                  <div 
                    key={social.name}
                    className={`w-12 h-12 bg-transparent border-2 border-white rounded-lg flex items-center justify-center hover:bg-white hover:text-teal-600 transition-all duration-500 transform hover:scale-110 hover:rotate-12 cursor-pointer relative overflow-hidden group ${social.color}`}
                    style={{
                      animation: `float 3s ease-in-out infinite ${idx * 0.5}s`
                    }}
                  >
                    <span className="text-lg font-bold uppercase z-10 relative transition-all duration-300 group-hover:scale-125">
                      {social.icon}
                    </span>
                    
                    {/* Ripple effect */}
                    <div className="absolute inset-0 bg-white rounded-lg scale-0 group-hover:scale-150 transition-transform duration-700 opacity-0 group-hover:opacity-20"></div>
                    
                    {/* Border glow */}
                    <div className="absolute inset-0 rounded-lg border-2 border-teal-300 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(5deg); }
          }
        `}</style>
      </div>
  );
}

export { Footer };
export default Footer;