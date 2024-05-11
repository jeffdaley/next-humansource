import { Outfit } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import AppContainer from "./_components/app-container";

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
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
