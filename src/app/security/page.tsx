import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../_components/NavBar";
import AuroraBackground from "../_components/AuroraBackground";
import Footer from "../_components/Footer";
import Breadcrumbs from "../_components/Breadcrumbs";
import JsonLd, { getWebPageSchema, getFAQSchema } from "../_components/JsonLd";
import AdSlot from "../_components/AdSlot";
import { ShieldCheck, Lock, EyeOff, FileKey, Server, Trash2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Security — How RapidShare Protects Your Files",
  description:
    "Learn about RapidShare's security measures: enterprise-grade encryption, zero tracking, BCrypt password hashing, and secure file auto-destruction.",
  alternates: {
    canonical: "https://www.rapidshare.live/security",
  },
  openGraph: {
    title: "Security & Privacy — RapidShare",
    description:
      "Enterprise-grade encryption, zero tracking, and auto-destruction. See how we secure your files.",
    url: "https://www.rapidshare.live/security",
    siteName: "RapidShare",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidShare Security",
    description: "How we protect your files and privacy.",
  },
};

const points = [
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Encrypted Storage",
    desc: "Files are stored with enterprise-grade encryption on secure, distributed cloud servers, ensuring data at rest is safe.",
  },
  {
    icon: <EyeOff className="w-8 h-8" />,
    title: "Password Protection",
    desc: "Optionally lock your files with strong passwords. We use BCrypt hashing so even we can't read your passwords.",
  },
  {
    icon: <Trash2 className="w-8 h-8" />,
    title: "Auto-Destruction",
    desc: "Expired files and temporary data are permanently and irretrievably wiped from our systems when their time is up.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Zero Tracking",
    desc: "We don't track who you share with or what you share. No IP logging for downloads, just pure anonymous transfer.",
  },
];

const faqs = [
  {
    question: "How secure is my password-protected file?",
    answer: "Very secure. We don't store plain-text passwords. We use BCrypt, a cryptographic hash function, to verify passwords on download. Without the exact password, the file cannot be accessed.",
  },
  {
    question: "Can RapidShare see my files?",
    answer: "While files are temporarily stored on our secure cloud provider (Cloudinary), we do not index, scan, or view user files. They are treated as opaque data blobs.",
  },
  {
    question: "What happens when a file expires?",
    answer: "When a file reaches its expiry time (or download limit), the database record is deleted and a command is issued to the cloud provider to permanently destroy the file asset. It cannot be recovered.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageSchema({
            name: "RapidShare Security",
            description: "Detailed information about RapidShare's security architecture.",
            url: "https://www.rapidshare.live/security",
          }),
          getFAQSchema(faqs),
        ]}
      />

      <main className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#110524]">
        <AuroraBackground />
        <Navbar />

        <div className="relative z-10 flex-1 w-full overflow-y-auto flex flex-col">
          <div className="w-full max-w-6xl mx-auto pt-12 pb-20 px-6 flex-1">
          <Breadcrumbs items={[{ label: "Security", href: "/security" }]} />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mt-8 mb-16">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] drop-shadow-lg">
                Your Data, <br className="hidden sm:block" />
                <span className="text-indigo-400">Locked Tight.</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
                At RapidShare, we prioritize your privacy above all else. No accounts, no data harvesting, just a highly secure bridge for your files.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-indigo-900/40 px-5 py-2.5 rounded-full border border-indigo-500/30 backdrop-blur-sm shadow-inner">
                  <Server className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Distributed Node</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-900/40 px-5 py-2.5 rounded-full border border-purple-500/30 backdrop-blur-sm shadow-inner">
                  <FileKey className="w-4 h-4 text-purple-400" aria-hidden="true" />
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">SHA-256 Validated</span>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {points.map((p, i) => (
                <section 
                  key={i} 
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 hover:translate-y-[-4px] transition-all duration-300 shadow-lg"
                  aria-labelledby={`sec-title-${i}`}
                >
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 mb-5 border border-white/10" aria-hidden="true">
                    {p.icon}
                  </div>
                  <h2 id={`sec-title-${i}`} className="text-lg font-bold text-white mb-2 uppercase tracking-tight">{p.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </section>
              ))}
            </div>
          </div>

          <AdSlot position="in-content" />

          {/* Security FAQ */}
          <section className="mb-20 mt-16" aria-labelledby="sec-faq-heading">
            <h2 id="sec-faq-heading" className="text-3xl font-black text-white mb-8 text-center uppercase tracking-tight">
              Security <span className="text-indigo-400">FAQ</span>
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-indigo-300 mb-3">{faq.question}</h3>
                  <p className="text-gray-300 text-base leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center mt-12 mb-8">
             <Link 
                href="/features"
                className="inline-flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold transition-colors uppercase tracking-widest text-sm"
              >
                Explore Features <ArrowRight className="w-4 h-4" />
              </Link>
          </div>

          </div>
          <Footer />
        </div>
        
        {/* Decorative side text */}
        <div className="absolute bottom-32 right-12 text-[10px] text-indigo-500/30 font-black uppercase tracking-[1em] rotate-90 origin-right translate-y-[-50%] hidden xl:block pointer-events-none select-none">
          Security First System
        </div>
      </main>
    </>
  );
}
