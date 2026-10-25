"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { cn } from "cn";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
    { label: "Add Destinations", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <nav className="flex items-center gap-4 justify-self-start sm:gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm transition-colors hover:text-brand",
                pathname === href
                  ? "font-medium text-brand"
                  : "text-zinc-800",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          aria-label="Wanderlast — home"
          className="justify-self-center"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            className="h-6 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4 justify-self-end sm:gap-5">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm text-zinc-800 transition-colors hover:text-brand"
          >
            <User className="size-4" aria-hidden="true" />
            Profile
          </Link>
          <Link
            href="/login"
            className="text-sm text-zinc-800 transition-colors hover:text-brand"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-zinc-800 transition-colors hover:text-brand"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
