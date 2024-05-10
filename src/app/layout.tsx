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
            <div className="sticky top-0 flex px-8 py-5 justify-between bg-black">
              <div className="shrink-0 flex gap-1 text-center">
                <div className="w-6 h-6 bg-white rounded-full" />
                HumanSource
                <div className="text-gray-500">/ TabbyML</div>
              </div>
              <input
                type="search"
                placeholder="Search people, benefits, policies..."
                className="bg-transparent w-full h-10 max-w-[400px] border border-gray-600 px-2 rounded-l-full rounded-r-full"
              />
              {/* <Avatar
              employee={{ name: "Test User" }}
              className="justify-end shrink-0"
            /> */}
            </div>
            <div className="p-8 w-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
