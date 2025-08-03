// types/next-image.d.ts

// Baris ini penting untuk memberitahu TypeScript kita akan mengubah 'next/image'
import 'next/image';

declare module 'next/image' {
  // Kita perluas interface ImageProps yang sudah ada dari Next.js
  interface ImageProps {
    // Tambahkan properti baru kita di sini. Tanda tanya (?) berarti properti ini opsional.
    dangerouslyAllowSVG?: boolean;
  }
}