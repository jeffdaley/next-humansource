import type { Metadata } from "next";
import "./globals.css";
import Nav from "./_components/nav";

export const metadata: Metadata = {
  title: "HR Hell",
  description: "Burning HR questions answered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Nav />
          {/* Top-level global nav */}
          <div className="w-full">
            {/* Nav and Search */}
            <div className="sticky top-0 flex px-8 items-center py-5 justify-between bg-black">
              <div className="shrink-0 flex gap-1 text-center">
                <div className="w-6 h-6 bg-white rounded-full" />
                HumanSource
                <div className="text-gray-500">/ TabbyML</div>
              </div>
              <div className="relative w-full max-w-[400px]">
                <input
                  type="search"
                  placeholder="Find people, benefits, policies..."
                  className="bg-transparent w-full h-10  bg-neutral-800 placeholder-neutral-500 pl-10 rounded-l-full rounded-r-full"
                />
                {/* Search icon */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  🔍
                </div>
              </div>
              {/* <Avatar
              employee={{ name: "Test User" }}
              className="justify-end shrink-0"
            /> */}
            </div>
            <div className="px-8 pt-5 w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
