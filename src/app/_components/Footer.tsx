import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const brandContent = (
    <div className="space-y-3">
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-xl">
          ⚡
        </div>
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-lg font-bold text-transparent">
          RapidShare
        </span>
      </Link>
      <p className="text-xs leading-relaxed text-gray-400">
        Instant, secure, and anonymous file sharing. No login required.
      </p>
    </div>
  );

  const productLinks = (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-300">
        Product
      </h3>
      <ul className="space-y-2">
        <li>
          <Link href="/features" className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
            Features
          </Link>
        </li>
        <li>
          <Link href="/security" className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
            Security
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
            About
          </Link>
        </li>
      </ul>
    </div>
  );

  const legalLinks = (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-300">
        Legal
      </h3>
      <ul className="space-y-2">
        <li>
          <Link href="/privacy" className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/terms" className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
            Terms &amp; Conditions
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );

  const connectLinks = (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-300">
        Connect
      </h3>
      <ul className="space-y-2">
        <li>
          <a href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
            GitHub
          </a>
        </li>
        <li>
          <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
            LinkedIn
          </a>
        </li>
        <li>
          <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || ""}`} className="text-sm text-gray-400 transition-colors hover:text-indigo-400">
            Email
          </a>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      {/* Mobile-only Full Footer (Static, Scrollable) */}
      <footer className="md:hidden w-full border-t border-white/10 bg-black/40 backdrop-blur-xl mt-auto z-20">
        <div className="px-6 py-10">
          <div className="grid grid-cols-1 gap-8">
            {brandContent}
            <div className="grid grid-cols-2 gap-8">
              {productLinks}
              {legalLinks}
            </div>
            {connectLinks}
          </div>
          
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              © {currentYear} RapidShare. All rights reserved.
            </p>
            <p className="text-[10px] text-gray-600">
              Designed &amp; Developed by Abhishek & Randheer
            </p>
          </div>
        </div>
      </footer>

      {/* Desktop-only Minimal Fixed Bottom Bar */}
      <footer className="hidden md:flex fixed bottom-0 left-0 right-0 z-50 w-full bg-[#110524]/80 backdrop-blur-md border-t border-white/10 px-8 py-3 items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
          © {currentYear} RapidShare <span className="text-gray-600">• Designed by Abhishek</span>
        </p>
        
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-500">
          <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
        </div>
      </footer>
    </>
  );
}
