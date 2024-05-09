"use client";

import Link from "next/link";

export default function Nav() {
  const navLinks = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/employees",
      text: "Employees",
    },
    {
      href: "/",
      text: "Company",
    },
    {
      href: "/",
      text: "Benefits",
    },
  ];

  return (
    <nav className="flex flex-col justify-center h-full">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
