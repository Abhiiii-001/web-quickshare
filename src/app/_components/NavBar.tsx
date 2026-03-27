'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="absolute top-5 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-xl rounded-full px-16 md:px-8 py-2 md:py-3 shadow-lg border border-white/30">
      <div className="flex md:items-center gap-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
            ⚡
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            QuickShare
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}