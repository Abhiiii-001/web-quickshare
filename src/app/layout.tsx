import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ReduxProvider } from "./_components/provider/ReduxProvider";
import AnalyticsProvider from "./_components/AnalyticsProvider";
import JsonLd, {
  getWebSiteSchema,
  getOrganizationSchema,
  getSoftwareApplicationSchema,
} from "./_components/JsonLd";

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
  title: {
    default: "RapidShare — Instant & Secure File Sharing | No Login Required",
    template: "%s | RapidShare",
  },
  description:
    "RapidShare is the fastest way to share files online. Upload documents, images, or videos, get a 6-digit code, and share it anywhere — instantly, securely, and anonymously. No login required.",
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
    "share files online",
    "file sharing app",
    "no login file sharing",
  ],
  authors: [{ name: "Abhishek", url: "https://github.com/Abhiiii-001" }],
  creator: "Abhishek",
  publisher: "RapidShare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.rapidshare.live",
  },
  openGraph: {
    title: "RapidShare — Instant & Secure File Sharing",
    description:
      "Upload files, get a 6-digit code, and share instantly. Secure, fast, and anonymous — no login required.",
    url: "https://www.rapidshare.live",
    siteName: "RapidShare",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidShare — Instant File Sharing",
    description:
      "Share files instantly with a 6-digit code. No login required. Fast, secure, and anonymous.",
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
  other: {
    "theme-color": "#6366f1",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html
      lang="en"
      className={`${shareTech.variable} ${shareTechMono.variable}`}
    >
      <head>
        {/* DNS Prefetch & Preconnect for performance */}
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />

        {/* 
          Google Search Console verification:
          Replace YOUR_VERIFICATION_CODE with your actual code.
          <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        */}
      </head>
      <body className="font-sans antialiased">
        {/* Skip Navigation for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Global Structured Data */}
        <JsonLd
          data={[
            getWebSiteSchema(),
            getOrganizationSchema(),
            getSoftwareApplicationSchema(),
          ]}
        />

        {/* AdSense Script — loaded after page interaction for performance */}
        {adsenseClientId && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}

        {/* Analytics (GA4 + Clarity) */}
        <AnalyticsProvider />

        <ReduxProvider>
          {children}
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
