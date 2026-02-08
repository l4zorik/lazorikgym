import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#ff6b35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "LazorikGym - Tvá cesta k lepšímu já",
  description: "Personalizované tréninkové plány, AI analýza slabých partií a komunita, která tě podpoří na cestě k tvým fitness cílům.",
  keywords: ["gym", "fitness", "trénink", "workout", "jídelníček", "cvičení"],
  authors: [{ name: "LazorikGym" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LazorikGym",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "LazorikGym - Tva cesta k lepsimu ja",
    description: "Personalizovane treninkove plany a AI analyza slabych parti",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="w-full" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff6b35" />
      </head>
      <body className={`${inter.variable} font-sans antialiased w-full min-h-screen`} suppressHydrationWarning>
        <AuthProvider>
          {children}
          <ServiceWorkerRegistration />
        </AuthProvider>
      </body>
    </html>
  );
}
