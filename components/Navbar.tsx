"use client";

import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar flex justify-between items-center px-6 py-4 bg-white shadow-md relative">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo-3.png" alt="logo" width={70} height={70} />
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <NavItems /> {/* horizontal by default */}
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t z-50 md:hidden">
          <div className="flex flex-col gap-y-4 px-6 py-6 text-left items-center">
            <NavItems vertical />
            <SignedOut>
              <SignInButton>
                <button className="btn-signin w-full text-center">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="w-full flex justify-center">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
