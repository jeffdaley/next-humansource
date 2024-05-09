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
  ];

  return (
    <nav>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
