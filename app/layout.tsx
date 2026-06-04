import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "SignLearn SIBI — Belajar Bahasa Isyarat Indonesia",
  description: "Platform interaktif belajar Sistem Isyarat Bahasa Indonesia (SIBI) dengan deteksi tangan real-time berbasis AI. Gratis, langsung di browser, tanpa install apapun.",
  keywords: "SIBI, bahasa isyarat, Indonesia, belajar, tuli, MediaPipe, AI, kamera",
  openGraph: {
    title: "SignLearn SIBI",
    description: "Belajar Bahasa Isyarat Indonesia secara interaktif dengan AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
