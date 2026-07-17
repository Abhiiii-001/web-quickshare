import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../_components/NavBar";
import AuroraBackground from "../_components/AuroraBackground";
import Footer from "../_components/Footer";
import Breadcrumbs from "../_components/Breadcrumbs";
import JsonLd, {
  getWebPageSchema,
  getFAQSchema,
} from "../_components/JsonLd";
import { Shield, Mail, FileText, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — How RapidShare Protects Your Data",
  description:
    "Learn how RapidShare handles your data. We collect minimal information, use no tracking cookies, and auto-delete files after expiry. Your privacy is our priority.",
  alternates: {
    canonical: "https://www.rapidshare.live/privacy",
  },
  openGraph: {
    title: "Privacy Policy — RapidShare",
    description:
      "Learn how RapidShare handles your data with minimal collection, zero tracking, and automatic file deletion.",
    url: "https://www.rapidshare.live/privacy",
    siteName: "RapidShare",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy — RapidShare",
    description: "How RapidShare protects your data and privacy.",
  },
};

const faqs = [
  {
    question: "Does RapidShare collect personal data?",
    answer:
      "No. RapidShare does not require user accounts, does not store personal information, and does not use tracking cookies. Files are associated only with a temporary code.",
  },
  {
    question: "How long are uploaded files stored?",
    answer:
      "Files are stored for the duration you select (1 hour, 8 hours, or 24 hours). After the expiry period, files are permanently deleted from our servers.",
  },
  {
    question: "Does RapidShare share data with third parties?",
    answer:
      "RapidShare does not sell or share any user data with third parties. Cloud storage infrastructure (Cloudinary) is used solely for temporary file hosting.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={[
          getWebPageSchema({
            name: "Privacy Policy",
            description:
              "How RapidShare handles your data and protects your privacy.",
            url: "https://www.rapidshare.live/privacy",
          }),
          getFAQSchema(faqs),
        ]}
      />

      <main className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#110524]">
        <AuroraBackground />
        <Navbar />

        <div className="relative z-10 flex-1 w-full overflow-y-auto flex flex-col">
          <div className="w-full max-w-4xl mx-auto pt-12 pb-20 px-6 flex-1">
          <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20">
                <Shield className="h-6 w-6 text-indigo-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                Privacy <span className="text-indigo-400">Policy</span>
              </h1>
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
              Last updated: July 2026
            </p>
          </div>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-400" />
                Introduction
              </h2>
              <p>
                RapidShare (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use, and
                safeguard information when you use our file sharing service at{" "}
                <Link
                  href="/"
                  className="text-indigo-400 underline hover:text-indigo-300"
                >
                  rapidshare.live
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Information We Collect
              </h2>
              <p className="mb-3">
                RapidShare is designed with privacy in mind. We collect{" "}
                <strong className="text-white">minimal information</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong className="text-white">Uploaded files</strong> — stored
                  temporarily on secure cloud servers until expiry.
                </li>
                <li>
                  <strong className="text-white">File metadata</strong> — file
                  name, size, and type for display purposes only.
                </li>
                <li>
                  <strong className="text-white">No personal data</strong> — we
                  do not collect names, emails, IP addresses, or browsing
                  history.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                How We Use Information
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>To provide the file sharing service (upload, generate code, download).</li>
                <li>To enforce file expiry and download limits.</li>
                <li>To protect our service from abuse via rate limiting.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Data Storage &amp; Security
              </h2>
              <p>
                Files are stored on encrypted cloud infrastructure (Cloudinary).
                Password-protected files use BCrypt hashing. All data is
                transmitted over HTTPS. Files are permanently deleted after their
                chosen expiry period (1 hour, 8 hours, or 24 hours).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Cookies &amp; Tracking
              </h2>
              <p>
                RapidShare does not use tracking cookies or analytics that
                identify individual users. We may use privacy-respecting
                analytics tools that collect aggregate, anonymous usage data to
                improve our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Third-Party Services
              </h2>
              <p>
                We use Cloudinary for secure file storage. Cloudinary&apos;s
                privacy practices are governed by their own privacy policy. No
                user-identifiable information is shared with Cloudinary.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Your Rights
              </h2>
              <p>
                Since we don&apos;t collect personal data, there is no personal data
                to request, modify, or delete. Uploaded files are automatically
                purged after their expiry.
              </p>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-indigo-400" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Mail className="h-5 w-5 text-indigo-400" />
                Contact
              </h2>
              <p>
                If you have questions about this Privacy Policy, please{" "}
                <Link
                  href="/contact"
                  className="text-indigo-400 underline hover:text-indigo-300"
                >
                  contact us
                </Link>
                .
              </p>
            </section>
          </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
