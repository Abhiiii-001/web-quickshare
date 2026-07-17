"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { openModal } from "@/store/slices/modalSlice";
import { Code, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/security", label: "Security" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className="absolute top-5 left-1/2 -translate-x-1/2 z-50 bg-white/95 w-fit backdrop-blur-xl rounded-full px-6 md:px-8 py-2 md:py-3 shadow-lg border border-white/30 w-[90%] max-w-[1200px]"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between w-full gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="RapidShare Home">
          <div
            className="w-8 h-8 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xl"
            aria-hidden="true"
          >
            ⚡
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            RapidShare
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons (Desktop & Tablet) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(openModal({ type: "CREATE_PORTAL" }))}
            className="flex cursor-pointer items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-indigo-200"
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Code Portal ✨</span>
          </button>

          {/* Mobile Menu Button */}
          {/* <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-xl transition-colors focus-visible:outline-none"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button> */}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-[110%] left-0 right-0 mt-2 bg-[#1a0a2e]/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden"
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
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                dispatch(openModal({ type: "CREATE_PORTAL" }));
              }}
              className="mx-4 my-2 flex cursor-pointer items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-2xl text-sm font-bold transition-all"
            >
              <Code className="w-4 h-4" />
              <span>Open Code Portal ✨</span>
            </button>
            
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
