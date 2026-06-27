import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ReduxProvider } from "./_components/provider/ReduxProvider";
// import { ToastProvider } from '@/components/providers/ToastProvider';

const shareTech = localFont({
  src: "../../public/fonts/ShareTech-Regular.ttf",
  variable: "--font-share-tech",
  display: "swap",
});

const shareTechMono = localFont({
  src: "../../public/fonts/ShareTechMono-Regular.ttf",
  variable: "--font-share-tech-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rapidshare.live"),
  title: "Rapid Share | RapidShare - Instant & Secure File Sharing",
  description:
    "Looking for a rapid share solution? RapidShare is the fastest way to share files online. Upload documents or videos, get a 6-digit code, and rapid share it anywhere anonymously.",
  keywords: [
    "rapid share",
    "rapid share files",
    "RapidShare",
    "rapidshare live",
    "quick share",
    "easy share",
    "share images",
    "file sharing",
    "instant file transfer",
    "secure rapid share",
    "send large files",
    "anonymous file upload",
    "file host",
    "zero-knowledge sharing",
    "send files free",
    "private file sharing",
    "transfer files anonymously",
  ],
  authors: [{ name: "RapidShare Team" }],
  creator: "RapidShare",
  publisher: "RapidShare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Rapid Share | RapidShare Instant File Sharing",
    description:
      "Rapid share your files instantly with a simple 6-digit code. Secure, fast, and anonymous.",
    url: "https://www.rapidshare.live",
    siteName: "RapidShare",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidShare | Instant File Sharing",
    description: "Share files instantly. No login required.",
    creator: "@rapidshare",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${shareTech.variable} ${shareTechMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "RapidShare",
              url: "https://rapidshare.live",
              description:
                "Instant, secure and anonymous file sharing platform.",
              applicationCategory: "FileShare",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
              },
              author: {
                "@type": "Person",
                name: "Abhishek",
              },
            }),
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5896679560343851"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="font-sans antialiased">
        <ReduxProvider>
          {children}
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
