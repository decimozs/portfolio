import type { ReactNode } from "react";

export default function OverflowEffect({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="block fixed bg-white top-0 left-0 w-full h-6" />
      {children}
      <div className="block fixed bg-white bottom-0 left-0 w-full h-6" />
    </>
  );
}
