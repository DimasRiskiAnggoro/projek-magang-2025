"use client";

import React, { useState, useEffect } from 'react';

function Hero() {
  // Array gambar untuk hero
  const heroImages = [
    {
      id: 1,
      src: "/image/hut80.jpg",
      alt: "Pemandangan Kota Madiun 1",
      thumbnail: "/image/hut80.jpg"
    },
    {
      id: 2,
      src: "/image/image-4.jpeg", 
      alt: "Pemandangan Kota Madiun 2",
      thumbnail: "/image/image-4.jpeg"
    }
  ];


  const [activeImage, setActiveImage] = useState(heroImages[0]);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage(currentImage => {
        const currentIndex = heroImages.findIndex(img => img.id === currentImage.id);
        const nextIndex = currentIndex < heroImages.length - 1 ? currentIndex + 1 : 0;
        return heroImages[nextIndex];
      });
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Main Hero Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url('${activeImage.src}')`
        }}
      />
             

             
      {/* Thumbnail Carousel at Bottom */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {heroImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveImage(image)}
              className={`relative overflow-hidden transition-all duration-300 ${
                activeImage.id === image.id 
                  ? 'ring-3 ring-blue-500 shadow-xl' 
                  : 'ring-1 ring-white/50 hover:ring-white/80'
              }`}
            >
              <img
                src={image.thumbnail}
                alt={image.alt}
                className="w-24 h-16 object-cover"
              />
            </button>
          ))}
        </div>
      </div>


    </div>
  );
}

export default Hero;