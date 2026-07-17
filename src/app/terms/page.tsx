import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../_components/NavBar";
import AuroraBackground from "../_components/AuroraBackground";
import Footer from "../_components/Footer";
import Breadcrumbs from "../_components/Breadcrumbs";
import JsonLd, { getWebPageSchema } from "../_components/JsonLd";
import { FileText, AlertTriangle, Ban, Upload, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions — RapidShare Usage Agreement",
  description:
    "Read the Terms and Conditions for using RapidShare. Understand acceptable use, file limits, liability, and your responsibilities when sharing files on our platform.",
  alternates: {
    canonical: "https://www.rapidshare.live/terms",
  },
  openGraph: {
    title: "Terms & Conditions — RapidShare",
    description:
      "Usage terms, acceptable use policy, and your responsibilities when using RapidShare.",
    url: "https://www.rapidshare.live/terms",
    siteName: "RapidShare",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions — RapidShare",
    description: "RapidShare usage agreement and acceptable use policy.",
  },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={getWebPageSchema({
          name: "Terms & Conditions",
          description:
            "Usage terms and conditions for the RapidShare file sharing platform.",
          url: "https://www.rapidshare.live/terms",
        })}
      />

      <main className="relative h-[100dvh] w-full flex flex-col overflow-hidden bg-[#110524]">
        <AuroraBackground />
        <Navbar />

        <div className="relative z-10 flex-1 w-full overflow-y-auto flex flex-col">
          <div className="w-full max-w-4xl mx-auto pt-12 pb-20 px-6 flex-1">
          <Breadcrumbs items={[{ label: "Terms & Conditions", href: "/terms" }]} />

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20">
                <Scale className="h-6 w-6 text-indigo-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                Terms &amp; <span className="text-indigo-400">Conditions</span>
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
                Agreement to Terms
              </h2>
              <p>
                By accessing or using RapidShare (
                <Link
                  href="/"
                  className="text-indigo-400 underline hover:text-indigo-300"
                >
                  rapidshare.live
                </Link>
                ), you agree to be bound by these Terms and Conditions. If you
                do not agree, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Upload className="h-5 w-5 text-indigo-400" />
                Service Description
              </h2>
              <p>
                RapidShare is a free, anonymous file sharing platform. Users can
                upload files up to 100MB, set an expiry duration, optionally
                protect files with a password, and receive a unique 6-character
                code for sharing. Files are automatically deleted after the
                chosen expiry period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Ban className="h-5 w-5 text-red-400" />
                Acceptable Use
              </h2>
              <p className="mb-3">You agree <strong className="text-white">not</strong> to use RapidShare to:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Upload or share illegal, harmful, or offensive content.</li>
                <li>Distribute malware, viruses, or malicious software.</li>
                <li>Violate intellectual property rights or copyrights.</li>
                <li>Upload personal data of others without their consent.</li>
                <li>Attempt to bypass rate limits or abuse the service.</li>
                <li>Use automated tools to bulk upload or scrape files.</li>
              </ul>
              <p className="mt-3">
                We reserve the right to remove any content and restrict access
                to users who violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                File Limits &amp; Storage
              </h2>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Maximum file size: 100MB per upload.</li>
                <li>Maximum downloads: configurable (1–10 per file).</li>
                <li>
                  Expiry options: 1 hour, 8 hours, or 24 hours. Files are
                  permanently deleted after expiry.
                </li>
                <li>We do not guarantee file availability during the expiry period.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Disclaimer of Warranties
              </h2>
              <p>
                RapidShare is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
                warranties of any kind. We do not guarantee uninterrupted
                service, data integrity, or file availability. Use the service
                at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, RapidShare and its
                creator shall not be liable for any indirect, incidental, or
                consequential damages arising from the use of our service,
                including data loss, unauthorized access, or service
                interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Intellectual Property
              </h2>
              <p>
                You retain ownership of files you upload. By using RapidShare,
                you grant us a limited, temporary license to store and transmit
                your files solely for the purpose of providing the service. This
                license expires when the file is deleted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Changes to Terms
              </h2>
              <p>
                We may update these Terms from time to time. Continued use of
                the service after changes constitutes acceptance. We recommend
                reviewing this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">
                Contact
              </h2>
              <p>
                Questions about these Terms? Please{" "}
                <Link
                  href="/contact"
                  className="text-indigo-400 underline hover:text-indigo-300"
                >
                  contact us
                </Link>{" "}
                or visit our{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-400 underline hover:text-indigo-300"
                >
                  Privacy Policy
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
