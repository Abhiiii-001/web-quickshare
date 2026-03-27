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
  title: "QuickShare - Instant File Sharing",
  description:
    "Share files instantly with QuickShare. Generate a unique code, share anywhere. No login required.",
  keywords: ["file sharing", "send files", "file transfer", "secure sharing"],
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
      <body className="font-sans antialiased">
        <ReduxProvider>
          {children}
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
