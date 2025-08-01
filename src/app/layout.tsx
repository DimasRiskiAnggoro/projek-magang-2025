// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { FixedPlugin, Layout } from "@/components";
import ThemeProvider from "@/context/ThemeProvider";
import { Navbar, Footer } from "@/components";
import { headers } from "next/headers"; // ✅ Import headers untuk deteksi path

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diskominfo Kota Madiun",
  description:
    "Download Tailwind Blog Page, a Free Template developed by Creative Tim. Based on Tailwind CSS and Material Tailwind, see the live demo on our site and start sharing your stories with the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get("x-next-url") || "";

  // ✅ Sesuaikan dengan rute login/admin kamu
  const hideLayout = pathname.startsWith("/admin/login");

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={roboto.className}>
        <ThemeProvider>
          {/* Kalau halaman login, langsung render children tanpa layout */}
          {hideLayout ? (
            children
          ) : (
            <Layout>
              <Navbar />
              {children}
              <Footer />
              <FixedPlugin />
            </Layout>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
