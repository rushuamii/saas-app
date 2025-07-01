"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "My Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

interface NavItemsProps {
  vertical?: boolean;
}

const NavItems = ({ vertical = false }: NavItemsProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        vertical
          ? "flex flex-col gap-y-4 items-center" // vertical with centered items and vertical gaps
          : "flex items-center gap-4" // horizontal with gap
      )}
    >
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            pathname === href && "text-primary font-semibold",
            vertical ? "w-full text-center" : ""
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
