import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../_components/NavBar";
import AuroraBackground from "../_components/AuroraBackground";
import Footer from "../_components/Footer";
import Breadcrumbs from "../_components/Breadcrumbs";
import JsonLd, { getWebPageSchema } from "../_components/JsonLd";
import { Mail, Github, Linkedin, MessageCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch with RapidShare",
  description:
    "Have questions, feedback, or need support? Contact the RapidShare team via email or connect with us on GitHub and LinkedIn.",
  alternates: {
    canonical: "https://www.rapidshare.live/contact",
  },
  openGraph: {
    title: "Contact Us — RapidShare",
    description:
      "Get in touch with the RapidShare team for questions, feedback, or support.",
    url: "https://www.rapidshare.live/contact",
    siteName: "RapidShare",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us — RapidShare",
    description: "Get in touch with the RapidShare team.",
  },
};

const contactMethods = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    description: "For general inquiries and support",
    value: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "",
    href: `mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || ""}`,
    external: false,
  },
  {
    icon: <Github className="h-6 w-6" />,
    title: "GitHub",
    description: "Report bugs or contribute to the project",
    value: "Abhiiii-001",
    href: process.env.NEXT_PUBLIC_GITHUB_URL || "#",
    external: true,
  },
  {
    icon: <Linkedin className="h-6 w-6" />,
    title: "LinkedIn",
    description: "Connect professionally",
    value: "Abhishek Kumar",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={getWebPageSchema({
          name: "Contact Us",
          description:
            "Contact the RapidShare team for questions, feedback, or support.",
          url: "https://www.rapidshare.live/contact",
        })}
      />

      <main className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#110524]">
        <AuroraBackground />
        <Navbar />

        <div className="relative z-10 flex-1 w-full overflow-y-auto flex flex-col">
          <div className="w-full max-w-4xl mx-auto pt-12 pb-20 px-6 flex-1">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />

          <div className="mb-10 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-500/20 mb-4">
              <MessageCircle className="h-8 w-8 text-indigo-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
              Get In <span className="text-indigo-400">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Have a question, feedback, or just want to say hello? We&apos;d
              love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center transition-all hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <h2 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">
                  {method.title}
                </h2>
                <p className="text-xs text-gray-500 mb-3">
                  {method.description}
                </p>
                <p className="text-sm text-indigo-400 font-semibold flex items-center justify-center gap-1">
                  {method.value}
                  {method.external && (
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  )}
                </p>
              </a>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-3">
              Looking for product information?
            </h2>
            <p className="text-gray-400 mb-4">
              Check out our other pages for more details about RapidShare.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/features"
                className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2 text-sm font-bold text-indigo-400 transition-colors hover:bg-indigo-500/20"
              >
                Features
              </Link>
              <Link
                href="/security"
                className="rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm font-bold text-purple-400 transition-colors hover:bg-purple-500/20"
              >
                Security
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-bold text-cyan-400 transition-colors hover:bg-cyan-500/20"
              >
                About
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
