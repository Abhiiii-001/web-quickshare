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
  title: "RapidShare | Instant, Secure & Anonymous File Sharing",
  description:
    "The fastest way to share files. Upload documents, images, or videos, get a unique 6-digit code, and share it anywhere. No account needed, self-destructing links, and password protection.",
  keywords: [
    "file sharing",
    "instant file transfer",
    "secure share",
    "send large files",
    "anonymous file upload",
    "RapidShare",
    "file host",
    "zero-knowledge sharing",
    "send files free",
    "private file sharing",
    "transfer files anonymously"
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
    title: "RapidShare | Instant File Sharing",
    description: "Upload and share files instantly with a simple 6-digit code. Secure, fast, and anonymous.",
    url: "https://rapidshare.live", 
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
              "name": "RapidShare",
              "url": "https://rapidshare.live",
              "description": "Instant, secure and anonymous file sharing platform.",
              "applicationCategory": "FileShare",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
              },
              "author": {
                "@type": "Person",
                "name": "Abhishek",
              },
            }),
          }}
        />
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
