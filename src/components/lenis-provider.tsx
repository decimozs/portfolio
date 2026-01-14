"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import type { PropsWithChildren } from "react";

const LenisProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.5,
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
