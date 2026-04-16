import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://primavera3d.pro'),
  title: {
    default: "Primavera3D | Advanced 3D Modeling & Digital Fabrication",
    template: "%s | Primavera3D"
  },
  description: "Transform your ideas into reality with cutting-edge 3D modeling, parametric design, and digital fabrication services. Expert solutions in architecture, product design, and engineering.",
  keywords: ["3D modeling", "parametric design", "digital fabrication", "CAD", "CAM", "3D printing", "CNC machining", "rapid prototyping", "architecture visualization", "product development"],
  authors: [{ name: "Primavera3D Team" }],
  creator: "Primavera3D",
  publisher: "Primavera3D",
  openGraph: {
    title: "Primavera3D | Advanced 3D Modeling & Digital Fabrication",
    description: "Transform your ideas into reality with cutting-edge 3D modeling and digital fabrication services.",
    url: "https://primavera3d.pro",
    siteName: "Primavera3D by MADFAM",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Primavera3D - Advanced 3D Modeling & Digital Fabrication"
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primavera3D | Advanced 3D Modeling & Digital Fabrication",
    description: "Transform your ideas into reality with cutting-edge 3D modeling and digital fabrication services.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-blueprint-dark text-white min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}