import { Space_Grotesk, Chakra_Petch } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import SideNav from "./_components/side-nav";
import TopNav from "./_components/top-nav";

export const metadata: Metadata = {
  title: "HumanSource | TabbyML",
  description: "Burning HR questions answered.",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.className}`}>
      <body>
        <div className="flex">
          <SideNav />
          {/* Top-level global nav */}
          <div className="w-full">
            <TopNav />
            <div className="w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
