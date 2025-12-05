import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Village - StreetWear",
  description: "Create your style",
  openGraph: {
    title: "The Village Streetwear",
    description: "A new era of streetwear customization. Join the waitlist.",
    url: "https://thevillagestreetwear.com",
    siteName: "The Village - streetwear",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Village Streetwear Coming Soon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}>
        {children}
        <Toaster />
        <Analytics/>
      </body>
    </html>
  );
}