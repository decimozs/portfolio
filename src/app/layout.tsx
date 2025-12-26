import type { Metadata } from "next";
import "./globals.css";
import MainWrapper from "@/components/main-wrapper";
import { seo } from "@/lib/seo";

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
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}
