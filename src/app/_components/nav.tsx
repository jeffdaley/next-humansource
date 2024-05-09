"use client";

import Link from "next/link";

export type NavLink = {
  href: string;
  text: string;
  icon: string;
};

export default function Nav() {
  const navLinks: NavLink[] = [
    {
      href: "/",
      text: "Home",
      icon: "home",
    },
    {
      href: "/employees",
      text: "Employees",
      icon: "people",
    },
    {
      href: "/",
      text: "Company",
      icon: "business_center",
    },
    {
      href: "/",
      text: "Benefits",
      icon: "heart",
    },
  ];

  return (
    <nav className="shrink-0 flex flex-col sticky h-screen top-0 w-28 bg-gray-900 text-xs">
      <div className="flex flex-col justify-center h-full">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="grid place-items-center gap-2 px-3 py-4"
          >
            <div className="border border-gray-300 w-12 h-12 rounded-full"></div>
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
}
