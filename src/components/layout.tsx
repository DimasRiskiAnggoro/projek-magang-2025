"use client";

import React from "react";
// Temporary: comment out ThemeProvider yang bermasalah
// import { ThemeProvider } from "@material-tailwind/react";

export function Layout({ children }: { children: React.ReactNode }) {
  // Temporary: render langsung children tanpa ThemeProvider
  return <>{children}</>;
  
  // Nanti kalau sudah fix, uncomment ini:
  // return <ThemeProvider>{children}</ThemeProvider>;
}

export default Layout;