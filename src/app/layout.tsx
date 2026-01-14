import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/header";
import MainLayout from "@/components/main-layout";
import { seo } from "@/lib/seo";

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
