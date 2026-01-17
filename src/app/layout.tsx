import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/seo/json-ld";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalSpotlight } from "@/components/ui/global-spotlight";
import { GoogleTagManager } from '@next/third-parties/google';

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
  metadataBase: new URL("https://sudolabs.space"),
  alternates: {
    canonical: 'https://sudolabs.space',
  },
  title: {
    default: "Sudolabs Perú | Consultora de Software y Tecnología en Huancayo",
    template: "%s | Sudolabs Perú",
  },
  description: "Impulsa tu empresa con software a medida y tecnología de alto rendimiento. Expertos en desarrollo web, aplicaciones móviles y transformación digital desde Huancayo para el mundo.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-icon.png',
    },
  },
  keywords: [
    "Desarrollo de Software Huancayo", 
    "Consultora Tecnológica Perú", 
    "Sistemas a medida", 
    "Aplicaciones Web", 
    "Transformación Digital", 
    "Sudolabs Perú",
    "Ingeniería de Software"
  ],
  authors: [{ name: "Sudolabs Perú" }],
  creator: "Sudolabs Perú",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sudolabs Perú",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  openGraph: {
    title: "Sudolabs Perú | Consultora de Software y Tecnología",
    description: "Desarrollamos software a medida y soluciones de tecnología para empresas ambiciosas.",
    url: "https://sudolabs.space",
    siteName: "Sudolabs Perú",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Sudolabs Perú - Ingeniería de Software y Tecnología',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudolabs Perú | Innovación y Tecnología desde Huancayo",
    description: "Expertos en desarrollo de software y tecnología para negocios modernos.",
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
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
