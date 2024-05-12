"use client";

import { useEffect, useState } from "react";
import RouteNav from "./route-nav";
import UtilityNav from "./utility-nav";

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [didScroll, setDidScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setDidScroll(window.scrollY > 0);
    };

    // Capture initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex">
      <RouteNav />
      {/* Top-level global nav */}
      <div className="w-full">
        <UtilityNav didScroll={didScroll} />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
