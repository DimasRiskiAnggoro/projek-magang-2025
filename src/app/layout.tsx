import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { FixedPlugin, Layout } from "@/components";
import ThemeProvider from "@/context/ThemeProvider";
// HAPUS: import { headers } from "next/headers";
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