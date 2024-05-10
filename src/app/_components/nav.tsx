"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLink = {
  href: string;
  text: string;
  icon: string;
};

export default function Nav() {
  const navLinks: NavLink[] = [
    {
      href: "/employees",
      text: "Employees",
      icon: "people",
    },
    {
      href: "/company",
      text: "Company",
      icon: "business_center",
    },
    {
      href: "/benefits",
      text: "Benefits",
      icon: "heart",
    },
  ];

  const pathname = usePathname();

  const linkIsActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    } else {
      return pathname.startsWith(href);
    }
  };

  return (
    <nav className="shrink-0 flex flex-col sticky h-screen top-0 w-36 px-4 text-xs">
      <div className="flex flex-col justify-start pt-8 h-full">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              "grid place-items-center gap-2 px-3 py-6 " +
              (linkIsActive(link.href)
                ? "bg-gray-900 rounded-2xl"
                : // Fixme What's the syntax for avoiding this?
                  "")
            }
          >
            <div className="bg-gray-700 w-8 h-8 rounded-full"></div>
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
}
