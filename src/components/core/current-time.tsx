"use client";

import { useState, useEffect } from "react";

export default function CurrentTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    };

    const interval = setInterval(updateTime, 1000);

    updateTime();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 p-4 bg-primary text-accent">
      <p>{time} PHST</p>
    </div>
  );
}
