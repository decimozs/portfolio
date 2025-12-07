import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { seo } from "@/lib/seo";
import LenisProvider from "@/providers/lenis-provider";

export const metadata: Metadata = {
  ...seo,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`antialiased bg-white text-black`}>
        <LenisProvider>
          <main className="p-6 text-2xl flex flex-col justify-between lg:w-[700px] lg:mx-auto">
            <Header />
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
