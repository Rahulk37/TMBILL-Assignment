"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  ShoppingBag,
  RefreshCcw,
  Store,
  BarChart3,
  Archive,
  Bell,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Create Order",
      href: "/create-order",
      icon: PlusCircle,
    },
    {
      name: "Orders",
      href: "/orders",
      icon: ShoppingBag,
    },
    {
      name: "Update Status",
      href: "/update-order",
      icon: RefreshCcw,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Archive",
      href: "#",
      icon: Archive,
    },
    {
      name: "Notifications",
      href: "#",
      icon: Bell,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-7">
        <h1 className="text-2xl font-bold">
          OrderHub
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Multi Store System
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            const active =
              pathname === link.href;

            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  <Icon size={20} />

                  <span className="text-sm font-medium">
                    {link.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="border-t border-slate-800 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold">
            R
          </div>

          <div>
            <p className="font-medium">
              Rahul
            </p>

            <p className="text-sm text-slate-400">
              Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}