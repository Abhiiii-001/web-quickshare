"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/security", label: "Security" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className="absolute top-5 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-xl rounded-full px-6 md:px-8 py-2 md:py-3 shadow-lg border border-white/30"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-6 md:gap-10">
        <Link href="/" className="flex items-center gap-3" aria-label="RapidShare Home">
          <div
            className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xl"
            aria-hidden="true"
          >
            ⚡
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            RapidShare
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        {/* <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1 p-1"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-5 bg-gray-600 transition-transform duration-200 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-600 transition-opacity duration-200 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-600 transition-transform duration-200 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button> */}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-[110%] left-0 right-0 mt-2 bg-[#1a0a2e]/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden"
          role="menu"
        >
          <div className="flex flex-col py-3 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 text-base font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2 mx-4" />
            <Link
              href="/privacy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-2xl transition-all block"
              role="menuitem"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-2xl transition-all block"
              role="menuitem"
            >
              Contact Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}