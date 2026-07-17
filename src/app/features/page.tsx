import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../_components/NavBar";
import AuroraBackground from "../_components/AuroraBackground";
import Footer from "../_components/Footer";
import Breadcrumbs from "../_components/Breadcrumbs";
import JsonLd, { getWebPageSchema } from "../_components/JsonLd";
import AdSlot from "../_components/AdSlot";
import { Zap, Shield, Clock, HardDrive, Smartphone, Share2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Features — Fast, Secure & Anonymous File Sharing | RapidShare",
  description:
    "Discover RapidShare's powerful features: lightning-fast cloud uploads, password protection, auto-expiring links, and seamless mobile support. Share files up to 100MB instantly.",
  alternates: {
    canonical: "https://www.rapidshare.live/features",
  },
  openGraph: {
    title: "Features — RapidShare",
    description:
      "Lightning-fast uploads, enterprise-grade security, and auto-expiring links. See all RapidShare features.",
    url: "https://www.rapidshare.live/features",
    siteName: "RapidShare",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidShare Features",
    description: "Fast, secure, and anonymous file sharing.",
  },
};

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast Transfer",
    desc: "Direct uploads to optimized cloud storage nodes ensure maximum speed and reliability, regardless of file size or your location.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure Lock Protection",
    desc: "Optional password protection utilizes BCrypt hashing to ensure only intended recipients can access your sensitive files.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Auto-Expiry System",
    desc: "Files self-destruct after your chosen time limit (1h, 8h, or 24h) or download limit, leaving zero footprint on our servers.",
  },
  {
    icon: <HardDrive className="w-8 h-8" />,
    title: "No Limits Sharing",
    desc: "Share files up to 100MB with anyone, anywhere, completely free. No bandwidth throttling for free users.",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile Ready UI",
    desc: "A responsive interface designed to work flawlessly on any device. Share files straight from your phone's gallery with ease.",
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: "Frictionless Sharing",
    desc: "Unique 6-character short codes make sharing via text, chat, or even verbally a breeze. No long URLs required.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={getWebPageSchema({
          name: "RapidShare Features",
          description: "Explore the features that make RapidShare the best way to share files.",
          url: "https://www.rapidshare.live/features",
        })}
      />

      <main className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#110524]">
        <AuroraBackground />
        <Navbar />

        <div className="relative z-10 flex-1 w-full overflow-y-auto flex flex-col">
          <div className="w-full max-w-6xl mx-auto pt-12 pb-20 px-6 flex-1">
          <Breadcrumbs items={[{ label: "Features", href: "/features" }]} />

          <div className="text-center mb-16 mt-8">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase drop-shadow-lg">
              Product <span className="text-indigo-400">Features</span>
            </h1>
            <p className="text-gray-300 font-medium text-lg max-w-2xl mx-auto drop-shadow-md">
              Engineered for absolute speed, uncompromising security, and beautiful simplicity.
            </p>
          </div>

          <AdSlot position="header-below" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {features.map((f, i) => (
              <section 
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)]"
                aria-labelledby={`feature-title-${i}`}
              >
                <div 
                  className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-indigo-500/30 shadow-inner"
                  aria-hidden="true"
                >
                  {f.icon}
                </div>
                <h2 id={`feature-title-${i}`} className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {f.title}
                </h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  {f.desc}
                </p>
              </section>
            ))}
          </div>

          <AdSlot position="in-content" />

          {/* CTA Section */}
          <div className="mt-20 text-center bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-3xl p-10 md:p-16 backdrop-blur-xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">
              Ready to experience it?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">
              Stop waiting and start sharing. Try it now — no account needed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all uppercase tracking-wider text-sm"
              >
                Start Sharing <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/security"
                className="inline-flex items-center justify-center bg-white/10 text-white border border-white/20 font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all uppercase tracking-wider text-sm"
              >
                Learn about Security
              </Link>
            </div>
          </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
