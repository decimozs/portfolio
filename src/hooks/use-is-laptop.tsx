"use client";

import React from "react";

const LAPTOP_BREAKPOINT = 1024;

export function useIsLaptop() {
  const [isLaptop, setIsLaptop] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LAPTOP_BREAKPOINT}px)`);

    const onChange = (e: MediaQueryListEvent) => {
      setIsLaptop(e.matches);
    };

    setIsLaptop(mql.matches);

    mql.addEventListener("change", onChange);

    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  return isLaptop;
}
