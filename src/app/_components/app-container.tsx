"use client";

import { useState } from "react";
import RouteNav from "./route-nav";
import UtilityNav from "./utility-nav";

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [didScroll, setDidScroll] = useState(false);

  window.addEventListener("scroll", () => {
    setDidScroll(window.scrollY > 0);
  });

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
