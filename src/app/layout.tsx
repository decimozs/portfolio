import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import Cursor from "@/components/ui/cursor";
import { ReactLenis } from "@/lib/lenis";
<<<<<<< HEAD
import { seo } from "@/lib/seo";
=======
import Header from "@/components/dynamic/header";
>>>>>>> main

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
      <ReactLenis options={{ wheelMultiplier: 0.7, syncTouch: true }} root>
        <body className={`antialiased`}>
          <Header />
          {children}
          <Cursor />
        </body>
      </ReactLenis>
    </html>
  );
}
