"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@material-tailwind/react";

export function FixedPlugin() {
  const pathname = usePathname();
  
  const hiddenPaths = ['/login', '/admin'];
  const shouldHide = hiddenPaths.some(path => pathname.startsWith(path));
  
  if (shouldHide) {
    return null;
  }

  return (
    <a href="https://www.youtube.com/@PemkotMadiun" target="_blank">
      <Button
        color="white"
        size="lg"
        className="!fixed bottom-4 right-4 !p-3 !min-w-0 !w-14 !h-14 flex items-center justify-center border border-blue-gray-50 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Image
          width={128}
          height={128}
          className="w-8 h-8"
          alt="Hubungi WhatsApp"
          src="/icons/diskominfo.png"
        />
      </Button>
    </a>
  );
}