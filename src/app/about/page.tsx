import { Metadata } from "next";
import Navbar from "../_components/NavBar";
import AuroraBackground from "../_components/AuroraBackground";
import Footer from "../_components/Footer";
import Breadcrumbs from "../_components/Breadcrumbs";
import JsonLd, { getWebPageSchema, getFAQSchema } from "../_components/JsonLd";
import AdSlot from "../_components/AdSlot";
import { Github, Linkedin, Mail, ExternalLink, User } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About RapidShare — Temporary & Secure File Transfer",
  description:
    "Learn about RapidShare's mission to provide the quickest, safest, and simplest way to temporarily store a file and retrieve it later without an account.",
  alternates: {
    canonical: "https://www.rapidshare.live/about",
  },
  openGraph: {
    title: "About RapidShare — Temporary File Transfer",
    description:
      "Built with a vision to make file sharing secure and temporary. Learn more about RapidShare and its creator.",
    url: "https://www.rapidshare.live/about",
    siteName: "RapidShare",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About RapidShare",
    description: "The story behind RapidShare's temporary file transfer platform.",
  },
};

const faqs = [
  {
    question: "Why was RapidShare created?",
    answer: "RapidShare was created to solve the problem of cumbersome file sharing. We wanted a solution where you don't need to sign up for an account, jump through hoops, or worry about tracking just to send a file to a friend or colleague.",
  },
  {
    question: "Is RapidShare really free?",
    answer: "Yes, the core functionality of RapidShare is completely free to use. You can share files up to 100MB instantly.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageSchema({
            name: "About RapidShare",
            description: "Learn about the mission and creator of RapidShare.",
            url: "https://www.rapidshare.live/about",
          }),
          getFAQSchema(faqs),
        ]}
      />

      <main className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#110524]">
        <AuroraBackground />
        <Navbar />

        <div className="relative z-10 flex-1 w-full overflow-y-auto flex flex-col">
          <div className="w-full max-w-5xl mx-auto pt-12 pb-20 px-6 flex-1">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
          
          <AdSlot position="header-below" />

          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center mb-16">
            {/* Profile Section */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shrink-0 shadow-2xl">
              <div className="w-full h-full rounded-[2.8rem] bg-[#1a0a2e] flex items-center justify-center overflow-hidden relative">
                {/* <User className="w-24 h-24 text-white/20 relative z-10" aria-hidden="true" /> */}
                <Image src='/abhishek-kumar.jpg' width={300} height={300} alt="Abhishek Kumar"/>
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent" />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter uppercase drop-shadow-lg">
                  Rapid<span className="text-indigo-400">Share</span>
                </h1>
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.5em] mb-4">
                  Version 2.0 • 2026
                </p>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto md:mx-0" />
              </div>

              <div className="space-y-4 mb-8 text-gray-300 text-lg leading-relaxed text-left">
                <p>
                  RapidShare is a <strong className="text-white font-bold">temporary, secure, account-free file transfer platform</strong> designed for situations where users need to move a file from one device to another without signing into any personal accounts.
                </p>
                <p>
                  Unlike cloud storage services, RapidShare is <strong className="text-white font-bold">not intended for permanent storage</strong>. Its primary purpose is to provide the quickest and safest way to temporarily store a file and retrieve it later. It is built around one simple principle: <em className="text-indigo-300">Temporary file transfer, not permanent cloud storage.</em>
                </p>
                <p>
                  Created by <strong className="text-white font-bold">Abhishek</strong>, this platform leverages AES-256-GCM server-side encryption and smart compression to ensure your files are secure and transfers are fast. Files are automatically deleted, ensuring your data never stays online longer than it needs to.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all group hover:-translate-y-1"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white uppercase tracking-widest transition-colors">
                    GitHub
                  </span>
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all group hover:-translate-y-1"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white uppercase tracking-widest transition-colors">
                    LinkedIn
                  </span>
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_PORTFOLIO_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all group hover:-translate-y-1"
                >
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white uppercase tracking-widest transition-colors">
                    Portfolio
                  </span>
                </a>
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || ""}`}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-all group hover:-translate-y-1"
                >
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm font-bold text-gray-300 group-hover:text-white uppercase tracking-widest transition-colors">
                    Email
                  </span>
                </a>
              </div>
            </div>
          </div>

          <AdSlot position="in-content" />

          {/* The Problem We Solve Section */}
          <section className="mb-16 bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 md:p-12" aria-labelledby="problem-heading">
            <h2 id="problem-heading" className="text-3xl font-bold text-white mb-6">The Problem We Solve</h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                Many people need to transfer files from computers they do not own or do not trust, such as:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 mb-6">
                <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-indigo-400">❖</span> Cyber cafés & Library computers
                </li>
                <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-indigo-400">❖</span> College computer labs
                </li>
                <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-indigo-400">❖</span> Office & Hotel business center computers
                </li>
                <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-indigo-400">❖</span> A friend's or family member's device
                </li>
              </ul>
              <p>
                Existing solutions often require signing into personal accounts, which can leave accounts signed in accidentally, require phone verification on a public device, or leave unnecessary copies of files stored online permanently.
              </p>
              <p>
                RapidShare removes these problems entirely. You simply upload a file, receive a 6-digit retrieval code, and securely download it later from your own device—<strong className="text-white">without ever logging in</strong>.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <h3 className="text-lg font-bold text-indigo-300 mb-2">{faq.question}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
