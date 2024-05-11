import { Outfit } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import RouteNav from "./_components/route-nav";
import UtilityNav from "./_components/utility-nav";

export const metadata: Metadata = {
  title: "HumanSource | TabbyML",
  description: "Burning HR questions answered.",
};

const font = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${font.className}`}>
      <body>
        <div className="flex">
          <RouteNav />
          {/* Top-level global nav */}
          <div className="w-full">
            <UtilityNav />
            <div className="w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
