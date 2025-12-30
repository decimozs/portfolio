import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { seo } from "@/lib/seo";
import MainLayout from "@/components/main-layout";
import localFont from "next/font/local";

const overusedGrotesk = localFont({
  src: "../../public/font/OverusedGrotesk-Book.woff2",
  variable: "--font-overused-grotesk",
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
      <body className={`antialiased bg-white text-black`}>
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
