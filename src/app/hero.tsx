"use client";

import { IconButton, Typography } from "@material-tailwind/react";

function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/Pesona Kota Madiun.mp4" type="video/mp4" />
        {/* Fallback untuk browser yang tidak support video */}
        <div className="absolute inset-0 w-full h-full bg-[url('/image/image-4.jpeg')] bg-cover bg-no-repeat" />
      </video>
             
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
            Selamat Datang di Kominfo Madiun
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mt-4 mb-12 w-full md:max-w-full lg:max-w-3xl"
          >
            Website resmi informasi dan komunikasi publik Kota Madiun
          </Typography>
          <Typography
            variant="paragraph"
            color="white"
            className="mt-1 mb-7 font-medium uppercase"
          >
            Connect with us on:
          </Typography>
          <div className="gap-8 flex">
            <IconButton variant="text" color="white" size="sm">
              <i className="fa-brands fa-twitter text-base" />
            </IconButton>
            <IconButton variant="text" color="white" size="sm">
              <i className="fa-brands fa-facebook text-base" />
            </IconButton>
            <IconButton variant="text" color="white" size="sm">
              <i className="fa-brands fa-instagram text-base" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;