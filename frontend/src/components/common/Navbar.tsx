"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Create Order",
      href: "/create-order",
    },
    {
      name: "Orders",
      href: "/orders",
    },
    {
      name: "Update Status",
      href: "/update-order",
    },
  ];

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            fontWeight:
              pathname === link.href ? "bold" : "normal",
          }}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}