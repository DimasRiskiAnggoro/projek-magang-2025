"use client";
import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Array gambar untuk slider
  const slides = [
    {
      image: "/image/image-4.jpeg",
      video: "/video/PesonaKotaMadiun.mp4"
    },
    {
      image: "/image/hut80.jpg",
      video: null
    }
  ];

  // Auto slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.video && index === 0 ? (
            // Video untuk slide pertama
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={slide.video} type="video/mp4" />
              <div className="absolute inset-0 w-full h-full bg-[url('/image/image-4.jpeg')] bg-cover bg-no-repeat" />
            </video>
          ) : (
            // Gambar untuk slide lainnya
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
          )}
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 h-full w-full bg-gray-900/75" />

      {/* Content */}
      <div className="grid min-h-screen px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/icons/madiun-hero.png"
              alt="Logo Kota Madiun"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mx-auto object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))'
              }}
            />
          </div>

          <Typography variant="h1" color="white">
            Selamat Datang di Website Kecamatan Taman kota Madiun
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-4 mb-12 w-full md:max-w-full lg:max-w-3xl"
          >
            Website resmi informasi dan komunikasi publik Kota Madiun
          </Typography>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Optional: Arrow Navigation */}
      <button
        onClick={() => goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left text-white"></i>
      </button>
      
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right text-white"></i>
      </button>
    </div>
  );
}

export default Hero;