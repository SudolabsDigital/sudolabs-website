import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/seo/json-ld";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalSpotlight } from "@/components/ui/global-spotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: {
    default: "SudolabsDigital | Ingeniería de Software y Consultoría",
    template: "%s | SudolabsDigital",
  },
  description: "Transformamos negocios mediante software a medida. Especialistas en Next.js, arquitectura de sistemas y transformación digital para empresas ambiciosas.",
  keywords: ["Desarrollo de Software", "Consultoría Tecnológica", "Next.js", "Transformación Digital", "Software a medida Perú"],
  authors: [{ name: "SudolabsDigital" }],
  creator: "SudolabsDigital",
  openGraph: {
    title: "SudolabsDigital | Ingeniería de Software",
    description: "Convertimos tus problemas operativos en software eficiente y rentable.",
    url: "https://sudolabs.space",
    siteName: "SudolabsDigital",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SudolabsDigital",
    description: "Ingeniería de software con propósito.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <JsonLd />
        <GlobalSpotlight />
        <Header />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}