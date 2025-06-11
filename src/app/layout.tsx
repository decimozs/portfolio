import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Spotlight } from "@/components/ui/spotlight-new";
import { seo } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} antialiased bg-black text-white`}>
        <Spotlight />
        {children}
      </body>
    </html>
  );
}
