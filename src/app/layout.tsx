import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LazorikGym - Tvá cesta k lepšímu já",
  description: "Personalizované tréninkové plány, AI analýza slabých partií a komunita, která tě podpoří na cestě k tvým fitness cílům.",
  keywords: ["gym", "fitness", "trénink", "workout", "jídelníček", "cvičení"],
  authors: [{ name: "LazorikGym" }],
  openGraph: {
    title: "LazorikGym - Tvá cesta k lepšímu já",
    description: "Personalizované tréninkové plány a AI analýza slabých partií",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="w-full">
      <body className={`${inter.variable} font-sans antialiased w-full min-h-screen`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
