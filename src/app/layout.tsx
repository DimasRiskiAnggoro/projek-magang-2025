// file: app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { FixedPlugin, Layout } from "@/components";
import ThemeProvider from "@/context/ThemeProvider";

// ⬇️ Hapus import Navbar dan Footer dari sini
// import { Navbar, Footer } from "@/components";

// ⬇️ Import komponen baru Anda
import { ConditionalLayout } from "@/components/ConditionalLayout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diskominfo Kota Madiun",
  description: "...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* ... head tags ... */}</head>
      <body className={roboto.className}>
        <ThemeProvider>
          <Layout>
            {/* ⬇️ Ganti Navbar, children, dan Footer dengan komponen baru */}
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <FixedPlugin />
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}