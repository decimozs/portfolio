import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import Header from "./_components/header";
import Cursor from "@/components/ui/cursor";
import { ReactLenis } from "@/lib/lenis";
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
    <html lang="en">
      <ReactLenis options={{ wheelMultiplier: 0.7 }} root>
        <body className={`antialiased`}>
          <Header />
          {children}
          <Cursor />
        </body>
      </ReactLenis>
    </html>
  );
}
