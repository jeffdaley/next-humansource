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
    <nav className="shrink-0 flex flex-col sticky h-screen top-0 w-24 bg-neutral-900 px-1.5 text-xs">
      <div className="flex flex-col justify-start pt-1.5 h-full">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              "grid place-items-center gap-2 px-3 py-3.5 " +
              (linkIsActive(link.href)
                ? "bg-neutral-800 rounded-lg"
                : // Fixme What's the syntax for avoiding this?
                  "")
            }
          >
            <div className="border-2 border-neutral-700 w-14 h-14 rounded-full"></div>
            {link.text}
          </Link>
        ))}
      </div>
    </nav>
  );
}
