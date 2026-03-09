import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import localFont from "next/font/local";
import Hamburger from "@/components/hamburger";
import Header from "@/components/header";
import MainLayout from "@/components/main-layout";
import { jsonLd, seo } from "@/lib/seo";

const overusedGrotesk = localFont({
  src: "../../public/font/OverusedGrotesk-Book.woff2",
  variable: "--font-overused-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  ...seo,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${overusedGrotesk.className}`}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`antialiased bg-white text-black`}>
        <Hamburger />
        <MainLayout>
          <div className="flex items-start justify-start w-full">
            <Header />
          </div>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
